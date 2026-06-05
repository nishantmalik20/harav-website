import type { Metadata } from "next";
import { Phone, Mail } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactForm } from "@/components/contact/contact-form";
import { VisitMap } from "@/components/contact/visit-map";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Find Harav Salon & Spa at Unit #2 – 1172 Pembina Hwy, Winnipeg. Hours, directions, phone and an easy way to reach us or book your hour.",
};

export default function ContactPage() {
  return (
    <>
      <section className="px-6 pt-20 pb-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Come See Us</Eyebrow>
          <h1 className="mt-5 font-display text-5xl text-espresso md:text-6xl">Visit Harav.</h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-500">
            On Pembina Highway in Fort Garry. Warm light, easy parking, and an hour
            with your name on it.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Find us */}
          <div>
            <SectionHeading as="h2" className="text-[28px] md:text-[34px]">
              Where to find us.
            </SectionHeading>
            <address className="mt-5 font-body text-base not-italic leading-relaxed text-ink-500">
              {SITE.address.line1}
              <br />
              {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              <br />
              <span className="text-ink-400">
                Minutes from the University of Manitoba. Parking is in the back lane
                behind the building, and the salon is accessible.
              </span>
            </address>

            <dl className="mt-6 space-y-1 border-t border-espresso/10 pt-6 font-body text-sm text-ink-500">
              {SITE.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-6">
                  <dt className="uppercase tracking-[0.14em] text-ink-400">{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 font-body text-sm">
              <a href={`tel:${SITE.phoneHref}`} className="flex items-center gap-3 text-ink-600 hover:text-gold-deep">
                <Phone className="size-4 text-gold-deep" strokeWidth={1.8} />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-ink-600 hover:text-gold-deep">
                <Mail className="size-4 text-gold-deep" strokeWidth={1.8} />
                {SITE.email}
              </a>
            </div>

            <div className="mt-8">
              <VisitMap />
            </div>
          </div>

          {/* Reach us */}
          <div>
            <SectionHeading as="h2" className="text-[28px] md:text-[34px]">
              Say hello.
            </SectionHeading>
            <p className="mt-5 mb-8 max-w-md font-body text-base leading-relaxed text-ink-500">
              A question about a treatment, a booking, or a gift? Send a note and
              we&rsquo;ll reply within one business day. For a faster answer, call us.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Your hour is <em>waiting.</em>
          </>
        }
        body="Book online, or call and we'll fit you in."
        ctaLabel="Book services"
        ctaHref="/book"
      />
    </>
  );
}
