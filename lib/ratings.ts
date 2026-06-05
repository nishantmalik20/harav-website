/**
 * PLACEHOLDER product ratings.
 *
 * Deterministic from the product slug, so a given product always shows the same
 * stars (stable across renders and between server and client). Bestsellers skew
 * higher and carry more reviews. These are NOT real customer reviews.
 *
 * ⚠️ LEGAL: showing invented ratings on a LIVE site risks Canada's Competition
 * Act / FTC rules on misleading reviews (see CLAUDE.md). This is a single
 * swap-point — replace `getRating` with real review data, or remove the rating
 * UI, before the site goes to production.
 */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface Rating {
  /** 0–5, one decimal. */
  rating: number;
  /** Number of (placeholder) reviews. */
  count: number;
}

export function getRating(slug: string, bestseller = false): Rating {
  const h = hash(slug);
  const a = (h % 1000) / 1000;
  const b = ((h >>> 12) % 1000) / 1000;
  const base = bestseller ? 4.6 : 4.1;
  const span = bestseller ? 0.4 : 0.8;
  const rating = Math.min(5, Math.round((base + a * span) * 10) / 10);
  const count = bestseller ? 60 + Math.floor(b * 200) : 8 + Math.floor(b * 110);
  return { rating, count };
}
