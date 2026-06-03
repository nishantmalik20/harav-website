import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Cancellation & Refunds",
  description: "How deposits, changes and cancellations work at Harav Salon & Spa.",
};

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Cancellation & Refunds"
      intro="How deposits, changes and cancellations work."
    >
      <p>
        Booking deposits are <strong className="text-espresso">non-refundable</strong>.
        A deposit holds your time and is applied to your treatment on the day. If you
        need to change an appointment, please give us as much notice as you can.
      </p>
      <p className="text-ink-400">
        [Full cancellation window and rescheduling policy to be confirmed by the business.]
      </p>
    </LegalPage>
  );
}
