// scripts/eminence/scrape.mjs
//
// Builds the Harav product catalog from the client's Eminence price list.
// For each product it: finds the matching product page on eminenceorganics.com/ca
// (enumerated from the sitemap), fetches the page, pulls the marketing description +
// category breadcrumb + hero image, downloads the image into public/products/, and
// writes data/products.json (+ a match report for review).
//
// Client price (price-list.json) is always the source of truth.
//
// Usage:
//   node scripts/eminence/scrape.mjs               full run
//   node scripts/eminence/scrape.mjs --limit 6     first N products only (validation)
//   node scripts/eminence/scrape.mjs --no-images   skip image downloads

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const PRICE_LIST = path.join(__dirname, 'price-list.json');
const OVERRIDES = path.join(__dirname, 'overrides.json');
const OUT_DATA = path.join(ROOT, 'data', 'products.json');
const OUT_REPORT = path.join(__dirname, '_report.json');
const IMG_DIR = path.join(ROOT, 'public', 'products');
const CACHE_DIR = path.join(__dirname, '.cache');

const BASE = 'https://eminenceorganics.com';
const SITEMAP_URL = `${BASE}/sitemap_0.xml`;
const UA = 'Mozilla/5.0 (compatible; HaravSalonCatalogBot/1.0; +https://haravsalonspa.ca)';

const args = process.argv.slice(2);
const LIMIT = (() => { const i = args.indexOf('--limit'); return i >= 0 ? parseInt(args[i + 1], 10) : Infinity; })();
const NO_IMAGES = args.includes('--no-images');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function decodeEntities(s = '') {
  return s
    .replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)));
}

