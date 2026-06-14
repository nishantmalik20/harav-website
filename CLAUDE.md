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

**Last updated:** 2026-06-14
**Phase:** Code review + QA complete (sandbox). Site DEPLOYED to Vercel in TEST mode at https://harav-website.vercel.app (project `harav-website`, GitHub connected: main → production, dev → previews). Supabase migration RUN — booking flow verified end-to-end on the deployment (no-deposit save + Stripe TEST checkout). Remaining for go-live: Stripe webhook endpoint, price reconciliation + LIVE keys, custom domain + production `NEXT_PUBLIC_SITE_URL`, SEO pass 2, QA.

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
- [x] **Supabase migration RUN (2026-06-11)** — `0001_init.sql` applied via the SQL editor (bookings incl. `intake_form` / `intake` jsonb / `consented_at`, subscribers, RLS + policies). Verified: live POST /api/bookings saves (no-deposit) and returns a Stripe TEST checkout URL (deposit); probe rows deleted after.
- [x] **Vercel LIVE in TEST mode (2026-06-11)** — project `harav-website` (team nishantmalik20s-projects), GitHub repo connected (main → production, dev → preview builds; preview URLs need Vercel login, production URL is public). https://harav-website.vercel.app deployed via CLI. Env (production scope): all TEST keys from `.env.local` EXCEPT `STRIPE_WEBHOOK_SECRET` (local `stripe listen` value is wrong for prod — create a dashboard webhook endpoint at go-live, until then deposit status stays "pending" after payment and webhook emails don't fire); `NEXT_PUBLIC_SITE_URL=https://harav-website.vercel.app` (⚠ swap to https://haravsalonspa.ca at go-live); `NEXT_PUBLIC_STORE_ENABLED=true`. Vercel CLI now installed + authed locally.

