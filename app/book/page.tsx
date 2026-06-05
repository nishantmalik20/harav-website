import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BookingForm } from "@/components/booking/booking-form";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book facials, sugaring, waxing, lashes, nails or massage at Harav in Winnipeg. Quick online booking. A $20 deposit holds select treatments.",
};

const STEPS = [
  "Choose your treatment.",
  "Pick a date and time that suits you.",
  "Add your details, and a $20 deposit for select treatments, applied to your total.",
  "Get an instant confirmation by email.",
];

export default function BookPage() {
  return (
    <section className="px-6 pt-20 pb-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Book Your Appointment</Eyebrow>
        <h1 className="mt-5 font-display text-5xl text-espresso md:text-6xl">
          Book your appointment.
        </h1>
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-500">
          A minute now, an hour that&rsquo;s yours later. Choose a treatment, pick a time,
          and we&rsquo;ll hold it.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl text-espresso">Simple, start to finish.</h2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/40 font-body text-xs text-gold-deep">
                    {i + 1}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-ink-500">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-md border border-espresso/10 bg-cream/40 p-6">
              <h3 className="font-display text-xl text-espresso">The $20 deposit, plainly.</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">
                Some treatments take a small $20 deposit to hold the time: facials,
                full-leg sugaring, full-body waxing, the 60-minute massage, lash lifts and
                extensions, and gel nails and fills. It comes straight off your total on the
                day, so it isn&rsquo;t an extra charge. Everything else books with no deposit.
                The deposit is non-refundable; it holds your hour.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-md border border-espresso/10 bg-pearl p-7 lg:p-9">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
