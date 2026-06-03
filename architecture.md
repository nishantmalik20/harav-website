# Architecture Blueprint — Harav Salon & Spa
*Generated: 2026-06-02 · Agent 03 (Architecture) · Phase 1 (marketing site + booking + admin)*

> Stack: **Next.js (App Router, latest stable) · TypeScript · Tailwind CSS · shadcn/ui · Supabase (bookings + admin auth) · Stripe (deposit) · Resend (email) · Framer Motion + GSAP · Vercel.**
> Scope: Phase 1 only. Shop/boutique, products, orders, and gift cards are **Phase 2** and are intentionally **not** built or scaffolded now (no `products`/`orders` tables, no `/shop`).

---

## 1. Routes

All Server Components by default. Interactivity is pushed into small Client children so pages stay server-rendered (fast hero per the < 1.5s requirement).

### Public
| Route | File | Type | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Home. Sections pull from shared components; wrapped in client `Reveal` for scroll animation. |
| `/treatments` | `app/treatments/page.tsx` | Server | Full menu from `lib/services.ts` (static). `generateMetadata`. |
| `/about` | `app/about/page.tsx` | Server | Story, standard, space, Khushi bio. |
| `/book` | `app/book/page.tsx` | Server shell + Client form | Booking flow. Page is Server (copy/metadata); `BookingForm` is Client. |
| `/book/success` | `app/book/success/page.tsx` | Server | Post-deposit / confirmation landing (reads `?booking=` / Stripe redirect). |
| `/journal` | `app/journal/page.tsx` | Server | Index of posts (local MDX). |
| `/journal/[slug]` | `app/journal/[slug]/page.tsx` | Server | Article. `generateStaticParams` + `generateMetadata`. |
| `/contact` | `app/contact/page.tsx` | Server shell + Client form | NAP, map, `ContactForm` (Client). |
| `/terms`, `/returns`, `/privacy`, `/cookies` | `app/(legal)/*/page.tsx` | Server | Static legal stubs (group route, shared simple layout). |
| `404` | `app/not-found.tsx` | Server | On-brand. |

### Admin (private — `noindex`, auth-gated)
| Route | File | Type | Notes |
|---|---|---|---|
| `/admin/login` | `app/admin/login/page.tsx` | Client | Supabase email/password sign-in. |
| `/admin` | `app/admin/page.tsx` | Server shell + Client table | Bookings dashboard. Server fetches initial rows (server Supabase client); `BookingsTable` Client for filters/actions. |

**Protection:** `middleware.ts` guards `/admin/:path*` (except `/admin/login`) — checks Supabase session via `@supabase/ssr`; redirects to `/admin/login` if absent. Only the owner (Khushi) has an account, so any authenticated session = admin (optionally gated by an `ADMIN_EMAILS` allowlist).

### Route-level metadata / SEO infra
- `app/sitemap.ts`, `app/robots.ts` (robots disallows `/admin`), `app/manifest.ts` (or static), per-route `generateMetadata`. (SEO agent 06 will refine.)

---

## 2. Component Tree

### Layout Components
| Component | Path | Type | Props (rough) |
|---|---|---|---|
| RootLayout | `app/layout.tsx` | Server | fonts, `<Header/>`, `<Footer/>`, `<Toaster/>` |
| Header | `components/layout/header.tsx` | **Client** | scroll-blur state + mobile toggle; `nav links` |
| MobileNav | `components/layout/mobile-nav.tsx` | **Client** | `open`, `links[]` (shadcn `sheet`) |
| Footer | `components/layout/footer.tsx` | Server | NAP, columns, socials, `NewsletterForm`, inishant credit |
| NewsletterForm | `components/layout/newsletter-form.tsx` | **Client** | posts `/api/newsletter` |

### Section Components (Home + reused)
| Component | Path | Type | Props |
|---|---|---|---|
| Hero | `components/sections/hero.tsx` | Server | `eyebrow, title, subtitle, ctas` |
| BrandIntro | `components/sections/brand-intro.tsx` | Server | heading/body/cta |
| ProofBento | `components/sections/proof-bento.tsx` | Server | honest cards; rating pill hidden until real reviews |
| ServicesMenu | `components/sections/services-menu.tsx` | Server | `categories[]` (Facials/Sugaring/Lash & Brow featured) |
| ExperienceSteps | `components/sections/experience-steps.tsx` | Server | `steps[]` |
| JournalPreview | `components/sections/journal-preview.tsx` | Server | `posts[]` (latest 3) |
| CtaBanner | `components/sections/cta-banner.tsx` | Server | `eyebrow, heading, body, cta` (dark variant) |

