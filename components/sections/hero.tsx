import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="hero-gradient relative isolate overflow-hidden text-pearl">
      {/* legibility overlays */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(36,23,18,0.45) 0%, rgba(36,23,18,0) 30%, rgba(36,23,18,0) 55%, rgba(36,23,18,0.7) 100%)",
        }}
      />
      {/* faint gold deco circles */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 -z-10 opacity-40"
        width="420"
        height="460"
        viewBox="0 0 420 460"
        fill="none"
      >
        <circle cx="130" cy="130" r="128" stroke="#C99B5C" strokeWidth="1.2" opacity="0.6" />
        <circle cx="70" cy="320" r="160" stroke="#C99B5C" strokeWidth="1.2" opacity="0.4" />
      </svg>

      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-10 lg:px-8 lg:py-32">
        <div>
          <Eyebrow onDark>Real Care, Real Results</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.03] tracking-[0.005em] sm:text-6xl lg:text-[86px]">
            Natural beauty &amp;
            <br />
            <em className="not-italic text-gold-light">wellness care.</em>
          </h1>
          <p className="mt-7 max-w-md font-body text-base leading-relaxed text-pearl/80">
            A women&rsquo;s salon &amp; spa in Winnipeg. Facials, sugaring, lashes
            and more, in warm light and careful hands.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/book" className={cn(buttonVariants({ variant: "brass" }))}>
              Reserve an hour
              <ArrowUpRight className="size-4" strokeWidth={2.4} />
            </Link>
            <Link
              href="/treatments"
              className="inline-flex items-center gap-3 border border-pearl/40 px-7 py-4 font-body text-xs font-medium uppercase tracking-[0.22em] text-pearl transition-colors hover:border-gold-light hover:text-gold-light"
            >
              See the menu
            </Link>
          </div>
        </div>

        {/* Offer module */}
        <div className="flex items-stretch gap-4 lg:justify-end">
          <Photo
            src={IMAGES.offerProducts}
            alt="Harav skincare products"
            className="hidden w-44 shrink-0 rounded-sm sm:block"
            sizes="176px"
          />
          <div className="flex flex-col justify-center rounded-sm border border-gold/45 bg-[rgba(58,36,18,0.55)] p-7 backdrop-blur-sm">
            <p className="font-display text-4xl leading-none">A first hour.</p>
            <p className="mt-3 font-body text-sm font-medium uppercase tracking-[0.14em] text-gold-light">
              New-guest pricing
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-pearl/80">
              Introductory pricing on select facials for first-time guests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
