"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Placeholder } from "@/components/ui/placeholder";
import { useCart } from "@/components/shop/cart-provider";
import { STORE_ENABLED } from "@/lib/store";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CardProduct } from "@/lib/products";

type TabKey = "bestsellers" | "sets";

/** Editorial boutique carousel: lowercase tab pair, hairline-divided cells,
 *  and a slim scroll-progress line. Cells stay minimal — label, image,
 *  name, price — with a quiet text "add to bag". */
export function BestsellersCarousel({
  bestsellers,
  sets,
}: {
  bestsellers: CardProduct[];
  sets: CardProduct[];
}) {
  const [tab, setTab] = useState<TabKey>("bestsellers");
  const trackRef = useRef<HTMLDivElement>(null);
  // Scrollbar-style progress: thumb size + position as fractions of the track.
  const [thumb, setThumb] = useState({ size: 1, offset: 0 });

  const products = tab === "sets" ? sets : bestsellers;

  const syncProgress = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const range = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    const progress = range > 0 ? el.scrollLeft / range : 0;
    setThumb({ size, offset: (1 - size) * progress });
  }, []);

  useEffect(() => {
    syncProgress();
    window.addEventListener("resize", syncProgress);
    return () => window.removeEventListener("resize", syncProgress);
  }, [syncProgress, products]);

  function switchTab(next: TabKey) {
    setTab(next);
    trackRef.current?.scrollTo({ left: 0 });
  }

  function nudge(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const tabs: { key: TabKey; label: string; available: boolean }[] = [
    { key: "bestsellers", label: "best sellers", available: bestsellers.length > 0 },
    { key: "sets", label: "sets", available: sets.length > 0 },
  ];

  return (
    <div>
      <div className="flex items-end gap-5 sm:gap-7">
        {tabs
          .filter((t) => t.available)
          .map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={tab === t.key}
              onClick={() => switchTab(t.key)}
              className={cn(
                "inline-flex items-center gap-3 font-display text-3xl lowercase transition-colors duration-300 lg:text-4xl",
                tab === t.key ? "text-espresso" : "text-ink-300 hover:text-ink-500",
              )}
            >
              {tab === t.key && (
                <span aria-hidden="true" className="size-2.5 rounded-full bg-gold-deep" />
              )}
              {t.label}
            </button>
          ))}
      </div>

      <div
        ref={trackRef}
        onScroll={syncProgress}
        tabIndex={0}
        aria-label="Boutique products"
        className="mt-10 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <CarouselCell key={`${tab}-${p.slug}`} product={p} />
        ))}
      </div>

      <div className="relative mt-10 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="relative h-0.5 w-24 overflow-hidden rounded-full bg-espresso/10"
        >
          <span
            className="absolute inset-y-0 rounded-full bg-espresso/60"
            style={{
              width: `${thumb.size * 100}%`,
              left: `${thumb.offset * 100}%`,
            }}
          />
        </div>
        <div className="absolute right-0 flex gap-2.5">
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => nudge(-1)}
            className="grid size-10 place-items-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => nudge(1)}
            className="grid size-10 place-items-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-gold-deep hover:text-gold-deep"
          >
            <ArrowRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CarouselCell({ product }: { product: CardProduct }) {
  return (
    <div className="flex w-[64vw] shrink-0 snap-start flex-col border-l border-espresso/10 px-5 py-2 first:border-l-0 first:pl-0 sm:w-[40vw] sm:px-6 md:w-[31%] lg:w-[23.5%]">
      <Link href={`/shop/${product.slug}`} className="group block">
        <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-espresso/80">
          {product.categoryName}
        </p>
        <p className="mt-0.5 font-body text-[10px] uppercase tracking-[0.22em] text-ink-300">
          {product.concerns[0] ?? "Éminence Organics"}
        </p>

        <div className="relative mt-5 aspect-[4/5]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 64vw, (max-width: 768px) 40vw, (max-width: 1024px) 31vw, 270px"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder className="absolute inset-0" />
          )}
        </div>

        <h3 className="mt-5 line-clamp-2 min-h-9 text-center font-body text-[13px] leading-snug text-espresso transition-colors group-hover:text-gold-deep">
          {product.name}
        </h3>
        <p className="mt-1.5 text-center font-body text-xs tracking-wide text-ink-400">
          {product.hasVariants
            ? `From ${formatPrice(product.price, product.currency)}`
            : formatPrice(product.price, product.currency)}
        </p>
      </Link>

      <QuietAdd product={product} />
    </div>
  );
}

/** Text-only add control sized for the minimal cell; variant products link
 *  to the detail page to pick an option. Hidden while the store is gated. */
function QuietAdd({ product }: { product: CardProduct }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  if (!STORE_ENABLED) return null;

  const base =
    "mx-auto mt-3 inline-flex items-center gap-1.5 border-b pb-0.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] transition-colors";

  if (product.hasVariants) {
    return (
      <Link
        href={`/shop/${product.slug}`}
        className={cn(base, "border-gold-deep/40 text-gold-deep hover:text-espresso")}
      >
        Choose options
      </Link>
    );
  }

  function handleAdd() {
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.image,
      variant: null,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-label={`Add ${product.name} to bag`}
      className={cn(
        base,
        added
          ? "border-gold-deep text-gold-deep"
          : "border-gold-deep/40 text-gold-deep hover:text-espresso",
      )}
    >
      {added ? (
        <>
          <Check className="size-3" strokeWidth={2.2} /> Added
        </>
      ) : (
        "Add to bag"
      )}
    </button>
  );
}