### Shared UI / brand primitives
| Component | Path | Type | Notes |
|---|---|---|---|
| Eyebrow | `components/ui/eyebrow.tsx` | Server | brass double-rule + uppercase label (the signature element) |
| SectionHeading | `components/ui/section-heading.tsx` | Server | Marcellus H2 with gold-emphasis span |
| Button | `components/ui/button.tsx` | Server | shadcn button + brand variants: `primary, brass, terra, ghost, on-dark` |
| BrandLockup | `components/brand/brand-lockup.tsx` | Server | logo img + "HARAV / SALON · SPA" stack |
| Logo | `components/brand/logo.tsx` | Server | `next/image` of `harav-logo.png` |
| Reveal | `components/motion/reveal.tsx` | **Client** | Framer Motion scroll-reveal wrapper (300–600ms, ease `cubic-bezier(0.22,1,0.36,1)`) |
| Icon | `components/ui/icon.tsx` | Server | inline stroked SVGs (arrow ↗, star, phone, mail, calendar, clock) |

### Page-specific Components
| Component | Path | Type | Notes |
|---|---|---|---|
| ServiceCategory | `components/treatments/service-category.tsx` | Server | one category block + rows |
| ServiceRow | `components/treatments/service-row.tsx` | Server | name · duration · price · deposit badge |
| BookingForm | `components/booking/booking-form.tsx` | **Client** | multi-step: service → date/time → details → deposit; posts `/api/bookings` |
| ServiceSelect | `components/booking/service-select.tsx` | **Client** | grouped select from `lib/services.ts` |
| DateTimePicker | `components/booking/date-time-picker.tsx` | **Client** | shadcn `calendar`+`select`; disables closed days/times from business hours |
| ContactForm | `components/contact/contact-form.tsx` | **Client** | posts `/api/contact` |
| VisitMap | `components/contact/visit-map.tsx` | Server | static Google Maps embed (no JS API key needed) |
| PostCard | `components/journal/post-card.tsx` | Server | journal index card |
| Mdx | `components/journal/mdx.tsx` | Server | MDX render components mapping |
| BookingsTable | `components/admin/bookings-table.tsx` | **Client** | tabs (Upcoming/Past/All), status actions |
| LoginForm | `components/admin/login-form.tsx` | **Client** | Supabase auth sign-in |

> **Client-component justification (the only ones):** Header/MobileNav (scroll + menu), NewsletterForm/ContactForm/BookingForm + its pickers (form state, fetch), Reveal (Framer Motion), admin table + login (interactivity/auth). Everything else is Server.

---

## 3. shadcn/ui components to install
```
button, input, textarea, label, form, select, calendar, popover,
dialog, sheet, sonner, separator, card, badge, table, tabs,
dropdown-menu, skeleton
```
*(`form` pulls react-hook-form + zod; `sonner` for toasts; `calendar` for the date picker; `sheet` for mobile nav. `navigation-menu` optional — the nav is simple enough to hand-roll.)*

---

## 4. Data Models (Supabase)

Static content is **not** in the DB: the **service menu** lives in `lib/services.ts` (typed, seeded from `Salon_Services_Pricelist.xlsx`) and **journal posts** are local MDX. The DB holds only dynamic data.

### Table: `bookings`
| Column | Type | Null | Default |
|---|---|---|---|
| id | uuid | no | `gen_random_uuid()` PK |
| created_at | timestamptz | no | `now()` |
| customer_name | text | no | |
| customer_email | text | no | |
| customer_phone | text | no | |
| service_category | text | no | (Facials/Body Sugaring/Waxing/Lash & Brow/Nails/Massage) |
| service_name | text | no | |
| service_price | numeric(10,2) | yes | |
| preferred_date | date | no | |
| preferred_time | text | no | (e.g. "14:30") |
| esthetician | text | yes | default 'Khushi' |
| notes | text | yes | |
| deposit_required | boolean | no | false |
| deposit_amount | numeric(10,2) | no | 0 |
| deposit_status | text | no | 'none' — `none \| pending \| paid` |
| stripe_session_id | text | yes | |
| status | text | no | 'new' — `new \| confirmed \| completed \| no_show \| cancelled` |

- **Indexes:** `(preferred_date)`, `(status)`, `(created_at desc)`.
- **RLS:** enabled, deny-by-default.
  - **Anon:** no access at all. Inserts happen **server-side via the service-role key** (the `/api/bookings` route), which bypasses RLS — so no public insert policy is exposed.
  - **Authenticated (admin):** `SELECT`, `UPDATE`, `DELETE` allowed (only the owner has an account). Optional tighter check: `auth.email()` in `ADMIN_EMAILS`.

### Table: `subscribers` (newsletter)
| Column | Type | Null | Default |
|---|---|---|---|
| id | uuid | no | `gen_random_uuid()` PK |
| email | text | no | unique |
| created_at | timestamptz | no | `now()` |

