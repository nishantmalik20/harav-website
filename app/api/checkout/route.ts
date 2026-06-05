import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { STORE_ENABLED } from "@/lib/store";
import { generateOrderNumber } from "@/lib/order";
import priceMap from "@/data/stripe-prices.json";

type PriceMap = {
  generatedAt: string | null;
  currency: string;
  items: Record<string, { productId: string; priceId: string }>;
};

const map = priceMap as PriceMap;

const schema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(99),
        variant: z.string().max(120).optional(),
      }),
    )
    .min(1)
    .max(50),
});

export async function POST(req: NextRequest) {
  // Hard gate: nothing happens until the store is switched on and Stripe is set.
  if (!STORE_ENABLED || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { ok: false, configured: false, error: "The boutique checkout isn’t live yet." },
      { status: 503 },
    );
  }

  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid cart." }, { status: 400 });
    }

    // Resolve Stripe price IDs server-side from the synced mapping — the client
    // never gets to name an amount (same rule as the booking deposit flow).
    const lineItems: { price: string; quantity: number }[] = [];
    const orderItems: { slug: string; q: number; v?: string }[] = [];
    for (const item of parsed.data.items) {
      const entry = map.items[item.slug];
      if (!entry) {
        return NextResponse.json(
          { ok: false, error: "One of your items is no longer available." },
          { status: 409 },
        );
      }
      lineItems.push({ price: entry.priceId, quantity: item.quantity });
      orderItems.push({ slug: item.slug, q: item.quantity, ...(item.variant ? { v: item.variant } : {}) });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const orderNumber = generateOrderNumber();
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      phone_number_collection: { enabled: true },
      // Stripe caps metadata values at 500 chars; a compact shade list is plenty
      // for a typical skincare order and lets the salon see chosen options.
      metadata: {
        kind: "order",
        order_number: orderNumber,
        order_items: JSON.stringify(orderItems).slice(0, 500),
      },
      // Mirror the order number onto the PaymentIntent + a human description so
      // it's searchable from the Stripe Dashboard and shows on the payment.
      payment_intent_data: {
        description: `Harav boutique order ${orderNumber}`,
        metadata: { kind: "order", order_number: orderNumber },
      },
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop?canceled=1`,
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (e) {
    console.error("checkout route error", e);
    return NextResponse.json({ ok: false, error: "Could not start checkout." }, { status: 500 });
  }
}
