"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CardProduct } from "@/lib/products";

const ROTATE_MS = 5000;
const SWIPE_PX = 40;

/**
 * The hero's boutique highlight: a small, auto-rotating featured-product tile
 * that signals Harav also retails products. Motion is a slow opacity fade only
 * (the brand's language — no spring, no scale-in): every product is stacked in
 * place and the active one fades in over the rest, on plain CSS transitions.
 * The guest can also browse manually — swipe the image, or use the arrows and
 * dots — and once they do, the auto-advance stops for good (it must never
 * fight the user). Auto-advance also pauses on hover and is disabled under
 * reduced-motion; the fades collapse to instant swaps via motion-reduce.
 */
export function HeroBoutique({ products }: { products: CardProduct[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // A swipe must not count as a click on the product link underneath.
  const dragged = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const count = products.length;

  useEffect(() => {
    if (paused || interacted || count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, interacted, count]);

  const go = (dir: 1 | -1) => {
    setInteracted(true);
    setIndex((i) => (i + dir + count) % count);
  };

  if (count === 0) return null;
  const product = products[index];

  return (
    <div
      className="rounded-sm border border-gold/45 bg-[rgba(46,28,15,0.62)] p-5 backdrop-blur-sm lg:w-[360px] lg:justify-self-end lg:p-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="flex items-center gap-3 font-body text-xs font-medium uppercase tracking-[0.22em] text-gold-light">
        <span aria-hidden className="block h-[5px] w-10 border-y border-gold" />
        From the boutique
      </p>

      <Link
        href={`/shop/${product.slug}`}
        className="group mt-4 block"
        aria-label={`View ${product.name} in the boutique`}
        onClickCapture={(e) => {
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div
          className={cn(
            "relative aspect-[4/5] touch-pan-y overflow-hidden rounded-sm bg-white",
            count > 1 && "cursor-grab active:cursor-grabbing",
          )}
          onPointerDown={(e) => {
            pointerStart.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={(e) => {
            const start = pointerStart.current;
            pointerStart.current = null;
            if (!start || count <= 1) return;
            const dx = e.clientX - start.x;
            const dy = e.clientY - start.y;
            if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
            dragged.current = true;
            go(dx < 0 ? 1 : -1);
            // Cleared on the next tick so the click that follows the
            // pointer-up is still suppressed by the link's capture handler.
            setTimeout(() => {
              dragged.current = false;
            }, 0);
          }}
        >
          {products.map((p, i) => (
            <div
              key={p.slug}
              className={cn(
                "absolute inset-0 transition-opacity duration-[600ms] ease-out motion-reduce:transition-none",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 70vw, 340px"
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={i === 0}
                  draggable={false}
                />
              )}
            </div>
          ))}

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous product"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-espresso/10 bg-pearl/90 text-espresso shadow-sm transition-colors hover:bg-pearl hover:text-gold-deep"
              >
                <ChevronLeft className="size-4" strokeWidth={2.2} />
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-espresso/10 bg-pearl/90 text-espresso shadow-sm transition-colors hover:bg-pearl hover:text-gold-deep"
              >
                <ChevronRight className="size-4" strokeWidth={2.2} />
              </button>
            </>
          )}
        </div>

        <div className="relative mt-4 h-[4.75rem]">
          {products.map((p, i) => (
            <div
              key={p.slug}
              className={cn(
                "absolute inset-0 transition-opacity duration-[450ms] ease-out motion-reduce:transition-none",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index || undefined}
            >
              <h2 className="line-clamp-2 font-display text-lg leading-snug text-pearl transition-colors group-hover:text-gold-light">
                {p.name}
              </h2>
              <p className="mt-1 font-body text-sm text-gold-light">
                {formatPrice(p.price, p.currency)}
              </p>
            </div>
          ))}
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        {count > 1 ? (
          <div className="flex items-center gap-2" role="tablist" aria-label="Featured products">
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                onClick={() => {
                  setInteracted(true);
                  setIndex(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-gold-light" : "w-1.5 bg-pearl/40 hover:bg-pearl/70",
                )}
              />
            ))}
          </div>
        ) : (
          <span />
        )}

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 whitespace-nowrap font-body text-xs font-medium uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-pearl"
        >
          Shop the boutique
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </Link>
      </div>
    </div>
  );
}
