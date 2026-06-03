import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SERVICE_CATEGORIES, formatPrice, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Treatments & Pricing",
  description:
    "Facials, body sugaring, waxing, lash & brow, nails and massage in Winnipeg. See Harav's full menu and reserve your appointment online.",
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="px-6 pt-20 pb-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>The Full Menu</Eyebrow>
          <h1 className="mt-5 font-display text-5xl text-espresso md:text-6xl">Treatments.</h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-500">
            Everything we do, in one place, with honest pricing and an easy way to book.
          </p>
          <Link href="/book" className={cn(buttonVariants({ variant: "primary" }), "mt-8")}>
            Reserve an hour
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </Link>

          {/* Category jump links */}
          <nav aria-label="Treatment categories" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-espresso/10 pt-6">
            {SERVICE_CATEGORIES.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="font-body text-xs uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-gold-deep"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {SERVICE_CATEGORIES.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-28 border-t border-espresso/10 py-16"
          >
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="font-display text-[34px] text-espresso md:text-[40px]">
                  {category.name}
                </h2>
                <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-500">
                  {category.blurb}
                </p>
                {category.depositNote && (
                  <p className="mt-4 font-body text-xs leading-relaxed text-gold-deep">
                    {category.depositNote}
                  </p>
                )}
                <Link
                  href="/book"
                  className="mt-5 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-espresso transition-colors hover:text-gold-deep"
                >
                  Book {category.name.toLowerCase()}
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </Link>
              </div>

              <ul>
                {category.services.map((service) => (
                  <li
                    key={service.name}
                    className="flex items-baseline justify-between gap-4 border-b border-espresso/[0.08] py-3.5"
                  >
                    <span className="flex flex-wrap items-center gap-2.5">
                      <span className="font-body text-[15px] text-espresso">{service.name}</span>
                      {service.deposit && (
                        <span className="rounded-full bg-cream px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.12em] text-gold-deep">
                          $20 deposit
                        </span>
                      )}
                    </span>
                    <ServicePrice service={service} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Found <em>your hour?</em>
          </>
        }
        body="Reserve online in under a minute. We'll hold the time and send a confirmation."
        ctaLabel="Reserve an hour"
        ctaHref="/book"
      />
    </>
  );
}

function ServicePrice({ service }: { service: Service }) {
  if (service.salePrice && service.price !== null) {
    return (
      <span className="whitespace-nowrap font-display text-lg text-gold-deep">
        <span className="mr-2 font-body text-sm text-ink-400 line-through">${service.price}</span>
        ${service.salePrice}
      </span>
    );
  }
  return (
    <span className="whitespace-nowrap font-display text-lg text-gold-deep">
      {formatPrice(service)}
    </span>
  );
}
