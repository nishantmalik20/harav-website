import Link from "next/link";
import Image from "next/image";
import { Placeholder } from "@/components/ui/placeholder";
import { formatPrice } from "@/lib/format";
import { QuickAdd } from "@/components/shop/quick-add";
import { StarRating } from "@/components/shop/star-rating";
import type { CardProduct } from "@/lib/products";

/** Editorial grid tile: image, category over-line, name, price, and a quick
 *  "Add to bag". Built to tile cleanly past 100 SKUs. */
export function ProductCard({
  product,
  priority = false,
}: {
  product: CardProduct;
  priority?: boolean;
}) {
  return (
    <div className="group flex h-full flex-col">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-espresso/10 bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-6"
              priority={priority}
            />
          ) : (
            <Placeholder className="absolute inset-0" />
          )}

          {(product.bestseller || product.isNew) && (
            <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
              {product.bestseller && (
                <span className="bg-espresso px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-pearl">
                  Best seller
                </span>
              )}
              {product.isNew && (
                <span className="bg-gold px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-espresso">
                  New
                </span>
              )}
            </div>
          )}

          <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-espresso/90 py-3 text-center font-body text-[11px] uppercase tracking-[0.22em] text-pearl transition-transform duration-300 ease-out group-hover:translate-y-0">
            View product
          </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link href={`/shop/${product.slug}`} className="block">
          <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-400">
            {product.categoryName}
          </p>
          <h3 className="mt-1.5 line-clamp-2 font-display text-lg leading-snug text-espresso transition-colors group-hover:text-gold-deep">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-1.5 line-clamp-2 font-body text-[13px] leading-relaxed text-ink-400">
            {product.description}
          </p>
        )}

        <StarRating rating={product.rating} count={product.reviewCount} className="mt-2.5" />

        <div className="mt-auto pt-3">
          <p className="font-body text-sm tracking-wide text-gold-deep">
            {product.hasVariants
              ? `From ${formatPrice(product.price, product.currency)}`
              : formatPrice(product.price, product.currency)}
          </p>
          <QuickAdd product={product} />
        </div>
      </div>
    </div>
  );
}
