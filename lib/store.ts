/** Storefront gate.
 *
 *  The product boutique (cart + Stripe Checkout) stays in a read-only "preview"
 *  state until the client has set up Stripe and run `npm run stripe:sync`. Flip
 *  it on by setting `NEXT_PUBLIC_STORE_ENABLED=true`.
 *
 *  Because the variable is `NEXT_PUBLIC_*`, this resolves identically on the
 *  server and in the browser, so UI and API can share one source of truth.
 *  When off: no cart, no checkout, and the shop shows "available in-studio". */
export const STORE_ENABLED = process.env.NEXT_PUBLIC_STORE_ENABLED === "true";
