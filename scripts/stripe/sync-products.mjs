/**
 * Push the product catalog to Stripe in one go.
 *
 *   node --env-file=.env.local scripts/stripe/sync-products.mjs
 *   # or, from package.json:
 *   npm run stripe:sync
 *
 * Reads data/products.json and, for each product, upserts a Stripe Product +
 * a CAD Price, then writes data/stripe-prices.json (slug → { productId, priceId })
 * — the map the checkout route reads to build line items server-side.
 *
 * Idempotent: re-running updates in place (matched by the saved mapping, falling
 * back to a metadata.slug search) rather than creating duplicates. Stripe Prices
 * are immutable, so when an amount changes a new Price is created and set as the
 * product's default; the old one is left in place (harmless, not default).
 *
 * Images: Stripe needs public URLs. If NEXT_PUBLIC_SITE_URL is an https host the
 * script attaches `${SITE_URL}${product.image}`; otherwise images are skipped
 * (Checkout still works) — re-run after deploy to backfill them.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Stripe from "stripe";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const CATALOG_PATH = path.join(ROOT, "data", "products.json");
const MAP_PATH = path.join(ROOT, "data", "stripe-prices.json");

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error(
    "✗ STRIPE_SECRET_KEY is not set.\n  Run:  node --env-file=.env.local scripts/stripe/sync-products.mjs",
  );
  process.exit(1);
}

const stripe = new Stripe(key);
const liveMode = key.startsWith("sk_live");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const useImages = /^https:\/\//i.test(siteUrl);

function imageUrls(image) {
  if (!useImages || !image) return undefined;
  return [`${siteUrl}${image}`];
}

async function loadJson(p, fallback) {
  try {
    return JSON.parse(await fs.readFile(p, "utf8"));
  } catch {
    return fallback;
  }
}

/** Resolve the Stripe product id: trust the saved mapping, else search by slug. */
async function findProductId(slug, mappedId) {
  if (mappedId) {
    try {
      const p = await stripe.products.retrieve(mappedId);
      if (!p.deleted) return p.id;
    } catch {
      // mapping is stale — fall through to search
    }
  }
  try {
    const res = await stripe.products.search({
      query: `metadata['slug']:'${slug}'`,
      limit: 1,
    });
    if (res.data[0]) return res.data[0].id;
  } catch {
    // Search API eventual-consistency / unavailable — treat as not found
  }
  return null;
}

/** Reuse the mapped price if amount + currency still match, else create a new one. */
async function ensurePrice(productId, mappedPriceId, amount, currency) {
  if (mappedPriceId) {
    try {
      const price = await stripe.prices.retrieve(mappedPriceId);
      if (price.active && price.unit_amount === amount && price.currency === currency) {
        return { priceId: price.id, changed: false };
      }
    } catch {
      // create a fresh one below
    }
  }
  const price = await stripe.prices.create({ product: productId, unit_amount: amount, currency });
  await stripe.products.update(productId, { default_price: price.id });
  return { priceId: price.id, changed: true };
}

async function main() {
  const catalog = await loadJson(CATALOG_PATH, null);
  if (!catalog?.products?.length) {
    console.error("✗ No products found in data/products.json");
    process.exit(1);
  }

  const prevMap = await loadJson(MAP_PATH, { items: {} });
  const items = { ...(prevMap.items || {}) };

  console.log(
    `→ Syncing ${catalog.products.length} products to Stripe (${liveMode ? "LIVE" : "TEST"} mode)` +
      `${useImages ? " with images" : ""}…`,
  );

  let created = 0;
  let updated = 0;
  let priceChanges = 0;
  let failed = 0;

  for (const product of catalog.products) {
    const slug = product.slug;
    const currency = (product.currency || "CAD").toLowerCase();
    const amount = Math.round(Number(product.price) * 100);
    if (!Number.isFinite(amount) || amount <= 0) {
      console.warn(`  ! ${slug} — skipped (invalid price ${product.price})`);
      continue;
    }

    try {
      const mapped = items[slug] || {};
      let productId = await findProductId(slug, mapped.productId);
      const imgs = imageUrls(product.image);

      const fields = {
        name: product.name,
        ...(product.description ? { description: product.description } : {}),
        metadata: { slug, category: product.category || "" },
        ...(imgs ? { images: imgs } : {}),
      };

      if (productId) {
        await stripe.products.update(productId, fields);
        updated++;
      } else {
        const p = await stripe.products.create(fields);
        productId = p.id;
        created++;
      }

      const { priceId, changed } = await ensurePrice(productId, mapped.priceId, amount, currency);
      if (changed) priceChanges++;

      items[slug] = { productId, priceId };
    } catch (e) {
      failed++;
      console.error(`  ✗ ${slug}:`, e?.message || e);
    }
  }

  const out = {
    generatedAt: new Date().toISOString(),
    currency: catalog._meta?.currency || "CAD",
    mode: liveMode ? "live" : "test",
    items,
  };
  await fs.writeFile(MAP_PATH, JSON.stringify(out, null, 2) + "\n", "utf8");

  console.log(
    `\n✓ Done — created ${created}, updated ${updated}, price changes ${priceChanges}, failed ${failed}.`,
  );
  console.log(`  Wrote ${path.relative(ROOT, MAP_PATH)} (${Object.keys(items).length} items).`);
  if (!useImages) {
    console.log(
      "  Note: images were not attached — set NEXT_PUBLIC_SITE_URL to an https host and re-run to backfill.",
    );
  }
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
