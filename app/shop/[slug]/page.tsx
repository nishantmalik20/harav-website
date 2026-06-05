import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Placeholder } from "@/components/ui/placeholder";
import { CtaBanner } from "@/components/sections/cta-banner";
import { AddToBag } from "@/components/shop/add-to-bag";
import { ProductCard } from "@/components/shop/product-card";
import { StarRating } from "@/components/shop/star-rating";
import { getRating } from "@/lib/ratings";
import {
  PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
  getCategory,
  toCardProduct,
  formatPrice,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description:
      product.description ||
      `${product.name} by ${product.brand}, available at Harav Salon & Spa in Winnipeg.`,
    openGraph: product.image ? { images: [{ url: product.image }] } : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product).map(toCardProduct);
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const rating = getRating(product.slug, product.bestseller);

  return (
    <>
      <div className="px-6 pb-20 pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 font-body text-xs uppercase tracking-[0.16em] text-ink-400">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-deep"
            >
              <ArrowLeft className="size-4" strokeWidth={2.2} /> Shop
            </Link>
            {category && (
              <>
                <span aria-hidden>·</span>
                <span className="text-ink-500">{category.name}</span>
              </>
            )}
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-md border border-espresso/10 bg-white lg:sticky lg:top-28 lg:self-start">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <Placeholder className="absolute inset-0" />
              )}
            </div>

            <div className="lg:py-4">
              <Eyebrow>{product.brand}</Eyebrow>
              <h1 className="mt-5 font-display text-4xl leading-tight text-espresso md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 font-display text-2xl text-gold-deep">
                {hasVariants
                  ? `From ${formatPrice(product.price, product.currency)}`
                  : formatPrice(product.price, product.currency)}
              </p>

              <StarRating rating={rating.rating} count={rating.count} className="mt-4" />

              {product.description && (
                <p className="mt-6 font-body text-[17px] leading-relaxed text-ink-600">
                  {product.description}
                </p>
              )}

              {product.concerns.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.concerns.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-gold/40 px-3 py-1 font-body text-[11px] uppercase tracking-[0.14em] text-gold-deep"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <AddToBag
                product={{
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  currency: product.currency,
                  image: product.image,
                }}
                variantLabel={product.variantLabel}
                variants={product.variants}
              />

              <p className="mt-8 border-t border-espresso/10 pt-6 font-body text-sm leading-relaxed text-ink-500">
                Hand-picked by Khushi and available in-studio at Harav. Not sure what suits
                your skin?{" "}
                <Link href="/contact" className="text-gold-deep underline-offset-4 hover:underline">
                  Ask us
                </Link>{" "}
                or{" "}
                <Link href="/book" className="text-gold-deep underline-offset-4 hover:underline">
                  book a facial
                </Link>{" "}
                for a routine made for you.
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="font-display text-2xl text-espresso md:text-3xl">
                You may also like
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CtaBanner
        eyebrow="An Hour, Kept in Gold"
        heading={
          <>
            Glow that <em>lasts.</em>
          </>
        }
        body="Pair your products with a facial tailored to your skin. Book your appointment online in under a minute."
        ctaLabel="Book services"
        ctaHref="/book"
      />
    </>
  );
}
