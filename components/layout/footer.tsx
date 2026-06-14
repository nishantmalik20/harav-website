import Link from "next/link";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
import { BrandLockup } from "@/components/brand/brand-lockup";
import { NewsletterForm } from "./newsletter-form";
import { SITE } from "@/lib/site";
import { SERVICE_CATEGORIES } from "@/lib/services";

const LEGAL = [
  { href: "/terms", label: "Terms" },
  { href: "/returns", label: "Cancellation & Refunds" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Brand + newsletter */}
          <div>
            <BrandLockup onDark logoClassName="h-14" />
            <p className="mt-6 max-w-xs font-body text-sm leading-relaxed text-ink-300">
              A women&rsquo;s salon &amp; spa on Pembina Highway in Winnipeg.
              Facials, body sugaring, waxing, lash &amp; brow, nails, and massage.
              Warm light, careful hands, and an hour cast entirely for you.
            </p>
            <NewsletterForm />
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="mb-6 font-body text-sm font-medium uppercase tracking-[0.18em] text-gold-light">
              Services
            </h2>
            <ul className="space-y-3.5">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/services#${category.slug}`}
                    className="font-body text-sm text-ink-300 transition-colors hover:text-gold-light"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore">
            <h2 className="mb-6 font-body text-sm font-medium uppercase tracking-[0.18em] text-gold-light">
              Explore
            </h2>
            <ul className="space-y-3.5">
              {[
                { href: "/about", label: "About" },
                { href: "/journal", label: "Journal" },
                { href: "/book", label: "Book" },
                { href: "/contact", label: "Visit" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-ink-300 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h2 className="mb-6 font-body text-sm font-medium uppercase tracking-[0.18em] text-gold-light">
              Visit
            </h2>
            <address className="space-y-1 font-body text-sm not-italic leading-relaxed text-ink-300">
              <p>{SITE.address.line1}</p>
              <p>
                {SITE.address.city}, {SITE.address.region} {SITE.address.postalCode}
              </p>
            </address>
            <dl className="mt-4 space-y-0.5 font-body text-sm text-ink-300">
              {SITE.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 space-y-2.5 font-body text-sm">
              <a
                href={`tel:${SITE.phoneHref}`}
                className="flex items-center gap-3 text-ink-300 transition-colors hover:text-gold-light"
              >
                <Phone className="size-4 text-gold" strokeWidth={1.8} />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-ink-300 transition-colors hover:text-gold-light"
              >
                <Mail className="size-4 text-gold" strokeWidth={1.8} />
                {SITE.email}
              </a>
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.socials.instagram}
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-gold/15 transition-colors hover:bg-gold/30"
              >
                <Instagram className="size-4 text-gold-light" strokeWidth={1.8} />
              </a>
              <a
                href={SITE.socials.facebook}
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-gold/15 transition-colors hover:bg-gold/30"
              >
                <Facebook className="size-4 text-gold-light" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-gold/20 pt-7 font-body text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Harav Salon &amp; Spa. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-gold-light">
                {link.label}
              </Link>
            ))}
          </div>
          <p>
            Built and managed by{" "}
            <a
              href="https://inishant.com"
              className="text-gold-light transition-opacity hover:opacity-80"
            >
              inishant.com
            </a>{" "}
            via{" "}
            <a
              href="https://onboardprints.ca"
              className="text-gold-light transition-opacity hover:opacity-80"
            >
              onboardprints.ca
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
