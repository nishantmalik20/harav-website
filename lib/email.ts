import { getResend } from "./resend";
import { SITE } from "./site";
import { formatPrice } from "./format";
import type { ContactRequest } from "@/types/api";

const FROM = process.env.RESEND_FROM || "Harav Salon & Spa <onboarding@resend.dev>";
const NOTIFY = process.env.BOOKINGS_NOTIFY_EMAIL || SITE.email;
const ORDERS_NOTIFY = process.env.ORDERS_NOTIFY_EMAIL || NOTIFY;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Branded HTML shell shared by every transactional email, so all of them look
 * consistent: gold "HARAV" wordmark header, the message, a support line, a
 * "The Harav Team" sign-off, and an address footer. Table-based + inline styles
 * for broad email-client support. (Swap the wordmark for a hosted logo image
 * once the site is on its production https domain.)
 */
function emailShell(opts: { title: string; preheader?: string; contentHtml: string }): string {
  const { title, preheader = "", contentHtml } = opts;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3ede0;">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede0;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;">
      <tr><td style="background:#241712;border-radius:10px 10px 0 0;padding:30px 32px;text-align:center;">
        <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;letter-spacing:7px;color:#e9c987;">HARAV</div>
        <div style="font-size:10px;letter-spacing:4px;color:#c9a35c;text-transform:uppercase;margin-top:6px;">Salon &amp; Spa</div>
      </td></tr>
      <tr><td style="background:#fffdf8;padding:32px;">
        <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#241712;margin:0 0 18px;">${title}</h1>
        ${contentHtml}
      </td></tr>
      <tr><td style="background:#fffdf8;padding:0 32px 26px;">
        <div style="border-top:1px solid #ece3d2;padding-top:20px;">
          <p style="font-size:13px;line-height:1.6;color:#6b5b49;margin:0;">
            Questions or need to make a change? Email
            <a href="mailto:${SITE.email}" style="color:#9a6e2e;text-decoration:none;">${SITE.email}</a>
            or call <a href="tel:${SITE.phoneHref}" style="color:#9a6e2e;text-decoration:none;">${SITE.phone}</a>.
          </p>
          <p style="font-size:14px;color:#241712;margin:16px 0 0;">Warmly,<br/><strong style="font-family:Georgia,serif;">The Harav Team</strong></p>
        </div>
      </td></tr>
      <tr><td style="background:#fffdf8;border-radius:0 0 10px 10px;padding:16px 32px 26px;border-top:1px solid #ece3d2;text-align:center;">
        <p style="font-size:11px;line-height:1.6;color:#9a8a73;margin:0;">
          ${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}<br/>
          Women-only salon &amp; spa &middot; ${SITE.phone}
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr><td style="padding:5px 16px 5px 0;color:#6b5b49;font-size:14px;">${label}</td><td style="padding:5px 0;color:#241712;font-size:14px;">${value}</td></tr>`;
}

function orderRef(orderNumber?: string): string {
  if (!orderNumber) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;"><tr><td style="background:#f6efe0;border:1px solid #e6d8bd;border-radius:8px;padding:12px 18px;">
    <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a6e2e;">Order number</span><br/>
    <span style="font-family:Georgia,serif;font-size:21px;color:#241712;letter-spacing:1px;">${esc(orderNumber)}</span>
  </td></tr></table>`;
}

// ───────────────────────── Bookings ─────────────────────────

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
  /** Consultation questionnaire title + answers, when the service carries one. */
  intakeTitle?: string;
  intake?: { label: string; value: string }[];
}

