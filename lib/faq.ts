/**
 * Frequently asked questions. Plain, honest answers in the brand's formal,
 * professional voice — and quietly keyword-rich for local SEO (Winnipeg,
 * Fort Garry, Pembina, sugaring, waxing, facials, Éminence). Rendered as an
 * accessible accordion plus FAQPage structured data in components/sections/faq.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "Where is Harav Salon & Spa located?",
    a: "Harav Salon & Spa is at Unit #2 – 1172 Pembina Highway in Winnipeg, in the Fort Garry neighbourhood and only minutes from the University of Manitoba. Parking is available in the back lane behind the building, and the studio is accessible.",
  },
  {
    q: "Is Harav a women-only salon and spa?",
    a: "Yes. Harav is a women-only space by design, created so every guest feels comfortable and unhurried — especially during more personal treatments such as body sugaring and intimate waxing.",
  },
  {
    q: "What services do you offer?",
    a: "We offer facials, body sugaring, waxing and threading, lash and brow services, manicures and pedicures, and massage. We focus on this menu so each treatment is done properly and unhurried. We do not currently offer hair styling, makeup application, or laser hair removal.",
  },
  {
    q: "How do I book an appointment in Winnipeg?",
    a: "You can book online in under a minute from the Book page: choose your treatment, pick a date and time, and add your details. You'll receive an instant email confirmation. If you'd prefer to speak with us, call 431-570-1420.",
  },
  {
    q: "Do I need to pay a deposit to book?",
    a: "Select treatments take a $20 deposit to hold your time — all facials, full-leg sugaring, full-body waxing, the 60-minute massage, lash lifts and extensions, and gel nails and fills. The deposit is applied to your total on the day, so it isn't an extra charge. It is non-refundable, as it holds your appointment. Every other treatment books with no deposit.",
  },
  {
    q: "What is the difference between sugaring and waxing?",
    a: "Both remove hair from the root for weeks of smooth skin. Sugaring uses a warm paste of only sugar, lemon and water, applied and removed in the direction that is gentlest on the skin — a good choice for sensitive skin. Waxing is quick and efficient over larger areas. We offer both and are happy to help you choose.",
  },
  {
    q: "Is sugaring or waxing better for sensitive skin?",
    a: "Sugaring tends to be gentler, because the paste is never hot and is removed in the direction of hair growth with less pulling on the skin. If your skin runs sensitive or reactive, we usually suggest starting with sugaring.",
  },
  {
    q: "How should I prepare for my first facial or waxing appointment?",
    a: "Arrive with clean skin where possible, and pause strong actives such as retinol for a few days beforehand. For sugaring or waxing, let the hair grow to about a quarter-inch. Tell us about anything new — a reaction, a breakout, or an occasion you're preparing for — so we can tailor your treatment to your skin on the day.",
  },
  {
    q: "Can I buy skincare products at Harav?",
    a: "Yes. Our boutique carries the Éminence Organic Skin Care range we use in treatment. You can shop online and collect your order in-studio, or browse and purchase during your visit, with guidance on what suits your skin.",
  },
  {
    q: "What are your hours?",
    a: "We are open Monday to Friday 10am–7pm, Saturday 10am–6pm, and Sunday 11am–6pm. The surest way to secure your preferred time is to book online in advance.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Plans change, and we understand. If you need to reschedule or cancel, please give us as much notice as you can so we can offer the time to another guest. The $20 deposit on select treatments is non-refundable, as it reserves your appointment.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Because Harav is a single-esthetician studio built around unhurried, one-on-one care, we recommend booking ahead to be certain of your time. If you're nearby, call 431-570-1420 and we'll let you know the soonest available opening.",
  },
];
