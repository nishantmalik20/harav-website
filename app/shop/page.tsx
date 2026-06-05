import type { Metadata } from "next";
import { Suspense } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ShopCatalog } from "@/components/shop/shop-catalog";
import { CheckoutCanceledNote } from "@/components/shop/checkout-canceled-note";
import { getCardProducts, getCategories, getConcerns } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Éminence Organic Skin Care",
  description:
    "Shop Éminence Organic Skin Care at Harav Salon & Spa in Winnipeg — cleansers, serums, masques, moisturizers, body and sun care, hand-picked by our esthetician.",
};

export default function ShopPage() {
  const products = getCardProducts();
  const categories = getCategories();
  const concerns = getConcerns();

  return (
    <div className="px-6 pb-24 pt-24 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={null}>
          <CheckoutCanceledNote />
        </Suspense>
        <Reveal className="max-w-2xl">
          <Eyebrow>The Boutique</Eyebrow>
          <SectionHeading className="mt-5">
            Take the ritual <em>home.</em>
          </SectionHeading>
          <p className="mt-6 font-body text-lg leading-relaxed text-ink-500">
            The same Éminence Organic Skin Care we reach for in treatment, chosen by Khushi
            for Winnipeg skin. Hungarian-made, plant-based, and gentle enough to keep your
            glow between visits.
          </p>
        </Reveal>

        <div className="mt-14">
          <ShopCatalog products={products} categories={categories} concerns={concerns} />
        </div>
      </div>
    </div>
  );
}