/** Notify the salon of a new booking (best-effort — never blocks the booking). */
export async function sendBookingNotification(b: BookingEmail) {
  try {
    const content = `
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 18px;">A new booking request has come in.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
        ${detailRow("Name", esc(b.name))}${detailRow("Email", esc(b.email))}${detailRow("Phone", esc(b.phone))}
        ${detailRow("Service", `${esc(b.serviceName)} (${esc(b.serviceCategory)})`)}
        ${detailRow("When", `${esc(b.date)} at ${esc(b.time)}`)}
        ${detailRow("Deposit", b.depositRequired ? `$${b.depositAmount} (pending payment)` : "None")}
        ${b.notes ? detailRow("Notes", esc(b.notes)) : ""}
      </table>
      ${
        b.intake && b.intake.length
          ? `<div style="margin-top:24px;border-top:1px solid #ece3d2;padding-top:18px;">
        <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9a6e2e;margin:0 0 12px;">${esc(b.intakeTitle ?? "Consultation")}</p>
        ${b.intake
          .map(
            (q) =>
              `<p style="font-size:13px;line-height:1.5;color:#6b5b49;margin:0 0 2px;">${esc(q.label)}</p>` +
              `<p style="font-size:14px;line-height:1.5;color:#241712;margin:0 0 12px;">${esc(q.value)}</p>`,
          )
          .join("")}
      </div>`
          : ""
      }`;
    await getResend().emails.send({
      from: FROM,
      to: NOTIFY,
      replyTo: b.email,
      subject: `New booking: ${b.serviceName} (${b.date} ${b.time})`,
      html: emailShell({ title: "New booking request", preheader: `${b.serviceName} — ${b.date} ${b.time}`, contentHtml: content }),
    });
  } catch (e) {
    console.error("sendBookingNotification failed", e);
  }
}

/** Confirm the booking to the guest (best-effort). */
export async function sendBookingConfirmation(b: BookingEmail) {
  try {
    const content = `
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 8px;">Thank you, ${esc(b.name)}. We&rsquo;ve received your booking and will confirm shortly.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:18px 0;">
        ${detailRow("Treatment", esc(b.serviceName))}
        ${detailRow("When", `${esc(b.date)} at ${esc(b.time)}`)}
        ${b.depositRequired ? detailRow("Deposit", `$${b.depositAmount} received, applied to your total. Non-refundable.`) : ""}
      </table>
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0;">We look forward to giving you a calm, unhurried hour.</p>`;
    await getResend().emails.send({
      from: FROM,
      to: b.email,
      subject: `Your appointment is held: ${b.serviceName}`,
      html: emailShell({ title: "Your hour is held.", preheader: `${b.serviceName} — ${b.date} ${b.time}`, contentHtml: content }),
    });
  } catch (e) {
    console.error("sendBookingConfirmation failed", e);
  }
}

// ───────────────────────── Contact form ─────────────────────────

/** Forward a contact-form submission to the salon (throws on failure so the
 *  route can surface an error to the guest). */
export async function sendContactEmail(data: ContactRequest) {
  const content = `
    <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 18px;">A new message has come in through the website.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
      ${detailRow("Name", esc(data.name))}${detailRow("Email", esc(data.email))}${data.phone ? detailRow("Phone", esc(data.phone)) : ""}
    </table>
    <p style="font-size:15px;line-height:1.7;color:#241712;white-space:pre-wrap;margin:18px 0 0;">${esc(data.message)}</p>`;
  await getResend().emails.send({
    from: FROM,
    to: NOTIFY,
    replyTo: data.email,
    subject: `Contact form: ${data.name}`,
    html: emailShell({ title: "New website message", preheader: `From ${data.name}`, contentHtml: content }),
  });
}

/** Auto-reply to the guest who submitted the contact form (best-effort). */
export async function sendContactAutoReply(data: ContactRequest) {
  try {
    const content = `
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 14px;">Thank you for reaching out to Harav, ${esc(data.name)}.</p>
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 18px;">We&rsquo;ve received your message and will reply within one business day. For anything urgent, please call us at ${SITE.phone}.</p>
      <p style="font-size:13px;color:#6b5b49;margin:0 0 6px;">Your message:</p>
      <blockquote style="margin:0;padding:12px 16px;border-left:3px solid #e6d8bd;background:#f9f4e9;font-size:14px;line-height:1.6;color:#241712;white-space:pre-wrap;">${esc(data.message)}</blockquote>`;
    await getResend().emails.send({
      from: FROM,
      to: data.email,
      subject: "Thanks for contacting Harav Salon & Spa",
      html: emailShell({ title: "We&rsquo;ve received your message.", preheader: "We&rsquo;ll reply within one business day.", contentHtml: content }),
    });
  } catch (e) {
    console.error("sendContactAutoReply failed", e);
  }
}

