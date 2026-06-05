"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Check, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";
import { STORE_ENABLED } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { CardProduct } from "@/lib/products";

/**
 * Quick "Add to bag" for a catalog tile. Simple products add straight to the
 * cart (the drawer opens via the provider); products with shade/size options
 * link to the detail page so the guest can choose first. Renders nothing while
 * the store is gated off, so the grid stays a clean preview.
 */
export function QuickAdd({ product }: { product: CardProduct }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  if (!STORE_ENABLED) return null;

  const base =
    "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.18em] transition-colors";

  // Variant products need an option chosen on the detail page.
  if (product.hasVariants) {
    return (
      <Link
        href={`/shop/${product.slug}`}
        className={cn(
          base,
          "border-espresso/20 text-espresso hover:border-gold-deep hover:text-gold-deep",
        )}
      >
        <SlidersHorizontal className="size-3.5" strokeWidth={2} />
        Choose options
      </Link>
    );
  }

  function handleAdd() {
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      variant: null,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${product.name} to bag`}
      className={cn(
        base,
        added
          ? "border-gold-deep bg-gold-deep/10 text-gold-deep"
          : "border-espresso/20 text-espresso hover:border-espresso hover:bg-espresso hover:text-pearl",
      )}
    >
      {added ? (
        <>
          <Check className="size-3.5" strokeWidth={2.2} /> Added to bag
        </>
      ) : (
        <>
          <ShoppingBag className="size-3.5" strokeWidth={2} /> Add to bag
        </>
      )}
    </button>
  );
}
