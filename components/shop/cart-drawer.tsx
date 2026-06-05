"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { STORE_ENABLED } from "@/lib/store";

const GENERIC_ERROR =
  "Checkout is unavailable right now. Please try again, or visit us in-studio.";

export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);

  // While open: lock body scroll, close on Escape, move focus into the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, setOpen]);

  // Build-time guard: when the store is off this component renders nothing.
  if (!STORE_ENABLED) return null;

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.slug,
            quantity: i.quantity,
            variant: i.variant ?? undefined,
          })),
        }),
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || GENERIC_ERROR);
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }

  const currency = items[0]?.currency ?? "CAD";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close bag"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
          />

          <motion.aside
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-[0_0_60px_rgba(20,12,6,0.35)] focus:outline-none"
          >
            <header className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
              <h2 className="font-display text-2xl text-espresso">
                Your bag{" "}
                {count > 0 && <span className="text-gold-deep">({count})</span>}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="grid size-9 place-items-center rounded-full text-espresso transition-colors hover:bg-cream"
              >
                <X className="size-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-10 text-ink-300" strokeWidth={1.5} />
                <p className="font-body text-ink-500">Your bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="font-body text-sm uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-espresso"
                >
                  Browse the boutique
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}:${item.variant ?? ""}`}
                      className="flex gap-4 py-5"
                    >
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-espresso/10 bg-white">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-contain p-1.5"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="font-display text-base leading-snug text-espresso transition-colors hover:text-gold-deep"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="mt-0.5 font-body text-xs uppercase tracking-[0.14em] text-ink-400">
                            {item.variant}
                          </p>
                        )}
                        <p className="mt-1 font-body text-sm text-gold-deep">
                          {formatPrice(item.price, item.currency)}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-3 rounded-full border border-espresso/15 px-2 py-1">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(item.slug, item.variant, item.quantity - 1)}
                              className="grid size-6 place-items-center text-espresso transition-colors hover:text-gold-deep"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-4 text-center font-body text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(item.slug, item.variant, item.quantity + 1)}
                              className="grid size-6 place-items-center text-espresso transition-colors hover:text-gold-deep"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.slug, item.variant)}
                            className="font-body text-xs uppercase tracking-[0.14em] text-ink-400 transition-colors hover:text-terracotta"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-espresso/10 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-body text-sm uppercase tracking-[0.16em] text-ink-500">
                      Subtotal
                    </span>
                    <span className="font-display text-xl text-espresso">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>
                  <p className="mt-1 font-body text-xs text-ink-400">
                    Pay securely with Stripe. Your order will be ready for pickup in-studio.
                  </p>
                  {error && (
                    <p className="mt-3 font-body text-sm text-terracotta">{error}</p>
                  )}
                  <Button
                    variant="primary"
                    className="mt-4 w-full"
                    disabled={loading}
                    onClick={checkout}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Redirecting…
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </Button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
