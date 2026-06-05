// Dumps every Eminence product slug from the sitemap to _sitemap-products.txt,
// so unmatched price-list items can be looked up by hand to build overrides.json.
import fs from "node:fs/promises";

const UA = "Mozilla/5.0 (compatible; HaravSalonCatalogBot/1.0; +https://haravsalonspa.ca)";
const xml = await (await fetch("https://eminenceorganics.com/sitemap_0.xml", { headers: { "User-Agent": UA } })).text();
const rows = [];
for (const b of xml.split("<url>").slice(1)) {
  const loc = (b.match(/<loc>(.*?)<\/loc>/) || [])[1];
  if (!loc || !loc.includes("/product/")) continue;
  const m = loc.replace(/&amp;/g, "&").match(/\/product\/([^/]+)\/([^/.]+)\.html/);
  if (m) rows.push(`${m[1]}\t${m[2]}`);
}
rows.sort();
await fs.writeFile(new URL("./_sitemap-products.txt", import.meta.url), rows.join("\n") + "\n");
console.log("product slugs:", rows.length);
