import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BestsellersCarousel } from "@/components/sections/bestsellers-carousel";
import { getBestsellers, getProductsByCategory, toCardProduct } from "@/lib/products";

// Featured in the hero already — skip here so the homepage doesn't repeat it.
const FEATURED_IN_HERO = "facial-recovery-oil";

export function Bestsellers() {
  const bestsellers = getBestsellers()
    .filter((p) => p.slug !== FEATURED_IN_HERO)
    .slice(0, 10)
    .map(toCardProduct);
  const sets = getProductsByCategory("sets").slice(0, 9).map(toCardProduct);

  if (bestsellers.length === 0 && sets.length === 0) return null;

  return (
    <section className="border-y border-espresso/10 bg-white px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-2 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-gold-deep">
              From the Boutique
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-espresso"
            >
              Shop all products
              <ArrowUpRight className="size-4" strokeWidth={2.2} />
            </Link>
          </div>
          <BestsellersCarousel bestsellers={bestsellers} sets={sets} />
        </Reveal>
      </div>
    </section>
  );
}
