# CLAUDE.md — Project Configuration
# Harav Salon & Spa | A Salon & Spa Website with Salon Products | Started: Jun 02. 2026

---

## Project Overview

**Client:** Harav
**Business type:** Salon & Spa
**Location:** Winnipeg, Manitoba
**Project type:** New build
**Live URL (when deployed):** https://haravsalonspa.ca/
**Vercel project name:** [e.g. harav-salon]
**Primary contact:** [Client name + how they prefer to be contacted]

**Project goal in one sentence:**
[e.g. "Build a high-end salon website with an online product store and booking inquiry system."]

---

## Design Spec

> Always read `design-spec.md` before writing any UI code.
> Never invent colours, fonts, spacing, or layout — it must come from the spec.

**Design spec location:** `./design-spec.md`
**Design status:** handed off

### Brand summary (fill in from design spec)
- **Primary colour:** [e.g. #1A1A2E]
- **Accent colour:** [e.g. #E94560]
- **Background:** [e.g. #F9F6F0]
- **Display font:** [e.g. Playfair Display]
- **Body font:** [e.g. Inter]
- **Overall aesthetic:** [e.g. Luxury, minimal, warm — 2-3 words max]

---

## Pages & Sections

List every page this site has. Claude Code uses this as the source of truth for
what needs to be built. Check off as each is completed.

- [ ] Home
- [ ] About
- [ ] Services
- [ ] Products
- [ ] Contact
- [ ] 404

---

## Stack for This Project

> This inherits everything from the Global CLAUDE.md. Only list what is
> different or added for this specific project.

**Uses Supabase:** Yes, but need help setting it up. And store products in supabase. 

**Uses Stripe:** Yes, but need help setting it up. This would be needed for products checkout and booking deposit.

**Uses Resend:** Yes, but need help setting it up.
- Recipient email (where form submissions go): contact@haravsalonspa.ca
- Forms on this site: Contact form, Booking form

**Uses Framer Motion / GSAP:** Yes

**Any other integrations:** 

---

## Environment Variables

List every `.env.local` variable this project needs.
Actual values are never written here — this is just the reference list.

```
# Resend
RESEND_API_KEY=
ORDERS_NOTIFY_EMAIL=        # product order alerts (falls back to BOOKINGS_NOTIFY_EMAIL)

# Stripe (booking deposit + product checkout)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Boutique gate — "true" only after Stripe is set up and `npm run stripe:sync` has run
NEXT_PUBLIC_STORE_ENABLED=

# Supabase (bookings + admin auth only)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Site
NEXT_PUBLIC_SITE_URL=
```

> Always confirm `.env.local` is in `.gitignore` before touching any of these.

---

## Project-Specific Rules & Constraints

Use this section for anything unique to this client or project that Claude Code
should always keep in mind.

- This client's brand voice is formal and professional — no casual language in copy
- The boutique = ~142 Éminence SKUs (`data/products.json`). Product catalog + checkout now live in **Stripe** (Products/Prices via `npm run stripe:sync`), gated behind `NEXT_PUBLIC_STORE_ENABLED`. Supabase is bookings + admin auth only (no product/order tables).
- The 100% customer base for this business are women.
- This business is looking for a very smooth booking form experience.
- Homepage hero must load in under 1.5s — prioritise performance here above all

**Rules for this project:**
- No hardcoded rules.

---

## Current Status

> Update this section at the end of each working session so the next session
> picks up exactly where you left off.

**Last updated:** 2026-06-05
**Phase:** Phase 1 complete + integrations wired in TEST mode (Stripe, Resend, Supabase). Boutique flipped ON locally. Two UI/content/ecommerce batches + SEO/GEO pass 1 done (see In Progress). Next: client to confirm booking-form conditions → finalise bookings schema → run Supabase migration → rebuild booking form. Then Vercel link + LIVE keys + production `NEXT_PUBLIC_SITE_URL`.

### Completed
- [x] Design spec received and reviewed (homepage + shop & portal UI kits)
- [x] Discovery agent run → `discovery.md` (keywords, competitors, personas, content map, local SEO)
- [x] Discovery revised with the real service price list (`Salon_Services_Pricelist.xlsx`) + real local competitors (sugaring/esthetics studios)
- [x] Copywriting agent run → `copy.md` (all Phase 1 pages, site-wide copy, forms, admin UI strings)
- [x] Architecture agent run → `architecture.md` (routes, components, Supabase schema + RLS, Stripe deposit flow, Resend, build order)
- [x] Project scaffolded (Next.js 15 + TS + Tailwind v4; hand-rolled shadcn-style primitives — no interactive CLIs)
- [x] Frontend build → all Phase 1 pages, sections, layout, booking UI, admin UI (code)
- [x] Backend build → Supabase clients + RLS migration, Stripe deposit flow, Resend emails, API routes, server actions
- [x] `npm run build` verified GREEN locally on D: (169 prerendered pages) — readlink shim added (`scripts/build.cjs` + `scripts/patch-node24-readlink.cjs`); `build` script now runs `node scripts/build.cjs`
- [x] Pushed to GitHub → github.com/nishantmalik20/harav-website (branches: main = production, dev = working; currently on dev)
- [x] Hero reworked → rotating boutique highlight (`hero-boutique.tsx`) replacing the hours card; signals services + retail
- [x] Boutique moved Supabase → **Stripe**: `scripts/stripe/sync-products.mjs` (`npm run stripe:sync`) pushes catalog → Stripe Products/Prices (`data/stripe-prices.json` map); cart (`components/shop/cart-*`) + `/api/checkout` + order webhook branch + order emails; gated by `NEXT_PUBLIC_STORE_ENABLED`. Dropped Supabase `0002_products` migration/seed.
- [x] Environment configured in TEST mode (`.env.local`, gitignored): Stripe test keys + webhook secret via `stripe listen`, 142 products synced (`npm run stripe:sync`), `NEXT_PUBLIC_STORE_ENABLED=true`; Resend (haravsalonspa.ca verified, single `contact@haravsalonspa.ca` for from+notify, live test send OK); Supabase (legacy anon + service_role keys, admin user `admin@haravsalonspa.ca` created via Auth). LIVE keys still pending.
- [ ] **Supabase tables NOT yet created** — migration `supabase/migrations/0001_init.sql` still needs running in the SQL editor (intentionally deferred until the booking-form redesign so the bookings schema is final; bookings + newsletter writes will fail until then)
- [ ] Vercel project linked to the GitHub repo

### In Progress
- **Booking-form redesign (next session)** — client is confirming a list of booking conditions (conditional fields, availability rules, deposit logic). The Supabase migration is PAUSED on purpose until the bookings schema is final (run it once). Resume order: get conditions → lock data model → run migration → build form frontend-first → re-enforce every money/data rule server-side.
- **2026-06-05 polish batch DONE** (on `dev`, not yet committed): "Reserve"→"Book" CTA sitewide; replaced AVITANE-branded massage photo with a brand-free spa image (`public/images/proof-room.jpg`); fixed hero variable-height — real cause was `lg:justify-self-end` making the boutique card shrink-to-fit the product-name width, which (via the `aspect-[4/5]` image box) drove its height; fixed by pinning the card to `lg:w-[360px]` in `hero-boutique.tsx` (plus the earlier fixed name block + line-clamp); product-card images now `object-contain` (uniform, no edge-bleed); quick "Add to bag" on cards (`components/shop/quick-add.tsx`); new FAQ section + FAQPage JSON-LD (`components/sections/faq.tsx`, `lib/faq.ts`) on home; journal expanded to 9 long SEO articles w/ block model + BlogPosting JSON-LD (`lib/journal.ts` + journal `[slug]`); deepened homepage copy (hero, brand-intro, services-menu) and fixed "skin & hair care" → "skincare & beauty". `npx tsc --noEmit` GREEN.
- **2026-06-05 (batch 2) — ecommerce DONE:** product cards now show a short description + star rating + Add to bag (Éminence-style); shop filters moved from the top rail to a **left sidebar** (`shop-catalog.tsx`, category + concern, collapsible on mobile); **unique order number** `HRV-XXXXXX` generated at checkout (`lib/order.ts`), stored on the Stripe session + PaymentIntent metadata (searchable in Dashboard) and shown on `/shop/success` with an order summary read back from the session; `lib/email.ts` rewritten with a **branded shell** (gold HARAV wordmark, support line, "The Harav Team", address) used by all emails — order confirmation (customer) + notification (salon) now include the order number; **contact-form auto-reply** added (`sendContactAutoReply`). Verified live: real checkout session carried `HRV-DDMSEF`; success page rendered it; test contact + order emails sent via Resend with no errors. Webhook delivery needs `stripe listen` running locally (or the prod webhook) — that was the reason emails weren't arriving before.
- ⚠️ **Star ratings are PLACEHOLDER/FAKE** (`lib/ratings.ts`, deterministic per slug). Per CLAUDE.md's own discovery note, invented reviews on a LIVE site risk Canada's Competition Act / FTC. Built as requested pre-launch and centralised at one swap-point — **decide before production**: wire real reviews, or remove the rating UI.
- **2026-06-05 — SEO/GEO pass 1 DONE** (`06-seo-geo-agent`): per-page metadata + self-canonicals + Twitter cards; `app/sitemap.ts` (`/sitemap.xml`, 162 URLs) + `app/robots.ts`; dynamic branded OG image (`app/opengraph-image.tsx`); JSON-LD via `components/seo/json-ld.tsx` + `lib/seo.ts` — site-wide Organization, BeautySalon LocalBusiness w/ NAP + geo (49.846,-97.153) + hours + 6-service OfferCatalog (home), FAQPage (home), Product+Offer+AggregateRating + BreadcrumbList (product pages), OfferCatalog (services), BlogPosting (journal). Image-alt audit clean (no raw `<img>`). Report → `seo-report.md`. tsc GREEN; sitemap/robots/OG/schema all verified rendering. **User will run the SEO/GEO agent again (pass 2) later.** ⚠️ On deploy: set `NEXT_PUBLIC_SITE_URL=https://haravsalonspa.ca` (sitemap/robots/canonicals/schema currently emit localhost). ⚠️ Product schema emits `AggregateRating` from the FAKE ratings — remove or make real before launch (machine-readable fake reviews = sharper Competition Act/FTC risk than the visual stars).
- **Flagged, not done:** `public/images/about-room-1.jpg` (hair-styling chairs + neon text) and `about-room-2.jpg` (VERB-branded hair products) are off-brand for a women-only, no-hair salon — replace later. Mobile responsiveness reviewed at code level (mobile-first throughout) but NOT pixel-verified on a true phone viewport (Chrome window wouldn't shrink in automation) — worth a real-device spot check. `contact@haravsalonspa.ca` still needs to be a real *inbox* to receive salon notifications (sending works; receiving depends on the mailbox).

### Known facts (locked this session)
- Real menu = Facials · Body Sugaring · Waxing/Threading · Lash & Brow · Nails · Massage. This is the COMPLETE offering — no hair styling, makeup, laser hair removal, spray tan, or men's. Homepage Facial/Hair/Makeup cards are placeholders → re-map. Prices CAD per the xlsx.
- Location = Unit #2 – 1172 Pembina Hwy, Winnipeg, MB R3T 2A4 (Fort Garry / Pembina corridor, near U of M). Phone = 431-570-1420.
- Photography = none yet (new business) → use curated LUXURY STOCK matching the warm/gilded/low-lit theme; swap for a real shoot later. Hero < 1.5s.
- Deposit = $20 Stripe deposit on a subset: all Facials; Sugaring Full Legs; Waxing Full Body ±Brazilian; 60-min Massage; Lashes (Sweet YY, Classic, Lift+Tint, Sweet Lash Lift); Nails (Gel Nails, Nail Fill). Deposit is NON-REFUNDABLE. → Stripe needed at launch for deposits; product checkout still P2.
- Booking = custom, in-house build (no third-party widget).
- Phasing: Phase 1 = marketing site + booking + STAFF ADMIN dashboard (`/admin`). Boutique brought forward & built on **Stripe** (2026-06-04): catalog + checkout live in Stripe; orders = Stripe Dashboard + Resend emails (no Supabase orders table). Fulfilment = in-studio pickup. Gated OFF until Stripe keys + `npm run stripe:sync`. Prices in `data/products.json` are scraped Éminence values — reconcile with the client price-list before the LIVE sync.
- Accounts: NO customer accounts (guest booking + guest checkout). Only login = staff admin (Supabase Auth, admin role) → Supabase needed at launch for bookings store + admin auth.
- Admin shows: all upcoming/past appointments with customer name, email, phone, service(s), booked time slot, notes; manage status (confirm/reschedule/cancel/complete/no-show). Customer PII → admin-only, protect with RLS.
- Hours = Mon–Fri 10am–7pm, Sat 10am–6pm, Sun 11am–6pm. Parking = back lane behind building, accessible.
- Owner & sole esthetician = Khushi (5+ yrs experience) — bio in copy.md.
- Reviews = none yet; NO fake reviews on the live site (Competition Act/FTC risk). Use honest signals + hide rating pill until real GBP reviews exist.
- Positioning = accessible-priced, women-only, multi-service destination; sell experience/feel, not price.

### Up Next
1. Import the repo into Vercel (dashboard → New Project → harav-website). Production branch = main; framework auto-detects Next.js. Vercel builds on Linux, so the exFAT issue does not affect it.
2. Provision env (client working on these): Supabase (run `supabase/migrations/0001_init.sql` + create Khushi's admin user), Stripe (keys + webhook secret), Resend (verify domain). Add to Vercel env + local `.env.local` from `.env.example`.
3. **Go live with the boutique:** confirm catalog prices vs the client price-list → `npm run stripe:sync` (test first, then LIVE keys) → set `NEXT_PUBLIC_STORE_ENABLED=true` → add the `checkout.session.completed` webhook (already handles both deposits and orders) → smoke-test add-to-bag → Stripe Checkout → `/shop/success` + order emails.
4. Run **06-seo-geo-agent** → **07-reviewer** → **08-qa**.

> Local builds: D: is exFAT → bare `next build` crashes (readlink EISDIR). RESOLVED — `npm run build` now uses `scripts/build.cjs`, which preloads a readlink shim and builds green on D:. Vercel/Linux unaffected either way.

### Blockers (waiting on client — see discovery.md §8)
- ✅ RESOLVED — Booking: in-house custom build (no third-party)
- ✅ RESOLVED — Service menu + prices: `Salon_Services_Pricelist.xlsx` (CAD; placeholders OK for blanks)
- ✅ RESOLVED — Menu scope: price-list services only (no hair/makeup/laser/spray tan/men's)
- ✅ RESOLVED — Address: Unit #2 – 1172 Pembina Hwy, Winnipeg, MB R3T 2A4 (Fort Garry)
- ✅ DEFERRED — Products/boutique → Phase 2 (data migrated from a permitted source later)
- ✅ RESOLVED — Phone: 431-570-1420 (NAP fully locked)
- ✅ RESOLVED — Photography: curated LUXURY STOCK (warm/gilded/low-lit) until a real shoot; hero < 1.5s
- ✅ RESOLVED — Deposit: $20 Stripe deposit on a defined subset → Stripe needed at launch (see discovery §5)
- Remaining (non-blocking): new-guest offer specifics; confirm if deposit carries to a reschedule; set up Google Business Profile + gather real reviews post-launch
- ✅ RESOLVED — INFRA: D: exFAT made bare `next build` crash (readlink EISDIR; the exFAT FS returns EISDIR where @vercel/nft expects EINVAL). Fixed with a readlink shim — `npm run build` → `node scripts/build.cjs` (preloads `scripts/patch-node24-readlink.cjs`). Builds green on D:; no-op on Vercel/Linux. (Updating Node *forward* does NOT fix it; the trigger is the filesystem.)
- ⚠ ENV: provision Supabase (run `supabase/migrations/0001_init.sql` + create admin user), Stripe (keys + webhook secret), Resend (verify haravsalonspa.ca + from address); copy `.env.example` → `.env.local`.
- ✅ RESOLVED — No CUSTOMER accounts (guest booking/checkout); BUILD a staff admin/back-office (`/admin`) to manage bookings (+ orders in P2) via Supabase Auth

---

## Deployment Checklist

Run through this before every production deployment.

- [ ] `npm run build` passes with zero errors
- [ ] All `.env.local` variables added to Vercel environment variables
- [ ] Custom domain configured in Vercel
- [ ] `www` redirect set up (www → apex or vice versa, pick one)
- [ ] SSL certificate active (Vercel handles this automatically)
- [ ] Google Analytics or similar added if client requested
- [ ] Favicon and og:image set
- [ ] All forms tested end-to-end (submission → email received)
- [ ] Mobile tested at 375px
- [ ] Lighthouse score checked (aim for 90+ performance)
- [ ] `sitemap.xml` generated and accessible at `/sitemap.xml`
- [ ] `robots.txt` present and correct
- [ ] 404 page exists and is styled

---

*Place this file at the root of the project folder as `CLAUDE.md`.
Claude Code reads it automatically at the start of every session.*
