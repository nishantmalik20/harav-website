import { Hero } from "@/components/sections/hero";
import { BrandIntro } from "@/components/sections/brand-intro";
import { ProofBento } from "@/components/sections/proof-bento";
import { ServicesMenu } from "@/components/sections/services-menu";
import { ExperienceSteps } from "@/components/sections/experience-steps";
import { Bestsellers } from "@/components/sections/bestsellers";
import { JournalPreview } from "@/components/sections/journal-preview";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <ProofBento />
      <ServicesMenu />
      <ExperienceSteps />
      <Bestsellers />
      <JournalPreview />
      <Faq />
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
