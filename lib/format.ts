/** Format a price in the catalog currency (CAD); no trailing .00 for whole dollars.
 *  Kept JSON-free so client components can import it without bundling the catalog. */
export function formatPrice(price: number, currency = "CAD"): string {
  const whole = Number.isInteger(price);
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}
