import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendBookingConfirmation,
  sendOrderConfirmation,
  sendOrderNotification,
  type OrderEmail,
} from "@/lib/email";
import { INTAKE_FORMS, intakeSummary, requiresQuestionnaire } from "@/lib/intake";
import type { BookingRow } from "@/types/database";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (e) {
    console.error("stripe webhook signature verification failed", e);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.metadata?.kind === "order") {
      // Product order — confirmation lives in Stripe + email; no Supabase.
      await handleOrder(session);
    } else {
      // Booking deposit — mark the booking paid and confirm to the guest.
      const bookingId =
        session.metadata?.booking_id ?? session.client_reference_id ?? undefined;

      if (bookingId) {
        try {
          const supabase = createAdminClient();
          const { data: updated } = await supabase
            .from("bookings")
            .update({ deposit_status: "paid" })
            .eq("id", bookingId)
            .select("*")
            .single();
          const data = updated as BookingRow | null;

          if (data) {
            const formId = data.intake_form;
            const hasIntake = requiresQuestionnaire(formId) && !!data.intake;
            await sendBookingConfirmation({
              name: data.customer_name,
              email: data.customer_email,
              phone: data.customer_phone,
              serviceCategory: data.service_category,
              serviceName: data.service_name,
              date: data.preferred_date,
              time: data.preferred_time,
              notes: data.notes,
              depositRequired: true,
              depositAmount: data.deposit_amount,
              depositPaid: true,
              paymentRef:
                typeof session.payment_intent === "string"
                  ? session.payment_intent
                  : session.payment_intent?.id,
              intakeTitle: hasIntake ? INTAKE_FORMS[formId].title : undefined,
              intake: hasIntake ? intakeSummary(formId, data.intake!) : undefined,
            });
          }
        } catch (e) {
          console.error("webhook booking update failed", e);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}

/** Email the customer + salon for a paid product order. Best-effort. */
async function handleOrder(session: Stripe.Checkout.Session) {
  try {
    const stripe = getStripe();
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    const currency = (session.currency ?? "cad").toUpperCase();
    const lines = lineItems.data.map((li) => ({
      name: li.description ?? "Item",
      quantity: li.quantity ?? 1,
      amountTotal: (li.amount_total ?? 0) / 100,
    }));

    let options: string | undefined;
    try {
      const parsed = JSON.parse(session.metadata?.order_items ?? "[]") as {
        slug: string;
        q: number;
        v?: string;
      }[];
      const shades = parsed.filter((i) => i.v).map((i) => `${i.slug}: ${i.v}`);
      if (shades.length) options = shades.join(", ");
    } catch {
      // metadata may be truncated/absent — non-fatal
    }

    const d = session.customer_details;
    const order: OrderEmail = {
      orderNumber: session.metadata?.order_number ?? undefined,
      name: d?.name ?? "Customer",
      email: d?.email ?? "",
      phone: d?.phone,
      lines,
      total: (session.amount_total ?? 0) / 100,
      currency,
      options,
    };

    await sendOrderNotification(order);
    if (order.email) await sendOrderConfirmation(order);
  } catch (e) {
    console.error("webhook order handling failed", e);
  }
}
