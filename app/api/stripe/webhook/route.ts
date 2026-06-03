import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendBookingConfirmation } from "@/lib/email";
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
    const bookingId = session.metadata?.booking_id ?? session.client_reference_id ?? undefined;

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
          });
        }
      } catch (e) {
        console.error("webhook booking update failed", e);
      }
    }
  }

  return NextResponse.json({ received: true });
}