function slugify(name = '') {
  return name.toLowerCase()
    .replace(/\+/g, ' ').replace(/&/g, ' ').replace(/%/g, ' ')
    .replace(/[''`.,()/:]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const toks = (slug) => new Set(slug.split('-').filter(Boolean));
function jaccard(a, b) {
  const A = toks(a), B = toks(b);
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  const uni = new Set([...A, ...B]).size;
  return uni ? inter / uni : 0;
}

async function fetchText(url, tries = 3) {
  for (let t = 0; t < tries; t++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en-CA,en;q=0.9' } });
      if (res.ok) return await res.text();
      if (res.status === 404) return null;
    } catch { /* retry */ }
    await sleep(800 * (t + 1));
  }
  return null;
}

// Fetch a product page, caching the HTML on disk so re-runs don't re-hit the server.
// Returns { html, fromCache }.
async function fetchPdp(url, code) {
  const cf = path.join(CACHE_DIR, `${code}.html`);
  const cached = await fs.readFile(cf, 'utf8').catch(() => null);
  if (cached) return { html: cached, fromCache: true };
  const html = await fetchText(url);
  if (html) { await fs.mkdir(CACHE_DIR, { recursive: true }); await fs.writeFile(cf, html); }
  return { html, fromCache: false };
}

function metaContent(html, key) {
  const re = new RegExp(`<meta[^>]*(?:name|property)=["']${key}["'][^>]*>`, 'i');
  const tag = html.match(re);
  if (!tag) return null;
  const c = tag[0].match(/content=["']([^"']*)["']/i);
  return c ? decodeEntities(c[1]).trim() : null;
}

// --- sitemap -> list of {url, slug, code, image} for every product page ---
async function loadSitemapProducts() {
  const xml = await fetchText(SITEMAP_URL);
  if (!xml) throw new Error('Could not fetch sitemap');
  const blocks = xml.split('<url>').slice(1);
  const out = [];
  const seen = new Set();
  for (const block of blocks) {
    const loc = (block.match(/<loc>(.*?)<\/loc>/) || [])[1];
    if (!loc || !loc.includes('/product/')) continue;
    const url = decodeEntities(loc);
    const m = url.match(/\/product\/([^/]+)\/([^/.]+)\.html/);
    if (!m) continue;
    const key = `${m[1]}|${m[2]}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const img = (block.match(/<image:loc>(.*?)<\/image:loc>/) || [])[1];
    out.push({ url, slug: m[1], code: m[2], image: img ? decodeEntities(img) : null });
  }
  return out;
}

function matchProduct(name, index, bySlug) {
  const want = slugify(name);
  if (bySlug.has(want)) return { entry: bySlug.get(want), how: 'exact', score: 1, want };
  let best = null, bestScore = 0;
  for (const e of index) {
    const s = jaccard(want, e.slug);
    if (s > bestScore) { bestScore = s; best = e; }
  }
  if (best && bestScore >= 0.6) return { entry: best, how: 'fuzzy', score: +bestScore.toFixed(2), want };
  return { entry: null, how: 'none', score: +bestScore.toFixed(2), want, bestGuess: best ? best.slug : null };
}

function extractPdp(html) {
  const breadcrumb = [];
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const j = JSON.parse(m[1].trim());
      const graph = Array.isArray(j['@graph']) ? j['@graph'] : [j];
      for (const node of graph) {
        if (node && node['@type'] === 'BreadcrumbList' && Array.isArray(node.itemListElement)) {
          for (const it of node.itemListElement) if (it && it.name) breadcrumb.push(it.name);
        }
      }
    } catch { /* ignore malformed block */ }
  }
  return {
    description: metaContent(html, 'description') || '',
    ogImage: metaContent(html, 'og:image'),
    ogTitle: (metaContent(html, 'og:title') || '').replace(/\s*\|\s*Eminence.*$/i, '').trim() || null,
    breadcrumb,
    eminenceCategory: breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2] : null,
  };
}

function concernsFor(name) {
  const n = name.toLowerCase();
  const c = new Set();
  if (/(acne|clear skin|charcoal|blemish|probiotic)/.test(n)) c.add('Acne & Breakouts');
  if (/(calm|chamomile|arnica|sensitiv|redness|cornflower|soothing|echinacea)/.test(n)) c.add('Sensitive & Redness');
  if (/(bright|illuminat|vitamin c|c\+e|citrus|kale|mangosteen|radiance|dark spot|pigment|luminos)/.test(n)) c.add('Brightening');
  if (/(firm|age corrective|peptide|lift|restorative|wrinkle|bakuchiol|ceramide|collagen|tripeptide|rosehip)/.test(n)) c.add('Firming & Anti-Aging');
  if (/(hydra|moistur|hyaluronic|snow mushroom|coconut|quince|nourish|whip)/.test(n)) c.add('Hydration');
  if (/(spf|sun defense|sunscreen|mineral defense|daily defense)/.test(n)) c.add('Sun Protection');
  if (c.size === 0) c.add('All Skin Types');
  return [...c];
}

async function downloadImage(url, dest) {
  try {
    if (await fs.stat(dest).then(() => true).catch(() => false)) return true;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1200) return false; // guard against tiny error/placeholder responses
    await fs.writeFile(dest, buf);
    return true;
  } catch { return false; }
}

const CAT_NAMES = {
  cleansers: 'Cleansers', toniques: 'Toniques & Mists', exfoliants: 'Exfoliants & Peels',
  masques: 'Masques', serums: 'Serums & Treatments', moisturizers: 'Moisturizers',
  'eye-lip': 'Eye & Lip Care', 'sun-care': 'Sun Care', body: 'Body Care', sets: 'Sets & Kits', tools: 'Tools',
};
const CAT_ORDER = ['cleansers', 'toniques', 'exfoliants', 'masques', 'serums', 'moisturizers', 'eye-lip', 'sun-care', 'body', 'sets', 'tools'];

async function main() {
  const priceList = JSON.parse(await fs.readFile(PRICE_LIST, 'utf8'));
  let overrides = {};
  try { overrides = JSON.parse(await fs.readFile(OVERRIDES, 'utf8')); } catch { /* optional */ }

  console.log('Loading sitemap…');
  const index = await loadSitemapProducts();
  const bySlug = new Map(index.map((e) => [e.slug, e]));
  console.log(`Sitemap product URLs: ${index.length}`);

  await fs.mkdir(IMG_DIR, { recursive: true });
  await fs.mkdir(path.dirname(OUT_DATA), { recursive: true });

  const report = { matched: [], fuzzy: [], unmatched: [], pdpFails: [], imageFails: [] };
  const products = [];
  let count = 0;

  for (const item of priceList.products) {
    if (count >= LIMIT) break;
    count++;
    const ourSlug = slugify(item.name);

    let entry = null, how = 'none', score = 0;
    const ov = overrides[item.name];
    if (ov) {
      entry = typeof ov === 'string' ? (bySlug.get(ov) || index.find((e) => e.slug === ov) || null) : ov;
      how = entry ? 'override' : 'none';
    }
    if (!entry) {
      const m = matchProduct(item.name, index, bySlug);
      entry = m.entry; how = m.how; score = m.score;
      if (how === 'none') report.unmatched.push({ name: item.name, want: m.want, bestGuess: m.bestGuess, score: m.score });
      else if (how === 'fuzzy') report.fuzzy.push({ name: item.name, slug: entry.slug, score: m.score });
      else report.matched.push({ name: item.name, slug: entry.slug });
    } else {
      report.matched.push({ name: item.name, slug: entry.slug || '(override-object)', how: 'override' });
    }

    const product = {
      id: ourSlug,
      slug: ourSlug,
      name: item.name,
      price: item.price,
      currency: 'CAD',
      category: item.category,
      concerns: concernsFor(item.name),
      bestseller: !!item.bestseller,
      isNew: !!item.isNew,
      brand: 'Éminence Organic Skin Care',
      description: '',
      image: null,
      sourceUrl: null,
      eminenceCode: entry ? entry.code || null : null,
    };
    if (item.variantLabel) product.variantLabel = item.variantLabel;
    if (item.variants) product.variants = item.variants.map((v) => ({ name: v }));

    if (entry && entry.slug && entry.code) {
      const url = `${BASE}/ca/product/${entry.slug}/${entry.code}.html`;
      product.sourceUrl = url;
      const { html, fromCache } = await fetchPdp(url, entry.code);
      if (html) {
        const pdp = extractPdp(html);
        product.description = pdp.description;
        product.eminenceName = pdp.ogTitle;
        product.eminenceCategory = pdp.eminenceCategory;
        const imgUrl = entry.image || pdp.ogImage;
        if (imgUrl) {
          product.imageSource = imgUrl;
          if (!NO_IMAGES) {
            const ok = await downloadImage(imgUrl, path.join(IMG_DIR, `${ourSlug}.jpg`));
            if (ok) product.image = `/products/${ourSlug}.jpg`;
            else report.imageFails.push({ name: item.name, imgUrl });
          }
        }
      } else {
        report.pdpFails.push({ name: item.name, url });
      }
      if (!fromCache) await sleep(500);
    }

    // Fallback for products not sold on eminenceorganics.com (e.g. tools):
    // use the hand-written description from the price list.
    if (!product.description && item.description) product.description = item.description;

    products.push(product);
    process.stdout.write(`\r[${String(count).padStart(3)}] ${how.padEnd(9)} ${item.name.slice(0, 42).padEnd(42)}`);
  }

  const categories = CAT_ORDER
    .filter((k) => products.some((p) => p.category === k))
    .map((k) => ({ key: k, name: CAT_NAMES[k] || k, count: products.filter((p) => p.category === k).length }));

  const data = {
    _meta: { generatedAt: new Date().toISOString(), source: priceList._meta.scrapeSource, currency: 'CAD', count: products.length },
    categories,
    products,
  };
  await fs.writeFile(OUT_DATA, JSON.stringify(data, null, 2));
  await fs.writeFile(OUT_REPORT, JSON.stringify(report, null, 2));

  console.log('\n— done —');
  console.log(`Products: ${products.length}`);
  console.log(`Matched: ${report.matched.length}  Fuzzy: ${report.fuzzy.length}  Unmatched: ${report.unmatched.length}  PDP fails: ${report.pdpFails.length}  Image fails: ${report.imageFails.length}`);
  if (report.fuzzy.length) console.log('FUZZY:\n  ' + report.fuzzy.map((f) => `${f.name} → ${f.slug} (${f.score})`).join('\n  '));
  if (report.unmatched.length) console.log('UNMATCHED:\n' + JSON.stringify(report.unmatched, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
