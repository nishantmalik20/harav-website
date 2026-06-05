"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/shop/cart-provider";
import { STORE_ENABLED } from "@/lib/store";
import type { ProductVariant } from "@/lib/products";

export type AddToBagProduct = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string | null;
};

/**
 * Variant (shade) selector + "Add to bag".
 *
 * When the store is live (`NEXT_PUBLIC_STORE_ENABLED`), this adds the product to
 * the cart and opens the bag drawer. Until then it stays an honest preview that
 * points to in-studio purchase, rather than faking a cart.
 */
export function AddToBag({
  product,
  variantLabel,
  variants,
}: {
  product: AddToBagProduct;
  variantLabel?: string;
  variants?: ProductVariant[];
}) {
  const hasVariants = Array.isArray(variants) && variants.length > 0;
  const [selected, setSelected] = useState<string | null>(hasVariants ? null : "default");
  const [added, setAdded] = useState(false);
  const cart = useCart();

  function handleAdd() {
    if (!STORE_ENABLED) {
      setAdded(true);
      return;
    }
    const chosen = hasVariants ? variants!.find((v) => v.name === selected) : undefined;
    cart.add({
      slug: product.slug,
      name: product.name,
      price: chosen?.price ?? product.price,
      currency: product.currency,
      image: chosen?.image ?? product.image,
      variant: hasVariants ? selected : null,
    });
    setAdded(true);
  }

  // Preview mode disables the button after a confirming tap; live mode keeps it
  // tappable (the opening drawer is the feedback).
  const disabled = (hasVariants && !selected) || (!STORE_ENABLED && added);

  return (
    <div className="mt-8">
      {hasVariants && (
        <div className="mb-6">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {variantLabel ?? "Option"}
            {selected ? (
              <span className="ml-2 normal-case tracking-normal text-espresso">{selected}</span>
            ) : null}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants!.map((v) => (
              <button
                key={v.name}
                type="button"
                onClick={() => {
                  setSelected(v.name);
                  setAdded(false);
                }}
                aria-pressed={selected === v.name}
                className={cn(
                  "rounded-full border px-4 py-2 font-body text-xs uppercase tracking-[0.14em] transition-colors",
                  selected === v.name
                    ? "border-espresso bg-espresso text-pearl"
                    : "border-espresso/20 text-espresso hover:border-gold/60",
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        variant="primary"
        className="w-full sm:w-auto"
        disabled={disabled}
        onClick={handleAdd}
      >
        {added && !STORE_ENABLED ? (
          <>
            <Check className="size-4" strokeWidth={2.2} /> Saved
          </>
        ) : (
          <>
            <ShoppingBag className="size-4" strokeWidth={2.2} /> Add to bag
          </>
        )}
      </Button>

      <p className="mt-3 font-body text-xs leading-relaxed text-ink-400">
        {STORE_ENABLED
          ? "Secure checkout with Stripe. Your order will be ready for pickup in-studio."
          : added
            ? "Online checkout opens soon — we’ll hold your pick. Ask us in-studio or call to purchase today."
            : "Online ordering opens soon. Available now in-studio."}
      </p>
    </div>
  );
}
