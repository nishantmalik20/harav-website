import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Your hour is held",
  robots: { index: false },
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ booking?: string }>;
}) {
  await searchParams; // booking id available if needed later
  return (
    <section className="px-6 py-32 lg:py-40">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Eyebrow className="justify-center">Reserved</Eyebrow>
        <h1 className="mt-5 font-display text-4xl text-espresso md:text-5xl">
          Your hour is held.
        </h1>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-500">
          Look for a confirmation in your inbox. We&rsquo;ll see you soon. If anything
          needs changing, call us at 431-570-1420.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className={cn(buttonVariants({ variant: "primary" }))}>
            Back to home
          </Link>
          <Link href="/treatments" className={cn(buttonVariants({ variant: "ghost" }))}>
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