- **RLS:** anon no access; server inserts via service role; admin may `SELECT`. (Alternatively a Resend Audience — but a table keeps it owned and simple.)

### Auth
- **Supabase Auth (email/password)**, admin-only. Create one user for Khushi at setup (no public sign-up UI). Use `@supabase/ssr` for cookie-based sessions in middleware + server components.

> **Phase 2 (not now):** `products`, `orders` tables + product RLS — defer with the shop.

---

## 5. API Routes

```
POST /api/bookings
- Purpose: create a booking; start deposit payment when required, else confirm immediately.
- Body: { name, email, phone, serviceCategory, serviceName, servicePrice,
          date, time, esthetician?, notes? }
- Validation: zod (server). Re-derive deposit_required/amount from lib/services.ts
  on the SERVER (never trust client for price/deposit).
- Services: Supabase (service role insert), Stripe (Checkout Session if deposit),
            Resend (salon notification always; customer confirm now if no deposit).
- Response: { ok: true, requiresDeposit: boolean, checkoutUrl?: string, bookingId }

POST /api/stripe/webhook
- Purpose: confirm deposit payment.
- Trigger: checkout.session.completed
- Action: mark booking deposit_status='paid'; send customer confirmation (Resend)
          + salon notification with "deposit paid".
- Security: verify Stripe-Signature with STRIPE_WEBHOOK_SECRET. Raw body (no bodyparser).
- Response: 200 { received: true }

POST /api/contact
- Purpose: contact form.
- Body: { name, email, phone?, message }
- Services: Resend (to contact@haravsalonspa.ca; replyTo = customer).
- Response: { ok: boolean, error? }

POST /api/newsletter
- Purpose: footer subscribe.
- Body: { email }
- Services: Supabase (subscribers upsert via service role).
- Response: { ok: boolean }
```

**Admin mutations** (status changes) use **Next.js Server Actions** with the authenticated server Supabase client (RLS-enforced) — no extra REST routes needed. Actions: `confirmBooking`, `rescheduleBooking`, `cancelBooking`, `completeBooking`.

**Booking flow (sequence):**
1. `BookingForm` → `POST /api/bookings`.
2. Server validates, recomputes deposit from `lib/services.ts`, inserts `bookings` row, emails the salon.
3. If `deposit_required` → create Stripe Checkout Session ($20 CAD, `client_reference_id = bookingId`), return `checkoutUrl` → client redirects to Stripe → on success Stripe redirects to `/book/success`; the **webhook** marks `deposit_status='paid'` and emails the customer.
4. If no deposit → email the customer immediately, client routes to `/book/success`.
5. Salon confirms/reschedules in `/admin`.

---

## 6. Environment Variables (`.env.local`)
```
# Resend
RESEND_API_KEY=
RESEND_FROM="Harav Salon & Spa <bookings@haravsalonspa.ca>"
BOOKINGS_NOTIFY_EMAIL=contact@haravsalonspa.ca   # where booking/contact alerts go

# Stripe (deposit)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Supabase (bookings + admin auth)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # server only — never exposed to client
ADMIN_EMAILS=                       # comma-sep allowlist for admin gate (e.g. khushi@…)

# Site
NEXT_PUBLIC_SITE_URL=https://haravsalonspa.ca
```
- `.env.example` mirrors this with empty values. Confirm `.env.local` is gitignored (it is by default in Next).

---

## 7. Third-Party Integrations

**Supabase** — bookings + newsletter storage, admin auth.
- Setup: create project; run SQL for `bookings` + `subscribers` + RLS; create Khushi's auth user; copy URL + anon + service-role keys. Config in `lib/supabase/{server,client,middleware}.ts` (`@supabase/ssr`).

**Stripe** — the $20 non-refundable deposit.
- Setup: account in CAD; use **dynamic Checkout Session** ($20.00 CAD line item, name "Appointment deposit — applied to your service") — no preset Product needed; add webhook endpoint `https://haravsalonspa.ca/api/stripe/webhook` → `checkout.session.completed`; copy publishable/secret/webhook keys. Config in `lib/stripe.ts`. Test mode first.

**Resend** — transactional email.
- Setup: verify domain `haravsalonspa.ca` (DKIM/SPF DNS); sender `bookings@haravsalonspa.ca`. Emails: (1) customer booking confirmation, (2) salon booking notification, (3) contact-form forward. Templates in `emails/` (React Email optional). Config in `lib/resend.ts`.

**Framer Motion** — section reveals + nav/menu transitions (the `Reveal` wrapper, mobile sheet). **GSAP** — only if a scroll-timeline moment is wanted (hero deco / parallax); optional, add only where it earns its place. Honor reduced-motion.

**Fonts** — `next/font/google`: **Marcellus** (400) → `--font-display`; **Jost** (300–600) → `--font-body`; set `font-synthesis: none`. (Cormorant Garamond italic available if editorial italic is wanted later — not needed for Phase 1.)

