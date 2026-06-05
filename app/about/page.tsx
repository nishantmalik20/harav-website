import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { IMAGES } from "@/lib/images";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harav is a women's salon & spa on Pembina Hwy in Winnipeg: warm, careful, results-led care. Meet the room, the standard, and Khushi.",
};

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pt-20 pb-12 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Our Story</Eyebrow>
          <h1 className="mt-5 font-display text-5xl text-espresso md:text-6xl">
            A quiet room, kept warm.
          </h1>
          <p className="mt-5 font-body text-base leading-relaxed text-ink-500">
            Harav is a women&rsquo;s salon &amp; spa in Winnipeg, built around one idea:
            an hour that&rsquo;s entirely yours.
          </p>
          <Link
            href="/services"
            className={cn(buttonVariants({ variant: "primary" }), "mt-9")}
          >
            See the menu
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </section>

      {/* The idea */}
      <section className="px-6 py-16 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading as="h2">Why we made Harav.</SectionHeading>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink-500">
              <p>
                Most beauty appointments feel like errands: bright, brisk, in and out.
                We wanted the opposite. A women-only room with warm light, careful hands,
                and time that doesn&rsquo;t rush you.
              </p>
              <p>
                Facials, sugaring, lashes, nails, all done properly, and made to feel like a
                small luxury you can actually keep.
              </p>
            </div>
          </div>
          <Photo
            src={IMAGES.aboutIdea}
            alt="The Harav salon space"
            className="aspect-[4/3] rounded-md"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
      </section>

      {/* The standard */}
      <section className="px-6 py-16 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <Photo
            src={IMAGES.aboutWork}
            alt="An esthetician at work"
            className="order-last aspect-[4/3] rounded-md lg:order-first"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <SectionHeading as="h2">How we work.</SectionHeading>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink-500">
              <p>
                Clean and precise, always. Treatments chosen for your skin and your day,
                not a script. Gentle where it counts, especially the intimate ones.
              </p>
              <p>
                We keep the menu honest and the pricing plain. No upsell theatre, just
                the treatment you came for, done well.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The room */}
      <section className="bg-bone px-6 py-20 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <Eyebrow>The Room</Eyebrow>
            <SectionHeading as="h2" className="mt-5">
              On Pembina, in Fort Garry.
            </SectionHeading>
            <p className="mt-6 font-body text-base leading-relaxed text-ink-500">
              A few minutes from the University of Manitoba. Parking is in the back lane
              behind the building, and the salon is accessible. Easy to reach, easy to
              slow down.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Photo
              src={IMAGES.aboutRoom1}
              alt="Inside the Harav salon"
              className="aspect-[4/3] rounded-md"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <Photo
              src={IMAGES.aboutRoom2}
              alt="The Harav treatment space"
              className="aspect-[4/3] rounded-md"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </section>

      {/* The team */}
      <section className="px-6 py-20 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Photo
            src={IMAGES.aboutKhushi}
            alt="A Harav esthetician at work"
            className="aspect-[4/5] rounded-md"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div>
            <Eyebrow>The Hands Behind the Hour</Eyebrow>
            <SectionHeading as="h2" className="mt-5">
              Meet Khushi.
            </SectionHeading>
            <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-ink-500">
              <p>
                Harav is Khushi&rsquo;s room. With more than five years in skin and beauty
                work, she opened it to do things her way: unhurried, precise, and warm.
              </p>
              <p>
                She&rsquo;ll be the one reading your skin, choosing the treatment, and
                keeping the hour calm. One pair of hands, fully yours for the time
                you&rsquo;re here.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Come in <em>from the cold.</em>
          </>
        }
        body="Your first hour is the easiest to book. We'll take care of the rest."
        ctaLabel="Book services"
        ctaHref="/book"
      />
    </>
  );
}
