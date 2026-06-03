import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { JOURNAL_POSTS } from "@/lib/journal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Plain-language notes on facials, sugaring, lashes and self-care from Harav Salon & Spa in Winnipeg. What to expect, how to prepare, how to glow.",
};

export default function JournalPage() {
  return (
    <>
      <section className="px-6 pt-20 pb-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Notes from the Salon</Eyebrow>
          <h1 className="mt-5 font-display text-5xl text-espresso md:text-6xl">The journal.</h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-500">
            Small, useful notes on beauty and wellness, written the way we&rsquo;d tell
            you in the chair.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {JOURNAL_POSTS.map((post) => (
            <Link
              key={post.slug}
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
                <h2 className="mt-3 font-display text-2xl leading-snug text-espresso">
                  {post.title}
                </h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-gold-deep transition-colors group-hover:text-espresso">
                  Read
                  <ArrowUpRight className="size-4" strokeWidth={2.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-6xl text-center">
          <Link href="/book" className={cn(buttonVariants({ variant: "ghost" }))}>
            Reserve an hour
            <ArrowUpRight className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    </>
  );
}
