import { Eyebrow } from "@/components/ui/eyebrow";

/** Shared shell for the lightweight legal pages. */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-5 font-display text-4xl text-espresso md:text-5xl">{title}</h1>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-500">{intro}</p>
        <div className="mt-8 space-y-4 font-body text-sm leading-relaxed text-ink-500 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-espresso">
          {children}
        </div>
      </div>
    </section>
  );
}
