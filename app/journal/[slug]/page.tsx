import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JOURNAL_POSTS, getPost } from "@/lib/journal";

export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: "Harav Salon & Spa" },
    image: post.image,
    keywords: post.keywords.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="px-6 pt-20 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-gold-deep"
          >
            <ArrowLeft className="size-4" strokeWidth={2.2} />
            The journal
          </Link>

          <p className="mt-8 font-body text-xs font-medium uppercase tracking-[0.16em] text-gold-deep">
            {post.dateLabel}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-espresso md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 font-body text-sm text-ink-500">
            {post.author.name} · {post.author.role}
          </p>

          <Photo
            src={post.image}
            alt={post.title}
            className="mt-10 aspect-[16/9] rounded-md"
            sizes="(max-width: 1024px) 100vw, 768px"
            priority
          />

          <div className="mt-10 font-body text-[17px] leading-relaxed text-ink-600">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="mt-10 font-display text-2xl leading-snug text-espresso md:text-[28px]"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="mt-5 space-y-2.5 pl-5">
                    {block.items.map((item, j) => (
                      <li key={j} className="list-disc marker:text-gold-deep">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mt-5">
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>

      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Ready <em>when you are.</em>
          </>
        }
        body="Book online in under a minute. Your hour begins the moment you arrive."
        ctaLabel="Book services"
        ctaHref="/book"
      />
    </>
  );
}
