import Link from "next/link";
import { AutoVideo } from "@/components/motion/auto-video";
import { Reveal } from "@/components/motion/reveal";

/** Full-bleed editorial category strip — three tall cards with ambient video,
 *  a large vertical word along the left edge, and a quiet pill CTA. */
const CATEGORIES = [
  {
    word: "face",
    cta: "Book facials",
    href: "/services#facials",
    video: "/videos/ritual-face.mp4",
    poster: "/videos/ritual-face.jpg",
  },
  {
    word: "lash & brow",
    cta: "Book lash & brow",
    href: "/services#lash-brow",
    video: "/videos/ritual-lash.mp4",
    poster: "/videos/ritual-lash.jpg",
  },
  {
    word: "body",
    cta: "Book body care",
    href: "/services#body-sugaring",
    video: "/videos/ritual-body.mp4",
    poster: "/videos/ritual-body.jpg",
  },
] as const;

export function CareCategories() {
  return (
    <section aria-label="Treatment areas" className="px-1.5 pb-24 lg:px-2 lg:pb-28">
      <div className="grid gap-1.5 md:grid-cols-3 lg:gap-2">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.word} delay={i * 0.08}>
            <Link
              href={c.href}
              className="group relative block overflow-hidden rounded-md bg-espresso"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4]">
                <AutoVideo
                  src={c.video}
                  poster={c.poster}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Scrim for the vertical word + pill legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-espresso/45 via-espresso/0 to-espresso/25"
                />
                <span className="absolute left-4 top-5 font-display text-5xl lowercase leading-none tracking-[0.02em] text-pearl [writing-mode:vertical-rl] lg:left-5 lg:text-6xl xl:text-7xl">
                  {c.word}
                </span>
                <span className="absolute bottom-5 left-5 inline-flex items-center rounded-full bg-pearl px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-espresso transition-colors duration-300 group-hover:bg-gold">
                  {c.cta}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
