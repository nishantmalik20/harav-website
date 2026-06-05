"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";

/** Header bag icon with a live item count. Rendered only when the store is live. */
export function CartButton() {
  const { count, setOpen, mounted } = useCart();
  const showCount = mounted && count > 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={showCount ? `Open bag, ${count} item${count === 1 ? "" : "s"}` : "Open bag"}
      className="relative grid size-10 place-items-center rounded-full text-espresso transition-colors hover:text-gold-deep"
    >
      <ShoppingBag className="size-5" strokeWidth={1.8} />
      {showCount && (
        <span className="absolute right-0 top-0 grid min-w-[18px] place-items-center rounded-full bg-espresso px-1 font-body text-[10px] font-medium leading-[18px] text-pearl">
          {count}
        </span>
      )}
    </button>
  );
}
