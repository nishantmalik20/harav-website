import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="px-6 py-32 lg:py-40">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="mt-5 font-display text-4xl text-espresso md:text-5xl">
          This hour got away from us.
        </h1>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-500">
          The page you&rsquo;re after isn&rsquo;t here. Moved, finished, or never
          quite was. Let&rsquo;s get you back to the warm light.
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "primary" }), "mt-9")}>
          Back to home
          <ArrowUpRight className="size-4" strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}
