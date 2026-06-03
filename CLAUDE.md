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

# Stripe (if used)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Supabase (if used)
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
- The store has around 50 products — all product data is seeded in Supabase
- The 100% customer base for this business are women.
- This business is looking for a very smooth booking form experience.
- Homepage hero must load in under 1.5s — prioritise performance here above all

**Rules for this project:**
- No hardcoded rules.

---

## Current Status

> Update this section at the end of each working session so the next session
> picks up exactly where you left off.

**Last updated:** 2026-06-02
**Phase:** Frontend + Backend build complete (build verified green on NTFS)

### Completed
- [x] Design spec received and reviewed (homepage + shop & portal UI kits)
- [x] Discovery agent run → `discovery.md` (keywords, competitors, personas, content map, local SEO)
- [x] Discovery revised with the real service price list (`Salon_Services_Pricelist.xlsx`) + real local competitors (sugaring/esthetics studios)
- [x] Copywriting agent run → `copy.md` (all Phase 1 pages, site-wide copy, forms, admin UI strings)
- [x] Architecture agent run → `architecture.md` (routes, components, Supabase schema + RLS, Stripe deposit flow, Resend, build order)
- [x] Project scaffolded (Next.js 15 + TS + Tailwind v4; hand-rolled shadcn-style primitives — no interactive CLIs)
- [x] Frontend build → all Phase 1 pages, sections, layout, booking UI, admin UI (code)
- [x] Backend build → Supabase clients + RLS migration, Stripe deposit flow, Resend emails, API routes, server actions
- [x] `npm run build` verified GREEN (24 routes) on NTFS — see exFAT blocker below
- [ ] Environment variables configured (`.env.example` created; real keys pending)

### In Progress
- Build complete & verified. Awaiting env provisioning + walkthrough before the SEO agent.

### Known facts (locked this session)
- Real menu = Facials · Body Sugaring · Waxing/Threading · Lash & Brow · Nails · Massage. This is the COMPLETE offering — no hair styling, makeup, laser hair removal, spray tan, or men's. Homepage Facial/Hair/Makeup cards are placeholders → re-map. Prices CAD per the xlsx.
- Location = Unit #2 – 1172 Pembina Hwy, Winnipeg, MB R3T 2A4 (Fort Garry / Pembina corridor, near U of M). Phone = 431-570-1420.
- Photography = none yet (new business) → use curated LUXURY STOCK matching the warm/gilded/low-lit theme; swap for a real shoot later. Hero < 1.5s.
- Deposit = $20 Stripe deposit on a subset: all Facials; Sugaring Full Legs; Waxing Full Body ±Brazilian; 60-min Massage; Lashes (Sweet YY, Classic, Lift+Tint, Sweet Lash Lift); Nails (Gel Nails, Nail Fill). Deposit is NON-REFUNDABLE. → Stripe needed at launch for deposits; product checkout still P2.
- Booking = custom, in-house build (no third-party widget).
- Phasing: Phase 1 = marketing site + booking + STAFF ADMIN dashboard (`/admin`). Phase 2 (deferred) = product boutique (Supabase/Stripe; product data migrated later) + Orders view in admin.
- Accounts: NO customer accounts (guest booking + guest checkout). Only login = staff admin (Supabase Auth, admin role) → Supabase needed at launch for bookings store + admin auth.
- Admin shows: all upcoming/past appointments with customer name, email, phone, service(s), booked time slot, notes; manage status (confirm/reschedule/cancel/complete/no-show). Customer PII → admin-only, protect with RLS.
- Hours = Mon–Fri 10am–7pm, Sat 10am–6pm, Sun 11am–6pm. Parking = back lane behind building, accessible.
- Owner & sole esthetician = Khushi (5+ yrs experience) — bio in copy.md.
- Reviews = none yet; NO fake reviews on the live site (Competition Act/FTC risk). Use honest signals + hide rating pill until real GBP reviews exist.
- Positioning = accessible-priced, women-only, multi-service destination; sell experience/feel, not price.

### Up Next
1. ⚠ Move/clone the project to an NTFS drive (D: is exFAT → `next build` fails). Dev + build from e.g. C:\dev\harav-website.
2. Provision env: create Supabase project + run `supabase/migrations/0001_init.sql` + create Khushi's admin user; add Stripe keys + webhook; verify Resend domain; fill `.env.local` from `.env.example`.
3. Run **06-seo-geo-agent** (metadata/sitemap/robots/JSON-LD) → **07-reviewer** → **08-qa** → deploy to Vercel.

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
- ⚠ INFRA: D: is exFAT → `next build` fails (readlink EISDIR, both webpack & turbopack). Build/deploy from an NTFS path (e.g. C:). Code verified green on NTFS.
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
