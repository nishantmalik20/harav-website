import catalog from "@/data/products.json";
import { getRating } from "./ratings";

/** A purchasable variant of a product (e.g. a foundation/sunscreen shade). */
export type ProductVariant = {
  name: string;
  sku?: string;
  price?: number;
  image?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  concerns: string[];
  bestseller: boolean;
  isNew: boolean;
  brand: string;
  description: string;
  image: string | null;
  sourceUrl: string | null;
  eminenceCode: string | null;
  /** Éminence's canonical product name (for provenance/reconciliation). */
  eminenceName?: string | null;
  eminenceCategory?: string | null;
  variantLabel?: string;
  variants?: ProductVariant[];
};

export type Category = { key: string; name: string; count: number };

type Catalog = {
  _meta: { generatedAt: string; source: string; currency: string; count: number };
  categories: Category[];
  products: Product[];
};

const data = catalog as unknown as Catalog;

export const PRODUCTS: Product[] = data.products;
export const CATEGORIES: Category[] = data.categories;

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategory(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

export function getProductsByCategory(key: string): Product[] {
  return PRODUCTS.filter((p) => p.category === key);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getBestsellers(limit?: number): Product[] {
  const list = PRODUCTS.filter((p) => p.bestseller);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Distinct skin-concern tags across the catalog, with product counts. */
export function getConcerns(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of PRODUCTS) {
    for (const c of p.concerns) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Related products: same category first, then shared concern, excluding self. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  );
  const sharedConcern = PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      p.category !== product.category &&
      p.concerns.some((c) => product.concerns.includes(c)),
  );
  return [...sameCategory, ...sharedConcern].slice(0, limit);
}

// Price formatting lives in lib/format.ts so client components can use it
// without pulling the catalog JSON into their bundle.
export { formatPrice } from "./format";

/** A slimmed product shape for grid tiles — keeps the client bundle light
 *  (no long descriptions) and resolves the category display name. */
export type CardProduct = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  categoryName: string;
  concerns: string[];
  image: string | null;
  bestseller: boolean;
  isNew: boolean;
  hasVariants: boolean;
  /** Short tagline shown under the name on the tile. */
  description: string;
  /** Placeholder rating (see lib/ratings.ts) — swap for real reviews before launch. */
  rating: number;
  reviewCount: number;
};

const CATEGORY_NAME = new Map(CATEGORIES.map((c) => [c.key, c.name]));

export function toCardProduct(p: Product): CardProduct {
  const r = getRating(p.slug, p.bestseller);
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    currency: p.currency,
    category: p.category,
    categoryName: CATEGORY_NAME.get(p.category) ?? p.category,
    concerns: p.concerns,
    image: p.image,
    bestseller: p.bestseller,
    isNew: p.isNew,
    hasVariants: Array.isArray(p.variants) && p.variants.length > 0,
    description: p.description,
    rating: r.rating,
    reviewCount: r.count,
  };
}

export function getCardProducts(): CardProduct[] {
  return PRODUCTS.map(toCardProduct);
}
