import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Harav Salon & Spa collects when you book, and how we look after it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="What we collect when you book, and how we look after it."
    >
      <p>
        When you book or contact us, we collect the details you provide (your name,
        email, phone, and any notes) to arrange and confirm your appointment. We do
        not sell your information.
      </p>
      <p className="text-ink-400">[Full privacy policy to be supplied by the business.]</p>
    </LegalPage>
  );
}
