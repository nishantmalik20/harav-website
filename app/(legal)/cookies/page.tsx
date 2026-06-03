import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies the Harav Salon & Spa website uses, and why.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" intro="The cookies this site uses, and why.">
      <p>
        This site uses only the cookies needed to run securely and to understand how
        the site is used. No advertising trackers.
      </p>
      <p className="text-ink-400">[Full cookie policy to be supplied by the business.]</p>
    </LegalPage>
  );
}
