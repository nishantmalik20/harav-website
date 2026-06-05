import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function BrandIntro() {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Eyebrow className="justify-center">The Harav Standard</Eyebrow>
        <SectionHeading className="mt-5 max-w-2xl">
          Considered skincare &amp; beauty, <em>for women only.</em>
        </SectionHeading>
        <div className="mt-6 max-w-xl space-y-4 font-body text-base leading-relaxed text-ink-500">
          <p>
            Harav is a women-only salon &amp; spa on Pembina Highway in Fort Garry, built
            for one thing: an unhurried hour that&rsquo;s entirely yours. Step in from the
            Winnipeg cold to warm light, careful hands, and treatments chosen for your
            skin — never a script.
          </p>
          <p>
            From brightening facials and gentle body sugaring to waxing, lash &amp; brow
            work, nails and massage, every treatment is done properly and without rush.
            We use professional Éminence Organic skincare, matched to what your skin
            needs on the day.
          </p>
          <p>
            No noise, no upsell theatre — just considered care, and the quiet luxury of
            being looked after well.
          </p>
        </div>
        <Link href="/book" className={cn(buttonVariants({ variant: "primary" }), "mt-9")}>
          Book an appointment
          <ArrowUpRight className="size-4" strokeWidth={2.4} />
        </Link>
      </Reveal>
    </section>
  );
}