**Maps** — static Google Maps embed iframe for `/contact` (no API key).

---

## 8. Asset Requirements (client/build)
- [x] **Logo** — `assets/harav-logo.png` (have). Generate **favicon** set + `app/icon.png` from it.
- [ ] **OG image** 1200×630 — design from brand (logo on espresso/gold). *(build can produce.)*
- [ ] **Photography — curated luxury stock** (warm, low-lit, gold-rich, women's salon/spa), optimised (AVIF/WebP via `next/image`):
  - Hero (1), Brand-intro (1), Proof bento (3: treatment/massage/facial), Service categories (6: facial, sugaring, waxing, lash & brow, nails, massage), Journal (3), About/space (1–2). ≈ **16–18 images**.
- [ ] **Khushi headshot** — for About "team" (optional at launch; warm, on-brand). `[client]`
- [x] **Copy** — `copy.md` (have). **Menu/prices** — `Salon_Services_Pricelist.xlsx` (have) → port to `lib/services.ts`.

---

## 9. Build Order
1. `create-next-app` (TS, App Router, Tailwind, ESLint) + deps (`@supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js resend framer-motion zod react-hook-form @hookform/resolvers`).
2. Init shadcn/ui; add the components in §3.
3. `globals.css` — port `colors_and_type.css` tokens into `:root` + Tailwind theme; wire `next/font` variables; base typography (Marcellus/Jost, `font-synthesis:none`).
4. `lib/services.ts` (typed menu + deposit flags from the xlsx) and `lib/journal` (MDX loader) — shared data first.
5. Layout: root layout, Header, MobileNav, Footer, Toaster, brand primitives (Eyebrow, Button variants, BrandLockup, Reveal).
6. Shared section components (Hero, BrandIntro, ProofBento, ServicesMenu, ExperienceSteps, JournalPreview, CtaBanner).
7. Pages (cheap → home last): `not-found` → legal → `contact` → `about` → `treatments` → `journal` (+ `[slug]`) → **`home`**.
8. **Backend (agent 05, parallelisable):** Supabase schema + RLS + admin user; `lib/{supabase,stripe,resend}.ts`; API routes (`/api/bookings`, `/api/stripe/webhook`, `/api/contact`, `/api/newsletter`); server actions for admin.
9. Booking flow end-to-end (form → deposit → webhook → emails) and `/admin` (middleware, login, bookings table, status actions).
10. Wire all forms to backend; toasts; success/error copy from `copy.md`.
11. SEO infra (agent 06): metadata, `sitemap.ts`, `robots.ts` (disallow `/admin`), JSON-LD (`BeautySalon` + `Service`), OG image.
12. Review (07) → QA/Playwright (08) → deploy to Vercel.

> Frontend (agent 04) can start at step 5 while Backend (agent 05) does step 8 in parallel — they meet at step 10.

---

## 10. Notes & Decisions
- **Static menu, not a DB table.** The service list/prices are fixed business content (~55 rows) needed at build for SEO + the < 1.5s hero. A typed `lib/services.ts` is simpler, faster, and fully under Nishant's content control; a `services` table would be over-engineering. The booking API re-reads deposit/price from this file server-side (never trusts the client).
- **Booking = preferred-slot request + deposit, not live availability.** One esthetician (Khushi) and no scheduling backend → the form offers time options generated from business hours (closed: outside Mon–Fri 10–7 / Sat 10–6 / Sun 11–6), takes the deposit, stores the booking, and the salon confirms/reschedules in `/admin`. A lightweight same-slot conflict check (query existing bookings) can prevent obvious clashes. Real-time availability is a later upgrade. *(Documented so Frontend/Backend don't build a full scheduling engine.)*
- **Deposit is non-refundable** and computed server-side; the `$20` set is enumerated in `discovery.md` §5 / `lib/services.ts`. Stripe Checkout (hosted) keeps PCI scope minimal.
- **Admin, not customer, auth.** The only login is staff. Customers are always guest. Middleware + `ADMIN_EMAILS` gate `/admin`; `robots`/meta `noindex` it.
- **No fabricated proof.** ProofBento renders honest signals; the rating pill/review count component accepts real data and **renders nothing when empty** (no placeholder stars shipped).
- **Hero performance.** Home is a Server Component; the hero image uses `next/image` with `priority`, AVIF/WebP, and a warm blur placeholder. Animations are isolated in the Client `Reveal` wrapper so they don't block render. Respect `prefers-reduced-motion`.
- **Phase 2 seam.** Adding the shop later = new `app/shop/*` routes, `products`/`orders` tables, an Orders tab in the existing `/admin`, and "Shop" in the nav — no rework of Phase 1.
