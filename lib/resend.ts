import { Resend } from "resend";

/** Lazily-constructed Resend client (server only). */
export function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY);
}
