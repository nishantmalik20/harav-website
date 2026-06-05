import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { HeroBoutique } from "@/components/sections/hero-boutique";
import { getBestsellers, toCardProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

export function Hero() {
  const featured = getBestsellers(3).map(toCardProduct);

  return (
    <section className="relative isolate overflow-hidden bg-espresso text-pearl">
      {/* Background photograph — a warm, low-lit massage in our treatment room */}
      <Image
        src="/hero/hero-massage.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
        style={{ filter: "saturate(1.05) brightness(0.8)" }}
      />
      {/* Warm brand wash — heavier on the left so the headline stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(102deg, rgba(36,23,18,0.94) 0%, rgba(44,27,17,0.86) 38%, rgba(58,36,18,0.52) 72%, rgba(36,23,18,0.64) 100%)",
        }}
      />
      {/* Top/bottom legibility overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(36,23,18,0.4) 0%, rgba(36,23,18,0) 32%, rgba(36,23,18,0) 60%, rgba(36,23,18,0.65) 100%)",
        }}
      />
      {/* Faint gold deco circles */}
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

      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-12 lg:px-8 lg:py-32">
        <div>
          <Eyebrow onDark>A women&rsquo;s salon &amp; spa · Winnipeg</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.03] tracking-[0.005em] sm:text-6xl lg:text-[86px]">
            An hour of calm,
            <br />
            <em className="not-italic text-gold-light">made for you.</em>
          </h1>
          <p className="mt-7 max-w-lg font-body text-base leading-relaxed text-pearl/80">
            A women&rsquo;s salon &amp; spa in Winnipeg&rsquo;s Fort Garry. Facials, body
            sugaring, waxing, lash &amp; brow, nails and massage — given in warm light
            and careful hands. Book your appointment, or take the ritual home from
            our boutique.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/book" className={cn(buttonVariants({ variant: "brass" }))}>
              Book services
              <ArrowUpRight className="size-4" strokeWidth={2.4} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 border border-pearl/40 px-7 py-4 font-body text-xs font-medium uppercase tracking-[0.22em] text-pearl transition-colors hover:border-gold-light hover:text-gold-light"
            >
              See services
            </Link>
          </div>
        </div>

        {/* Boutique highlight — signals that Harav also retails the products it
            uses in treatment, and gives the hero a gentle moment of motion. */}
        <HeroBoutique products={featured} />
      </div>
    </section>
  );
}
