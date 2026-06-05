import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { ClearCartOnMount } from "@/components/shop/clear-cart-on-mount";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

type OrderSummary = {
  orderNumber?: string;
  email?: string | null;
  total: number;
  currency: string;
  lines: { name: string; quantity: number; amount: number }[];
};

/** Re-read the paid Checkout Session so we can show the order number + summary.
 *  Best-effort: any failure (missing id, Stripe off) falls back to the plain
 *  thank-you, so the page never errors. */
async function loadOrder(sessionId?: string): Promise<OrderSummary | null> {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    const lines = (session.line_items?.data ?? []).map((li) => ({
      name: li.description ?? "Item",
      quantity: li.quantity ?? 1,
      amount: (li.amount_total ?? 0) / 100,
    }));
    return {
      orderNumber: session.metadata?.order_number ?? undefined,
      email: session.customer_details?.email,
      total: (session.amount_total ?? 0) / 100,
      currency: (session.currency ?? "cad").toUpperCase(),
      lines,
    };
  } catch (e) {
    console.error("success page: could not load session", e);
    return null;
  }
}

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const order = await loadOrder(session_id);

  return (
    <section className="px-6 py-28 lg:py-36">
      <ClearCartOnMount />
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <Eyebrow className="justify-center">Order received</Eyebrow>
          <h1 className="mt-5 font-display text-4xl text-espresso md:text-5xl">
            Thank you — your order is in.
          </h1>

          {order?.orderNumber && (
            <div className="mt-7 inline-flex flex-col items-center rounded-md border border-gold/40 bg-cream/40 px-8 py-4">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-gold-deep">
                Your order number
              </span>
              <span className="mt-1 font-display text-2xl tracking-wide text-espresso">
                {order.orderNumber}
              </span>
            </div>
          )}

          <p className="mt-7 font-body text-base leading-relaxed text-ink-500">
            {order?.email ? (
              <>
                A confirmation is on its way to{" "}
                <span className="text-espresso">{order.email}</span>.{" "}
              </>
            ) : (
              <>A confirmation is on its way to your inbox. </>
            )}
            We&rsquo;ll prepare your products and email you when they&rsquo;re ready to collect
            in-studio. Anything to adjust? Call us at {SITE.phone}.
          </p>
        </div>

        {order && order.lines.length > 0 && (
          <div className="mt-10 rounded-md border border-espresso/10 bg-pearl p-6 text-left">
            <h2 className="font-display text-lg text-espresso">Order summary</h2>
            <ul className="mt-4 divide-y divide-espresso/10">
              {order.lines.map((l, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 py-2.5 font-body text-sm"
                >
                  <span className="text-ink-600">
                    {l.quantity} &times; {l.name}
                  </span>
                  <span className="text-espresso">{formatPrice(l.amount, order.currency)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-espresso/10 pt-3 font-body">
              <span className="text-sm uppercase tracking-[0.16em] text-ink-500">Total paid</span>
              <span className="font-display text-xl text-espresso">
                {formatPrice(order.total, order.currency)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className={cn(buttonVariants({ variant: "primary" }))}>
            Continue shopping
          </Link>
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
