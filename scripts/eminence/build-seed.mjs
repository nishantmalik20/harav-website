// Generates supabase/seed/0002_products_seed.sql from data/products.json.
// Run AFTER applying supabase/migrations/0002_products.sql. Idempotent (upserts).
//
//   node scripts/eminence/build-seed.mjs

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const data = JSON.parse(await fs.readFile(path.join(ROOT, "data", "products.json"), "utf8"));

const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const num = (v) => (v === null || v === undefined ? "null" : Number(v));
const bool = (v) => (v ? "true" : "false");
const arr = (a) => (a && a.length ? `array[${a.map(q).join(", ")}]::text[]` : "'{}'::text[]");

let out = "";
out += "-- Generated from data/products.json by scripts/eminence/build-seed.mjs — do not edit by hand.\n";
out += `-- Source: ${data._meta.source} · ${data._meta.count} products · generated ${data._meta.generatedAt}\n`;
out += "-- Run AFTER supabase/migrations/0002_products.sql. Safe to re-run (upserts).\n\n";
out += "begin;\n\n";

// categories
out += "insert into public.product_categories (key, name, sort) values\n";
out += data.categories.map((c, i) => `  (${q(c.key)}, ${q(c.name)}, ${i})`).join(",\n");
out += "\non conflict (key) do update set name = excluded.name, sort = excluded.sort;\n\n";

// products
const cols = "slug, name, brand, category, price, currency, description, image, concerns, bestseller, is_new, source_url, eminence_code, sort";
out += `insert into public.products (${cols}) values\n`;
out += data.products
  .map(
    (p, i) =>
      `  (${q(p.slug)}, ${q(p.name)}, ${q(p.brand)}, ${q(p.category)}, ${num(p.price)}, ${q(p.currency)}, ` +
      `${q(p.description)}, ${q(p.image)}, ${arr(p.concerns)}, ${bool(p.bestseller)}, ${bool(p.isNew)}, ` +
      `${q(p.sourceUrl)}, ${q(p.eminenceCode)}, ${i})`,
  )
  .join(",\n");
out +=
  "\non conflict (slug) do update set\n" +
  "  name = excluded.name, brand = excluded.brand, category = excluded.category, price = excluded.price,\n" +
  "  currency = excluded.currency, description = excluded.description, image = excluded.image,\n" +
  "  concerns = excluded.concerns, bestseller = excluded.bestseller, is_new = excluded.is_new,\n" +
  "  source_url = excluded.source_url, eminence_code = excluded.eminence_code, sort = excluded.sort;\n\n";

// variants
const withVariants = data.products.filter((p) => Array.isArray(p.variants) && p.variants.length);
for (const p of withVariants) {
  out += "insert into public.product_variants (product_id, name, label, sort)\n";
  out += p.variants
    .map(
      (v, i) =>
        `select id, ${q(v.name)}, ${q(p.variantLabel ?? null)}, ${i} from public.products where slug = ${q(p.slug)}`,
    )
    .join("\nunion all\n");
  out += "\non conflict (product_id, name) do nothing;\n\n";
}

out += "commit;\n";

await fs.mkdir(path.join(ROOT, "supabase", "seed"), { recursive: true });
await fs.writeFile(path.join(ROOT, "supabase", "seed", "0002_products_seed.sql"), out);
console.log(`Seed written: ${data.products.length} products, ${withVariants.length} with variants.`);
