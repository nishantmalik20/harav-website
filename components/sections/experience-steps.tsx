import { CalendarDays, Sparkles, Flower2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    icon: CalendarDays,
    title: "Book your hour",
    body: "Choose your treatment, date and time online. We confirm by email and hold the time for you.",
  },
  {
    icon: Sparkles,
    title: "A treatment, tailored",
    body: "We read your skin and your day, then adjust, so the hour fits you, not a template.",
  },
  {
    icon: Flower2,
    title: "Restore & glow",
    body: "Warm light, quiet care, and a finish you'll feel for days.",
  },
];

export function ExperienceSteps() {
  return (
    <section className="bg-cream/40 px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow className="justify-center">The Experience</Eyebrow>
          <SectionHeading className="mt-5">
            An hour, made for <em>pure relaxation.</em>
          </SectionHeading>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-ink-500">
            Three simple steps, from booking to the moment you exhale.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-md border border-espresso/10 bg-pearl p-9">
                <span className="grid size-14 place-items-center rounded-full border border-gold/40">
                  <step.icon className="size-6 text-gold-deep" strokeWidth={1.7} />
                </span>
                <h3 className="mt-9 font-display text-[26px] text-espresso">{step.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-500">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
