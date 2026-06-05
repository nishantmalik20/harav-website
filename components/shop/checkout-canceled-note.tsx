"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

/** A quiet, dismissible banner shown when a Stripe checkout is canceled. The bag
 *  is preserved in localStorage, so this is reassurance rather than an error. */
export function CheckoutCanceledNote() {
  const params = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || params.get("canceled") !== "1") return null;

  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-md border border-gold/40 bg-cream/50 px-5 py-3">
      <p className="font-body text-sm text-ink-600">
        Checkout canceled — your bag is saved whenever you’re ready.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="grid size-7 shrink-0 place-items-center rounded-full text-ink-400 transition-colors hover:bg-cream hover:text-espresso"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
