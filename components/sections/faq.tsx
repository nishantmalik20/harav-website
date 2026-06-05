import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { FAQS, type FaqItem } from "@/lib/faq";

/**
 * Accessible FAQ accordion built on native <details>/<summary>: every answer is
 * in the DOM (good for SEO and no-JS), and we emit FAQPage structured data for
 * rich results. Reusable — pass a curated `items` subset on other pages.
 */
export function Faq({
  items = FAQS,
  eyebrow = "Questions, Answered",
  heading,
}: {
  items?: FaqItem[];
  eyebrow?: string;
  heading?: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
          <SectionHeading className="mt-5">
            {heading ?? (
              <>
                Good to know <em>before you come in.</em>
              </>
            )}
          </SectionHeading>
        </Reveal>

        <dl className="mt-12 divide-y divide-espresso/10 border-y border-espresso/10">
          {items.map((f, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-lg leading-snug text-espresso transition-colors hover:text-gold-deep [&::-webkit-details-marker]:hidden">
                <dt>{f.q}</dt>
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-gold-deep transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={2}
                />
              </summary>
              <dd className="-mt-1 pb-6 pr-9 font-body text-[15px] leading-relaxed text-ink-500">
                {f.a}
              </dd>
            </details>
          ))}
        </dl>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
