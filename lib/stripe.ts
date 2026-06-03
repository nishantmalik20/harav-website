import Stripe from "stripe";

let stripe: Stripe | null = null;

/** Lazily-constructed Stripe client (server only). Lazy so a missing key never
 *  breaks the build — it only throws when a deposit is actually taken. */
export function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    stripe = new Stripe(key);
  }
  return stripe;
}
