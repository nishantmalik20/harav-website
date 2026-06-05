import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { IMAGES } from "@/lib/images";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const FEATURED = [
  {
    title: "Facials",
    img: IMAGES.serviceFacials,
    href: "/services#facials",
    price: "From $49",
    blurb:
      "Brighten, calm, renew. From a quick refresh to advanced hydradermabrasion and carbon-laser facials.",
    cta: "See facials",
    active: true,
  },
  {
    title: "Body sugaring",
    img: IMAGES.serviceSugaring,
    href: "/services#body-sugaring",
    price: "From $18",
    blurb: "Gentle, natural hair removal, bikini to full legs, done warm and quick.",
    cta: "See sugaring",
    active: false,
  },
  {
    title: "Lash & brow",
    img: IMAGES.serviceLash,
    href: "/services#lash-brow",
    price: "From $24",
    blurb: "Lifts, tints, and extensions. Eyes opened, softly.",
    cta: "See lash & brow",
    active: false,
  },
];

export function ServicesMenu() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The Menu</Eyebrow>
            <SectionHeading className="mt-5">Our services.</SectionHeading>
          </div>
          <p className="max-w-sm font-body text-base leading-relaxed text-ink-500">
            Six services, one standard of care — facials, body sugaring, waxing, lash
            &amp; brow, nails and massage, each done properly in a calm, women-only room
            in Fort Garry.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURED.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <Link
                href={card.href}
                className={cn(
                  "group flex h-full flex-col rounded-md border p-7 transition-colors",
                  card.active
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-espresso/10 bg-pearl text-espresso hover:border-gold/50",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl">{card.title}</h3>
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-full transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      card.active ? "bg-white" : "bg-espresso",
                    )}
                  >
                    <ArrowUpRight
                      className={cn("size-4", card.active ? "text-terracotta" : "text-gold")}
                      strokeWidth={2.4}
                    />
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-3 font-body text-sm leading-relaxed",
                    card.active ? "text-white/85" : "text-ink-500",
                  )}
                >
                  {card.blurb}
                </p>
                <p
                  className={cn(
                    "mt-5 font-body text-xs font-medium uppercase tracking-[0.16em]",
                    card.active ? "text-white" : "text-gold-deep",
                  )}
                >
                  {card.price}
                </p>
                <Photo
                  src={card.img}
                  alt={card.title}
                  className="mt-6 aspect-[4/3] rounded-sm"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-espresso"
          >
            See the full menu: waxing, nails &amp; massage too
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