### In Progress
- **2026-06-14 (booking fixes) — DONE & DEPLOYED to production** (`main` @ `e5f29f1`, public site rebuilt; Stripe still TEST): three booking-integrity bugs. (1) **Abandoned checkouts no longer hold a slot** — `lib/availability.ts` `blocksSlot` dropped the time-based hold; a slot is held ONLY when secured: salon-confirmed, a no-deposit booking, or a deposit that's **paid**. An unpaid/abandoned deposit never blocks (a guest who backs out of Stripe can re-book; supersedes the old "30-min hold" note in batch 2). ⚠ Tradeoff: a tiny double-booking window if two guests pay for the exact same slot at the same moment — acceptable for a one-chair studio; owner reviews bookings. (2) **Per-service duration** added to `lib/services.ts` (`durationMin`, ESTIMATES rounded to the 30-min grid — confirm with Khushi); `takenTimes` expands each booking across every 30-min slot it spans, so an hour-long treatment fills the whole hour (no bookable second-half = no esthetician double-book). (3) **Business-hours fit** — `generateSlots(date, durationMin)` only offers starts where the WHOLE treatment finishes by close; the API re-validates. Verified live against the prod DB (paid 60-min → blocks 2 slots; unpaid → blocks none; no-deposit → blocks 1; 60-min @ 18:30 & before-open → 400; rows cleaned up). tsc + build green.
- **2026-06-14 — pre-meeting review + QA + hardening DONE** (on `dev`): (1) Footer attribution → "Built and managed by inishant.com **via onboardprints.ca**" (both links). (2) Lash journal post (`how-long-do-lash-extensions-last`) now uses a fresh, previously-unused image `public/images/journal-lash.jpg` (Pexels #5128220, license-free; the old `service-lash.jpg` is still used on the homepage services strip). (3) **Reviewer agent** → `review-report.md`: 0 critical, build green (178 pages, exit 0), tsc clean, no secrets/`console.log`/raw `<img>`/XSS sinks. (4) **Security hardening**: Supabase advisor flagged `rls_policy_always_true` (bookings/subscribers `USING(true)` for any authenticated user = PII exposure if sign-ups open). FIXED — new `supabase/migrations/0002_tighten_rls.sql` scopes both policies to `admin@haravsalonspa.ca` via `auth.jwt()->>'email'`; applied to the live (sandbox) project, advisor re-run is clean. Public booking/newsletter inserts unaffected (service-role bypasses RLS). Admin dashboard reads via the authenticated session, so the policy matches the sole account and the dashboard keeps working. (5) **QA agent** → `qa-report.md`: all 17 routes serve correct codes (200s, `/admin`→307 login, unknown→404), no console errors, home/lash-post/book/shop verified visually (desktop). Stripe untouched = TEST mode. ⚠ Remaining advisor item: enable leaked-password protection (Auth dashboard toggle). ⚠ Mobile 375px not pixel-verified (automation can't shrink the window) — real-device spot check recommended. ⚠ Placeholder `/shop` ratings still fake — resolve before the boutique is public.
- **2026-06-11 (batch 3) — under-18 booking unblocked DONE** (owner's request via Nishant: NEVER stop the form at the 18+ question — capture everything; the salon calls the guest personally). Answering "No" to 18+ no longer disables/blocks submit (client) and is no longer rejected by `/api/bookings` (server); `UNDER_18_MESSAGE` reworded to "we'll give you a quick call to confirm". Flag rides through everywhere: amber **banner in the salon notification email**, a "we'll call you — parent/guardian consent needed" line in the **guest confirmation** (both the booking-time and the webhook deposit-receipt variants), and an **"Under 18 — call to confirm" badge** in the admin bookings table (derived from stored `intake.age18`, no schema change). Verified live: under-18 sugaring POST → 200, row saved with `age18:"No"`, emails fired; probe deleted. ⚠ OPEN DECISION: minors still pay the $20 non-refundable deposit on deposit services before the salon's consent call — confirm with the owner whether under-18 bookings should skip the deposit instead.
- **2026-06-11 (batch 2) — booking conflicts + UX fixes DONE** (on `dev`, not committed; tsc GREEN; all verified live on localhost): (1) **Double-booking blocked** — new `lib/availability.ts` (shared `generateSlots` + server-only `takenTimes`; an unpaid-deposit booking holds its slot 30 min, then it reopens so abandoned checkouts can't block the calendar; `confirmed` always blocks, `cancelled`/`no_show` never); new GET `/api/bookings/availability?date=` (service-role, returns times only); POST `/api/bookings` now validates date format + not-past (America/Winnipeg), time within business-hour slots, and returns **409** on a taken slot; booking form greys out taken slots ("11:30 am — booked"), hides past times for same-day, fixed UTC `today` bug (`toLocaleDateString("en-CA")`), shows "fully booked" notice, and on 409 bounces the guest back to the Date & time step with availability refreshed. Race window between check and insert remains (no DB unique constraint) — acceptable for a one-esthetician studio. (2) **care-categories** constrained to `max-w-6xl` matching the header (pixel-verified; rollback values in memory `hero-and-sections-2026-06-11`). (3) **hero-boutique rebuilt WITHOUT framer-motion** — stacked CSS-crossfade layers, manual swipe (pointer, 40px threshold) + prev/next arrows + dots, auto-rotate stops permanently on interaction; framer's `AnimatePresence mode="wait"` silently wedged in dev (React 19 StrictMode + framer 11.15) once restructured — CSS transitions are immune. (4) **Stuck deposit root-caused & fixed**: the Jun-12 11:30 booking was paid at 14:37Z but the prod webhook endpoint was only created 19:27Z — Stripe doesn't deliver to endpoints that didn't exist yet; replayed via `stripe trigger checkout.session.completed --add "checkout_session:metadata[booking_id]=…"` → prod webhook verified working end-to-end, row now `paid` (NOT a go-live risk; just recreate the endpoint in live mode per runbook). NOTE: local `.env.local` `STRIPE_WEBHOOK_SECRET` = `stripe listen` secret; the Vercel one = dashboard endpoint secret — they're different on purpose; the manual-replay 400 was that, not a misconfig. Probe rows deleted after. ⚠ Admin "Confirm" button = internal status only (new→confirmed), sends NO email — user questioned its purpose; decision pending (wire it to a confirmation email for no-deposit bookings, or drop it).
- **2026-06-10 — booking form rebuilt DONE** (on `dev`, not committed): 4-step wizard (`components/booking/booking-form.tsx`) — treatment → date & time → your details → consultation & consent. Dynamic consultation step from `lib/intake.ts` (single source of truth, shared client+server): **facial**, **carbon-laser** (Carbon Laser Facial only), **lash-extensions** (Sweet YY / Sweet Lash Classic / Lash Fill — lifts/tints/removal get the general form), **sugaring** (all sugaring), **general** (everything else: short disclosure only). Built from the client's paper forms in `Form References/` with language rewritten (no copy-paste); signature/technician fields dropped per Nishant — consent is ONE mandatory checkbox (`CONSENT_STATEMENT`). Every question required; checkbox groups have exclusive "None" options; conditional fields via `showIf`; under-18 answer blocks online booking with a "call us" notice (client + server). Field renderer: `components/booking/intake-fields.tsx`. API re-validates everything server-side (`/api/bookings`: formId match + `validateIntake` + consent literal + 18+); answers stored on bookings (`intake_form`, `intake` jsonb, `consented_at` — migration updated), shown in admin (expandable "View consultation" row in `bookings-table.tsx`) and in the salon notification email Q&A block (`lib/email.ts`). Fixed a React button-type-swap bug (Continue→submit on the same DOM node double-fired submit; nav button is now always type=submit, handler branches on step — Enter advances too). **Mobile fixes (same day):** progress bar showed the current step label TWICE below `sm` (desktop span wasn't hidden for the current step — now `hidden sm:inline` unconditionally); consultation step overflowed the viewport (page "shrank" w/ white gap) — root cause was the nav row's min-content: Back + nowrap `Continue to deposit · $20` button (tracking-[0.22em]) ≈ 381px > ~349px available, grid items wouldn't shrink → nav now stacks `flex-col-reverse` w/ `w-full` button below `sm`, label shortened to "Continue to deposit"; also hardened fieldsets (`min-w-0` + floated `w-full` legend — UA `min-width:min-content` / legend quirks). Verified at 500px window: scrollWidth == viewport on the carbon-laser step, labels single, consent + stacked nav render clean. Verified live in Chrome: carbon-laser full flow (exclusive "None" clears others, conditional medication textarea, consent → POST `/api/bookings` returns 500 ONLY at the Supabase insert = expected, tables not created yet) + massage general flow. `npx tsc --noEmit` GREEN. NOT verified: real Stripe redirect + emails (needs migration run first); `npm run build` skipped (dev server running — shared `.next`).
- **2026-06-05 polish batch DONE** (on `dev`, not yet committed): "Reserve"→"Book" CTA sitewide; replaced AVITANE-branded massage photo with a brand-free spa image (`public/images/proof-room.jpg`); fixed hero variable-height — real cause was `lg:justify-self-end` making the boutique card shrink-to-fit the product-name width, which (via the `aspect-[4/5]` image box) drove its height; fixed by pinning the card to `lg:w-[360px]` in `hero-boutique.tsx` (plus the earlier fixed name block + line-clamp); product-card images now `object-contain` (uniform, no edge-bleed); quick "Add to bag" on cards (`components/shop/quick-add.tsx`); new FAQ section + FAQPage JSON-LD (`components/sections/faq.tsx`, `lib/faq.ts`) on home; journal expanded to 9 long SEO articles w/ block model + BlogPosting JSON-LD (`lib/journal.ts` + journal `[slug]`); deepened homepage copy (hero, brand-intro, services-menu) and fixed "skin & hair care" → "skincare & beauty". `npx tsc --noEmit` GREEN.
- **2026-06-05 (batch 2) — ecommerce DONE:** product cards now show a short description + star rating + Add to bag (Éminence-style); shop filters moved from the top rail to a **left sidebar** (`shop-catalog.tsx`, category + concern, collapsible on mobile); **unique order number** `HRV-XXXXXX` generated at checkout (`lib/order.ts`), stored on the Stripe session + PaymentIntent metadata (searchable in Dashboard) and shown on `/shop/success` with an order summary read back from the session; `lib/email.ts` rewritten with a **branded shell** (gold HARAV wordmark, support line, "The Harav Team", address) used by all emails — order confirmation (customer) + notification (salon) now include the order number; **contact-form auto-reply** added (`sendContactAutoReply`). Verified live: real checkout session carried `HRV-DDMSEF`; success page rendered it; test contact + order emails sent via Resend with no errors. Webhook delivery needs `stripe listen` running locally (or the prod webhook) — that was the reason emails weren't arriving before.
- ⚠️ **Star ratings are PLACEHOLDER/FAKE** (`lib/ratings.ts`, deterministic per slug). Per CLAUDE.md's own discovery note, invented reviews on a LIVE site risk Canada's Competition Act / FTC. Built as requested pre-launch and centralised at one swap-point — **decide before production**: wire real reviews, or remove the rating UI.
- **2026-06-05 — SEO/GEO pass 1 DONE** (`06-seo-geo-agent`): per-page metadata + self-canonicals + Twitter cards; `app/sitemap.ts` (`/sitemap.xml`, 162 URLs) + `app/robots.ts`; dynamic branded OG image (`app/opengraph-image.tsx`); JSON-LD via `components/seo/json-ld.tsx` + `lib/seo.ts` — site-wide Organization, BeautySalon LocalBusiness w/ NAP + geo (49.846,-97.153) + hours + 6-service OfferCatalog (home), FAQPage (home), Product+Offer+AggregateRating + BreadcrumbList (product pages), OfferCatalog (services), BlogPosting (journal). Image-alt audit clean (no raw `<img>`). Report → `seo-report.md`. tsc GREEN; sitemap/robots/OG/schema all verified rendering. **User will run the SEO/GEO agent again (pass 2) later.** ⚠️ On deploy: set `NEXT_PUBLIC_SITE_URL=https://haravsalonspa.ca` (sitemap/robots/canonicals/schema currently emit localhost). ⚠️ Product schema emits `AggregateRating` from the FAKE ratings — remove or make real before launch (machine-readable fake reviews = sharper Competition Act/FTC risk than the visual stars).
- **2026-06-10 — homepage editorial batch DONE** (on `dev`, not committed): two sections restyled after the motionsites.ai "luxury editorial ecommerce" reference. (1) NEW `components/sections/care-categories.tsx` below Brand Intro — full-bleed 3-card video strip (face / lash & brow / body), vertical Marcellus word per card, pill CTA → `/services#…` anchors; clips = Pexels stock (31797386, 7424019, 6629845) cut to 2.5s 720×960 palindrome loops via ffmpeg (warm grade baked in), `public/videos/ritual-*.mp4` + poster JPGs (~180–470KB each); `components/motion/auto-video.tsx` plays only in-viewport, holds poster under reduced-motion. (2) `bestsellers.tsx` rebuilt → white full-bleed band + `bestsellers-carousel.tsx` (client): lowercase "● best sellers / sets" tabs (sets = real catalog category), hairline-divided minimal cells (category + concern over-line, contained image, name, price, quiet "Add to bag" — NO star ratings here anymore), scroll-snap carousel with progress line + round arrows. Also fixed a pre-existing `app/sitemap.ts` type error (`as const`). `npm run build` compiles green (178 pages; a final `.next/trace` EPERM only occurs if dev server runs concurrently — env lock, not code). Verified live: tabs swap, arrows + progress work, add-to-bag opens drawer, `/services#facials` anchor lands. ⚠ Dev servers got wedged by the concurrent build → killed stale node trees, wiped `.next`, restarted fresh on port 3002.
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
1. Client/user review pass on https://harav-website.vercel.app (incl. real-phone check of the booking wizard at 375px).
2. ✅ DONE (2026-06-11) — Stripe TEST webhook endpoint `we_1ThEG41Q1PSNgELb20zcDWxh` → `/api/stripe/webhook`, `STRIPE_WEBHOOK_SECRET` on Vercel. Verified live: signed event → deposit flips to "paid" + guest gets "Appointment confirmed — deposit receipt" email (receipt box w/ amount, date, payment ref + booking details + consultation Q&A; `lib/email.ts`). ⚠ At LIVE-keys switch: recreate the endpoint in live mode + replace the secret. ⚠ Vercel production env vars are write-only here (`vercel env pull` returns ""); keep values in local `.env.local`. Still to do: merge `main` ← `dev` when review passes (main = production branch for git pushes).
3. **Go live with the boutique:** confirm catalog prices vs the client price-list → `npm run stripe:sync` (test first, then LIVE keys) → smoke-test add-to-bag → Stripe Checkout → `/shop/success` + order emails.
4. ✅ DONE (2026-06-14) — **07-reviewer** (`review-report.md`) + **08-qa** (`qa-report.md`): 0 critical, ready for sandbox demo. Still optional: **06-seo-geo-agent** pass 2. Before launch: LIVE keys, custom domain haravsalonspa.ca, `NEXT_PUBLIC_SITE_URL` swap, decide fake-ratings removal, enable Supabase leaked-password protection.

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
