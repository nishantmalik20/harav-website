import { Hero } from "@/components/sections/hero";
import { BrandIntro } from "@/components/sections/brand-intro";
import { ProofBento } from "@/components/sections/proof-bento";
import { ServicesMenu } from "@/components/sections/services-menu";
import { ExperienceSteps } from "@/components/sections/experience-steps";
import { JournalPreview } from "@/components/sections/journal-preview";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <ProofBento />
      <ServicesMenu />
      <ExperienceSteps />
      <JournalPreview />
      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Ready <em>when you are.</em>
          </>
        }
        body="Reserve online in under a minute. Your hour begins the moment you arrive."
        ctaLabel="Reserve an hour"
        ctaHref="/book"
      />
    </>
  );
}