// ───────────────────────── Product orders ─────────────────────────

export interface OrderEmailLine {
  name: string;
  quantity: number;
  /** Line total in dollars (not cents). */
  amountTotal: number;
}

export interface OrderEmail {
  /** Human-readable order reference, e.g. "HRV-7QK4M9". */
  orderNumber?: string;
  name: string;
  email: string;
  phone?: string | null;
  lines: OrderEmailLine[];
  /** Order total in dollars (not cents). */
  total: number;
  currency: string;
  /** Human-readable chosen options (e.g. shades), if any. */
  options?: string;
}

function orderLineRows(o: OrderEmail): string {
  return o.lines
    .map(
      (l) =>
        `<tr><td style="padding:7px 16px 7px 0;color:#241712;font-size:14px;border-bottom:1px solid #f0e8d6;">${l.quantity} &times; ${esc(l.name)}</td>` +
        `<td style="padding:7px 0;color:#241712;font-size:14px;text-align:right;border-bottom:1px solid #f0e8d6;">${formatPrice(l.amountTotal, o.currency)}</td></tr>`,
    )
    .join("");
}

function orderTable(o: OrderEmail): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:6px;">
      ${orderLineRows(o)}
      <tr><td style="padding:12px 16px 0 0;color:#241712;font-size:15px;font-weight:bold;">Total ${o.lines.length ? "(paid)" : ""}</td>
      <td style="padding:12px 0 0;color:#241712;font-size:15px;text-align:right;font-weight:bold;">${formatPrice(o.total, o.currency)}</td></tr>
    </table>`;
}

/** Notify the salon of a paid product order (best-effort). */
export async function sendOrderNotification(o: OrderEmail) {
  try {
    const content = `
      ${orderRef(o.orderNumber)}
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 18px;">A new product order has been paid. Prepare it for in-studio pickup.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
        ${detailRow("Name", esc(o.name))}${detailRow("Email", esc(o.email))}${o.phone ? detailRow("Phone", esc(o.phone)) : ""}
        ${o.options ? detailRow("Options", esc(o.options)) : ""}
      </table>
      ${orderTable(o)}`;
    await getResend().emails.send({
      from: FROM,
      to: ORDERS_NOTIFY,
      replyTo: o.email,
      subject: `New order ${o.orderNumber ?? ""} — ${formatPrice(o.total, o.currency)} (${o.name})`.replace(/\s+/g, " ").trim(),
      html: emailShell({ title: "New product order", preheader: `${o.orderNumber ?? "Order"} — ${formatPrice(o.total, o.currency)}`, contentHtml: content }),
    });
  } catch (e) {
    console.error("sendOrderNotification failed", e);
  }
}

/** Confirm a paid order to the customer (best-effort). */
export async function sendOrderConfirmation(o: OrderEmail) {
  try {
    const content = `
      ${orderRef(o.orderNumber)}
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 8px;">Thank you, ${esc(o.name)} — your order is confirmed and paid.</p>
      <p style="font-size:15px;line-height:1.7;color:#4a3f35;margin:0 0 20px;">We&rsquo;ll prepare it with care and email you the moment it&rsquo;s ready to collect in-studio.</p>
      ${orderTable(o)}
      <p style="font-size:14px;line-height:1.7;color:#4a3f35;margin:22px 0 0;">Pickup: ${SITE.address.line1}, ${SITE.address.city}.</p>`;
    await getResend().emails.send({
      from: FROM,
      to: o.email,
      subject: `Your Harav order is confirmed${o.orderNumber ? ` (${o.orderNumber})` : ""}`,
      html: emailShell({ title: "Thank you for your order.", preheader: `Order ${o.orderNumber ?? ""} confirmed`, contentHtml: content }),
    });
  } catch (e) {
    console.error("sendOrderConfirmation failed", e);
  }
}
