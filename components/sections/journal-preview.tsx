import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/motion/reveal";
import { JOURNAL_POSTS } from "@/lib/journal";
import { cn } from "@/lib/utils";

export function JournalPreview() {
  const posts = JOURNAL_POSTS.slice(0, 3);

  return (
    <section className="bg-bone px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="justify-center">Notes from the Salon</Eyebrow>
          <SectionHeading className="mt-5">Beauty &amp; wellness, in plain language.</SectionHeading>
          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink-500">
            Small, useful notes on what to expect, how to prepare, and how to keep the glow.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-espresso/10 bg-pearl"
              >
                <Photo
                  src={post.image}
                  alt={post.title}
                  className="aspect-[3/2]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-7">
                  <p className="font-body text-xs font-medium uppercase tracking-[0.16em] text-gold-deep">
                    {post.dateLabel}
                  </p>
                  <h3 className="mt-3 font-display text-2xl leading-snug text-espresso">
                    {post.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-gold-deep transition-colors group-hover:text-espresso">
                    Read
                    <ArrowUpRight className="size-4" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/journal" className={cn(buttonVariants({ variant: "ghost" }))}>
            Read the journal
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}
