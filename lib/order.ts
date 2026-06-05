/**
 * Human-readable order reference, e.g. "HRV-7QK4M9".
 *
 * Generated at checkout and stored on the Stripe Checkout Session AND its
 * PaymentIntent metadata, so every order is identifiable and searchable in the
 * Stripe Dashboard (Payments → search by metadata `order_number`). The same
 * number is shown on the success page and in the confirmation emails.
 */

// No ambiguous characters (0/O, 1/I) so it's easy to read out over the phone.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderNumber(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `HRV-${code}`;
}
