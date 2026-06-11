import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";
import { findService, effectivePrice, DEPOSIT_AMOUNT } from "@/lib/services";
import { sendBookingNotification, sendBookingConfirmation, type BookingEmail } from "@/lib/email";
import {
  INTAKE_FORMS,
  intakeFormIdForService,
  requiresQuestionnaire,
  validateIntake,
  sanitizeIntake,
  isUnder18,
  intakeSummary,
  UNDER_18_MESSAGE,
} from "@/lib/intake";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  serviceCategory: z.string().min(1),
  serviceName: z.string().min(1),
  date: z.string().min(1).max(40),
  time: z.string().min(1).max(20),
  esthetician: z.string().max(120).optional(),
  notes: z.string().max(2000).optional(),
  intake: z.object({
    formId: z.enum(["facial", "carbon-laser", "lash-extensions", "sugaring", "general"]),
    answers: z.record(z.union([z.string().max(2000), z.array(z.string().max(200)).max(40)])),
  }),
  consent: z.literal(true),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid booking details." }, { status: 400 });
    }
    const d = parsed.data;

    // Re-derive price + deposit on the server — never trust the client.
    const found = findService(d.serviceCategory, d.serviceName);
    if (!found) {
      return NextResponse.json({ ok: false, error: "Unknown service." }, { status: 400 });
    }
    const { category, service } = found;
    const depositRequired = service.deposit;
    const price = effectivePrice(service);

    // The consultation is re-validated server-side against the same definitions
    // the form renders from — required questions can't be skipped client-side.
    const expectedFormId = intakeFormIdForService(category.slug, service.name);
    if (d.intake.formId !== expectedFormId) {
      return NextResponse.json({ ok: false, error: "Invalid consultation form." }, { status: 400 });
    }
    const intakeForm = INTAKE_FORMS[expectedFormId];
    const intakeAnswers = sanitizeIntake(intakeForm, d.intake.answers);
    if (Object.keys(validateIntake(intakeForm, intakeAnswers)).length > 0) {
      return NextResponse.json(
        { ok: false, error: "Please complete every consultation question." },
        { status: 400 },
      );
    }
    if (isUnder18(intakeForm, intakeAnswers)) {
      return NextResponse.json({ ok: false, error: UNDER_18_MESSAGE }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_name: d.name,
        customer_email: d.email,
        customer_phone: d.phone,
        service_category: d.serviceCategory,
        service_name: d.serviceName,
        service_price: price,
        preferred_date: d.date,
        preferred_time: d.time,
        esthetician: d.esthetician || "Khushi",
        notes: d.notes || null,
        intake_form: expectedFormId,
        intake: requiresQuestionnaire(expectedFormId) ? intakeAnswers : null,
        consented_at: new Date().toISOString(),
        deposit_required: depositRequired,
        deposit_amount: depositRequired ? DEPOSIT_AMOUNT : 0,
        deposit_status: depositRequired ? "pending" : "none",
        status: "new",
      })
      .select("id")
      .single();

    if (error || !booking) {
      console.error("booking insert failed", error);
      return NextResponse.json({ ok: false, error: "Could not save your booking." }, { status: 500 });
    }

    const bookingId = booking.id as string;
    const emailData: BookingEmail = {
      name: d.name,
      email: d.email,
      phone: d.phone,
      serviceCategory: d.serviceCategory,
      serviceName: d.serviceName,
      date: d.date,
      time: d.time,
      notes: d.notes,
      depositRequired,
      depositAmount: depositRequired ? DEPOSIT_AMOUNT : 0,
      intakeTitle: requiresQuestionnaire(expectedFormId) ? intakeForm.title : undefined,
      intake: requiresQuestionnaire(expectedFormId)
        ? intakeSummary(expectedFormId, intakeAnswers)
        : undefined,
    };

    // Always alert the salon.
    await sendBookingNotification(emailData);

    if (depositRequired) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "cad",
              unit_amount: DEPOSIT_AMOUNT * 100,
              product_data: {
                name: `Appointment deposit: ${d.serviceName}`,
                description: "Applied to your service on the day. Non-refundable.",
              },
            },
          },
        ],
        client_reference_id: bookingId,
        metadata: { kind: "deposit", booking_id: bookingId },
        success_url: `${siteUrl}/book/success?booking=${bookingId}`,
        cancel_url: `${siteUrl}/book?canceled=1`,
      });

      await supabase.from("bookings").update({ stripe_session_id: session.id }).eq("id", bookingId);

      return NextResponse.json({
        ok: true,
        requiresDeposit: true,
        checkoutUrl: session.url,
        bookingId,
      });
    }

    // No deposit — confirm immediately.
    await sendBookingConfirmation(emailData);
    return NextResponse.json({ ok: true, requiresDeposit: false, bookingId });
  } catch (e) {
    console.error("bookings route error", e);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
