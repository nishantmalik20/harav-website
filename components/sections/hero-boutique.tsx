"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CardProduct } from "@/lib/products";

const ROTATE_MS = 5000;
const FADE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/**
 * The hero's boutique highlight: a small, auto-rotating featured-product tile
 * that signals Harav also retails products. Motion is a slow opacity fade only
 * (the brand's language — no spring, no scale-in). Auto-advance pauses on hover
 * and is disabled entirely under reduced-motion; the dots stay clickable.
 */
export function HeroBoutique({ products }: { products: CardProduct[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = products.length;

  useEffect(() => {
    if (reduce || paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, count]);

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
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={FADE}
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 70vw, 340px"
                  className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={index === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 h-[4.75rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.slug}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? { opacity: 1 } : { opacity: 0 }}
              transition={{ ...FADE, duration: 0.45 }}
            >
              <h2 className="line-clamp-2 font-display text-lg leading-snug text-pearl transition-colors group-hover:text-gold-light">
                {product.name}
              </h2>
              <p className="mt-1 font-body text-sm text-gold-light">
                {formatPrice(product.price, product.currency)}
              </p>
            </motion.div>
          </AnimatePresence>
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
                onClick={() => setIndex(i)}
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
