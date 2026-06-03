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
          Considered skin &amp; hair care, <em>for women only.</em>
        </SectionHeading>
        <div className="mt-6 max-w-xl space-y-4 font-body text-base leading-relaxed text-ink-500">
          <p>
            Step in from the cold. Warm light over everything, and an hour that&rsquo;s
            yours alone. Facials to brighten and calm, sugaring and waxing done gently,
            lashes and nails finished with patience.
          </p>
          <p>
            No rush, no noise. Just skilled hands and treatments chosen for your skin,
            not a script.
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
