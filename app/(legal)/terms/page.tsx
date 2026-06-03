import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The plain terms for booking and visiting Harav Salon & Spa.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The plain terms for booking and visiting Harav."
    >
      <p>
        These terms cover appointments, deposits, and your visit. The full,
        reviewed terms will be published here before launch.
      </p>
      <p className="text-ink-400">[Full terms to be supplied by the business.]</p>
    </LegalPage>
  );
}
