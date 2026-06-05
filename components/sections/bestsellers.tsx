import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { getBestsellers, toCardProduct } from "@/lib/products";

// Featured in the hero already — skip here so the homepage doesn't repeat it.
const FEATURED_IN_HERO = "facial-recovery-oil";

export function Bestsellers() {
  const products = getBestsellers()
    .filter((p) => p.slug !== FEATURED_IN_HERO)
    .slice(0, 4)
    .map(toCardProduct);

  if (products.length === 0) return null;

  return (
    <section className="px-6 py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>From the Boutique</Eyebrow>
            <SectionHeading className="mt-5">
              Best sellers, <em>taken home.</em>
            </SectionHeading>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-espresso"
          >
            Shop all products
            <ArrowUpRight className="size-4" strokeWidth={2.2} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
