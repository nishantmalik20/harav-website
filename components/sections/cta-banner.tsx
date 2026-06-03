import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Dark closing CTA band — reused on Home, Treatments, About, Contact. */
export function CtaBanner({
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref = "/book",
}: {
  eyebrow: string;
  heading: React.ReactNode;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
}) {
  return (
    <section className="hero-gradient relative isolate overflow-hidden text-pearl">
      <svg
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 -z-10 -translate-y-1/2 opacity-30"
        width="280"
        height="260"
        viewBox="0 0 280 260"
        fill="none"
      >
        <ellipse cx="160" cy="120" rx="110" ry="60" stroke="#C99B5C" strokeWidth="1.2" transform="rotate(-30 160 120)" />
        <circle cx="200" cy="160" r="70" stroke="#C99B5C" strokeWidth="1.2" />
      </svg>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center lg:py-28">
        <Eyebrow onDark className="justify-center">
          {eyebrow}
        </Eyebrow>
        <SectionHeading className="mt-5 text-pearl [&_em]:text-gold-light">
          {heading}
        </SectionHeading>
        <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-pearl/80">
          {body}
        </p>
        <Link href={ctaHref} className={cn(buttonVariants({ variant: "onDark" }), "mt-9")}>
          {ctaLabel}
          <ArrowUpRight className="size-4" strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}
