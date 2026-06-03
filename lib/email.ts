import { getResend } from "./resend";
import { SITE } from "./site";
import type { ContactRequest } from "@/types/api";

const FROM = process.env.RESEND_FROM || "Harav Salon & Spa <onboarding@resend.dev>";
const NOTIFY = process.env.BOOKINGS_NOTIFY_EMAIL || SITE.email;

export interface BookingEmail {
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string | null;
  depositRequired: boolean;
  depositAmount: number;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:4px 16px 4px 0;color:#6b5b49;">${label}</td><td style="padding:4px 0;color:#241712;">${value}</td></tr>`;
}

/** Notify the salon of a new booking (best-effort — never blocks the booking). */
export async function sendBookingNotification(b: BookingEmail) {
  try {
    await getResend().emails.send({
      from: FROM,
      to: NOTIFY,
      replyTo: b.email,
      subject: `New booking: ${b.serviceName} (${b.date} ${b.time})`,
      html: `<h2 style="font-family:Georgia,serif;color:#241712;">New booking request</h2>
        <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
        ${row("Name", b.name)}${row("Email", b.email)}${row("Phone", b.phone)}
        ${row("Service", `${b.serviceName} (${b.serviceCategory})`)}
        ${row("When", `${b.date} at ${b.time}`)}
        ${row("Deposit", b.depositRequired ? `$${b.depositAmount} (pending payment)` : "None")}
        ${b.notes ? row("Notes", b.notes) : ""}
        </table>`,
    });
  } catch (e) {
    console.error("sendBookingNotification failed", e);
  }
}

/** Confirm the booking to the guest (best-effort). */
export async function sendBookingConfirmation(b: BookingEmail) {
  try {
    await getResend().emails.send({
      from: FROM,
      to: b.email,
      subject: `Your hour is held: ${b.serviceName}`,
      html: `<div style="font-family:Arial,sans-serif;color:#241712;max-width:520px;">
        <h2 style="font-family:Georgia,serif;">Your hour is held.</h2>
        <p style="color:#4a3f35;line-height:1.6;">Thank you, ${b.name}. We&rsquo;ve received your booking and will confirm shortly.</p>
        <table style="font-size:14px;border-collapse:collapse;margin:16px 0;">
        ${row("Treatment", b.serviceName)}${row("When", `${b.date} at ${b.time}`)}
        ${b.depositRequired ? row("Deposit", `$${b.depositAmount} received, applied to your total. Non-refundable.`) : ""}
        </table>
        <p style="color:#4a3f35;line-height:1.6;">Need to change something? Call us at ${SITE.phone}.</p>
        <p style="color:#9a6e2e;letter-spacing:2px;text-transform:uppercase;font-size:12px;">Harav Salon &amp; Spa</p>
        </div>`,
    });
  } catch (e) {
    console.error("sendBookingConfirmation failed", e);
  }
}

/** Forward a contact-form submission to the salon (throws on failure so the
 *  route can surface an error to the guest). */
export async function sendContactEmail(data: ContactRequest) {
  await getResend().emails.send({
    from: FROM,
    to: NOTIFY,
    replyTo: data.email,
    subject: `Contact form: ${data.name}`,
    html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse;">
        ${row("Name", data.name)}${row("Email", data.email)}${data.phone ? row("Phone", data.phone) : ""}
        </table>
        <p style="font-family:Arial,sans-serif;color:#241712;white-space:pre-wrap;line-height:1.6;">${data.message}</p>`,
  });
}
