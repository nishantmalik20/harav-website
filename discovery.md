# Discovery Report — Harav Salon & Spa
*Generated: 2026-06-02 · Agent 01 (Discovery)*
*Revised: 2026-06-02 — rebuilt on the real service price list + client-supplied local competitors.*

> Market, competitor, audience, and content-strategy research for the Harav
> build. The strategic foundation every downstream agent (Copywriting,
> Architecture, Frontend, Backend, SEO) builds on. No code, no copy — direction.

---

## 1. Client Snapshot

- **Business:** Harav Salon & Spa — a women's beauty salon & spa with an on-site product boutique.
- **Clientele:** 100% women.
- **Location:** **Unit #2 – 1172 Pembina Hwy, Winnipeg, MB, R3T 2A4** — the Pembina Highway corridor in **Fort Garry / South Winnipeg**, near the University of Manitoba.
- **Phone:** 431-570-1420 · **Email:** contact@haravsalonspa.ca · **Live domain:** https://haravsalonspa.ca · **Currency:** CAD.
- **Project goal (synthesised):** A high-end, editorial marketing site for a women's multi-service esthetics destination with a frictionless **in-house** booking flow (custom-built, no third-party widget) and a private **staff admin/back-office** to manage bookings. **Phase 1 = marketing site + booking + admin dashboard.** The product **boutique** (Supabase + Stripe) is deferred to Phase 2. **No _customer_ accounts** — booking and shop checkout are guest flows; the only login is the **staff admin**. Brand: warm espresso + brushed gold, candle-lit, *"an hour kept in gold."*

### Real service menu *(from `Salon_Services_Pricelist.xlsx` — the source of truth for services & prices)*
| Category | Count | CAD price range | Signature / notable |
|---|---|---|---|
| **Facials** | 10 | $50–$185 (sale from $49.99) | Anti-Aging, Brightening, Turmeric Glow, Collagen Boost + Lymphatic Drainage, **Hydradermabrasion ($120)**, **Carbon Laser Facial ($150)** |
| **Body Sugaring** | 14 | ~$18–$72 | Brazilian ($49.95), Bikini/Bikini+, Full Legs, **Vagacial**, Sweet Cheeks (bump facial) |
| **Waxing / Threading** | 14 | $6–$150 | Brazilian ($40), Full-body packages ($120–$140 sale) |
| **Lash & Brow Bar** | 10 | $24–$85 | Lash Lift, Sweet YY Lash Extensions ($85), tints & shaping |
| **Nails** | 3 | $45–$65 | Gel Nails, Gel Manicure, Fills |
| **Massage** | 2 | $30 / $60 | 30- & 60-min Relaxation *(prices low — confirm)* |

> **Important — menu scope is locked:** the business provides **only** the services in the price list. **No hair styling, no makeup, no laser hair removal, no spray tanning, no men's services** (all confirmed by the client). The homepage prototype's **Facial / Hair Styling / Makeup** cards and the footer "Hair Styling / Makeup" list are placeholders that **must be re-mapped** to Harav's real pillars: **Facials · Body Sugaring · Waxing/Threading · Lash & Brow · Nails · Massage** (see §5).
>
> **Positioning nuance:** prices are **accessible / mid-market**, not ultra-premium. Harav should sell *experience, calm, and a beautiful women-only space* — luxury *feel* at fair prices — not price exclusivity.

> **Differentiator in one line:** The Winnipeg market is fragmented into **single-service studios** (sugaring-only, lash-only, nails-only) and a few **dated multi-service shops**. **No one is the single, beautifully-branded, women-only destination that does facials + sugaring + waxing + lash/brow + nails + massage *and* sells the products *and* makes booking effortless.** That whole-experience white space — plus the warm-gilded look no competitor owns — is Harav's to take.

---

## 2. Target Keywords

Grounded in live Winnipeg SERPs, Yelp/Fresha/Booksy category pages, and competitor sites. Re-centred on Harav's **real** services (the first draft over-indexed on hair-colour/balayage, which Harav does not offer).

### 2.1 Primary Keywords (high intent — what Harav directly sells)
- `body sugaring Winnipeg` — transactional, the high-frequency core
- `Brazilian sugaring Winnipeg` — transactional, signature/high-value
- `waxing Winnipeg` / `Brazilian wax Winnipeg` — transactional
- `facial Winnipeg` — transactional, high-value
- `lash extensions Winnipeg` — transactional
- `lash lift Winnipeg` — transactional
- `eyebrow / brow tint Winnipeg` — transactional
- `gel manicure Winnipeg` / `gel nails Winnipeg` — transactional
- `relaxation massage Winnipeg` — transactional
- `women's spa Winnipeg` / `beauty salon Winnipeg` — commercial, brand lane
- `esthetics Winnipeg` / `skin care Winnipeg` — commercial
- `day spa Winnipeg` — broad commercial

### 2.2 Long-Tail Keywords (specific intent / questions)
- `best body sugaring in Winnipeg` — comparison/research
- `painless / less painful hair removal Winnipeg` — pain-anxiety intent
- `vegan / organic sugaring Winnipeg` — values-led (competitors lead here)
- `Brazilian sugaring vs waxing Winnipeg` — education → conversion
- `first Brazilian sugaring what to expect` — top-funnel (Journal)
- `full body sugaring Winnipeg` — high-ticket
- `vagacial Winnipeg` — niche, low competition
- `anti aging facial Winnipeg` — concern-driven, premium
- `acne / anti-acne facial Winnipeg` — concern-driven
- `brightening facial Winnipeg`
- `hydradermabrasion / hydrafacial Winnipeg` — branded treatment
- `carbon laser facial Winnipeg` — branded treatment
- `collagen / lymphatic drainage facial Winnipeg`
- `lash lift and tint Winnipeg`
- `volume lash extensions Winnipeg`
- `brow lamination Winnipeg`
- `gel manicure near me Winnipeg`
- `spa day / spa packages Winnipeg women`
- `spa gift card Winnipeg`
- `self-care / women only studio Winnipeg`

### 2.3 Local Intent Keywords (geo & "near me")
- `body sugaring near me`, `waxing near me`, `lash extensions near me`, `facial near me`, `nail salon near me` (served by GBP + local schema)
- **Lead with Harav's location — the Pembina Hwy / Fort Garry corridor:** `body sugaring Fort Garry`, `waxing Pembina Highway`, `facial Fort Garry Winnipeg`, `lash extensions near University of Manitoba`, `esthetics South Winnipeg`, `Brazilian sugaring Fort Richmond / Waverley`, `nail salon Pembina`.
- Secondary nearby pulls: `St. Vital`, `Fort Richmond`, `Waverley West`, `Bridgwater`, `Whyte Ridge`, `Linden Woods`.
- **Audience note:** the U of M / Pembina corridor skews younger (students + staff) — a strong fit for the high-frequency sugaring/lash/nail maintenance persona. *(Crown Nails & Spa sits ~½ km up the same road — direct local-SERP rival; see §3.)*

---

## 3. Competitor Analysis

Re-built around the **real, local, direct** competitors (client-supplied + additional research). These are women's sugaring/esthetics studios — Harav's actual rivals — plus one premium benchmark. Every entry is a real, verifiable business.

### Tier A — Direct competitors (overlapping service mix)

#### 1. Bare Body Sugaring — *the sugaring brand leader*
- **URL:** https://www.barebodysugar.com · **"Go bare. Stay bare."**
- **Services:** **Sugaring only** — "not a side service, it's our only service." Brazilian specialty, vegan/organic sugar.
- **Locations (5):** Bridgwater (345 North Town Rd), Henderson (1128 Henderson Hwy), **River Heights (580 Academy Rd)**, Windsor Park (36 Barberry Rd), + Portage la Prairie.
- **Pages:** Sugaring · Services & Pricing · Locations · Blog · Team · Shop · FAQ · BIPOC Resources · Land Acknowledgement. Booking: yes. Retail: yes (rasugarco.com/shop + Third+Bird).
- **Aesthetic:** Modern minimalist, warm, body-positive. Award-winning, strong brand.
- **Gap Harav exploits:** Single-service. A guest still needs *another* place for facials, lashes, nails, massage. Harav is the one-stop, women-only destination — and matches the brand polish.

#### 2. J'Adore Body Sugaring — *the multi-location hair-removal player*
- **URL:** https://www.jadorebodysugaring.com · **"Feel your best self, naturally."**
- **Services:** Sugaring (Brazilian/bikini), **laser hair removal**, NUDA vegan spray tanning.
- **Locations (4):** Transcona (Regent Ave), North Main (Main St), St. Vital (Meadowood Dr), Linden Ridge (Kenaston Blvd).
- **Pages:** Home · Sugaring · Laser · Spray Tanning · Before & After Care · FAQ · Shop · Book With Us · Reviews · Contact. Booking: yes. Retail: yes (Square).
- **Aesthetic:** Modern, earth-tone, plant motifs, diverse/inclusive.
- **Gap Harav exploits:** Hair-removal-focused (no facials/lash/nails/massage breadth). Harav is broader and more elevated. *(Note: J'Adore offers laser + spray tan; confirm whether Harav wants to compete there — see §8.)*

#### 3. Sweet Secrets Body Sugaring & More — *the closest service-mix analog*
- **URL:** https://winnipegbodysugaring.me · **"Winnipeg's #1 Body Sugaring Salon & Beauty Bar" (~30 yrs)**
- **Services:** Sugaring + **lash & brow + custom facials + massage + body + men's** — almost exactly Harav's menu.
- **Locations (2):** Ness Ave (A-1771 Ness), Marion St (169 Marion).
- **Pages:** service pages + blog + shop + booking (Vagaro). Retail: yes. Price: mid-range ($65–$150 bundles, "Buy 3 Get 1 Free").
- **Aesthetic:** Warm, inviting minimalism — but functional/established, not editorial-luxury.
- **Gap Harav exploits:** Same services, far higher aesthetic bar. Harav wins on **brand, feel, and a modern on-domain shop + booking** vs. a Vagaro-driven, dated experience. *(Naming overlap to note: their "Sweet" branding vs. Harav menu items "Sweet Lash"/"Sweet Cheeks" — coincidental but worth differentiating.)*

#### 4. Crown Nails & Spa — *the nails-led full-service shop*
- **URL:** https://crownnailsandspa.ca · **"Nail Care to Cherish."**
- **Services:** Mani/pedi + lash + facials + waxing + **body sugaring** + chemical peels + electrofacial + massage + body piercing.
- **Location:** 1544 Pembina Hwy (South Winnipeg / Fort Garry). Booking: Square. Retail: minimal.
- **Aesthetic:** Modern, warm, "luxury pampering" — but generic salon, not a distinctive brand.
- **Gap Harav exploits:** Broad but undifferentiated and nails-first. Harav's cohesive luxury brand + women-only focus stand apart. **⚠ Closest geographic rival** — same Pembina Hwy corridor (Crown at 1544, **Harav at 1172**, ~½ km apart). The immediate local-SERP battle is won here on brand + booking experience.

#### 5. Sugaring Sisters — *the boutique solo studio*
- **URL:** https://www.sugaringsisters.ca (sparse site)
- **Services:** Body sugaring. Certified sugarist, 6+ yrs. **Location:** ~733 McPhillips.
- **Aesthetic:** Small, personal, IG-driven (instagram.com/sugaringsisters).
- **Gap Harav exploits:** Tiny footprint, single service, thin web presence. Easy to out-class on site, range, and booking.

### Tier B — Premium benchmark (aspirational, not direct)

#### 6. Ten Spa — *the luxury reference*
- **URL:** https://www.tenspa.ca — world-class day spa + Turkish Hamam, Fort Garry Hotel. Does waxing/sugaring as add-ons, plus massage/facials/packages, online booking, retail (TenSkin Rx).
- **Role for Harav:** the quality/experience bar to aim at, *not* a head-to-head rival (hotel destination, not women-only, premium pricing). Borrow the polish; undercut on warmth, accessibility, and a women-only neighbourhood feel.

### Broader local landscape (also competing for the same searches)
- **Advanced Body Sugaring & Aesthetics by Maria** — 837 Corydon Ave (sugaring + facial/body aesthetics + makeup).
- **sugar+ body sugaring** — 1031 McGregor St · **Nude Sugar Bar** (all-natural, 7 yrs) · **Bloom Esthetics Inc** (Winnipeg-made vegan sugar) · **LA Body Sugaring** · **The Sugar Studio**.
- **Lash/brow/facial bars:** The Face Bar (downtown), Lavilash, The Lash Lounge, Fabulash, BB Artistry, Eye Candy, Made For You Beauty, By Niki (PMU), The Magic Room Beauty Bar & Med Spa.
- **Advanced-skin/medspa (for the facial side):** You Glow Aesthetics, Skin Suite, Urban Retreat Derma Spa, Simply Radiant.

**Cross-competitor takeaways**
1. **The market is fragmented by service.** Sugaring specialists, lash bars, nail spas, and medspas mostly each do one thing — Harav's breadth under one brand is the structural advantage.
2. **Everyone rents their booking + storefront** (Vagaro, Square, Booksy, Fresha, Setmore). Harav's in-house booking + on-domain shop is more cohesive and on-brand.
3. **"Natural / vegan / body-positive" is the common message; "warm gilded luxury" is unclaimed.** Harav's aesthetic is instantly distinct.

---

## 4. Audience Personas

### Persona 1: "The Maintenance Regular" — the loyal core
- **Who:** Woman, 22–40. Books sugaring/waxing every 3–5 weeks, lash fills every 2–3, gel nails ~monthly. Wants a standing routine.
- **Wants:** Speed, consistency, hygiene, a tech she trusts, an easy rebook, a comfortable/non-judgmental space for intimate services.
- **Hesitations:** Pain/irritation; awkwardness of Brazilian/intimate services; trusting a new place; scheduling friction.
- **Convincers:** Real reviews, certified/experienced estheticians, frictionless online booking with an easy rebook, a warm women-only vibe, package/loyalty value.

### Persona 2: "The Results-Seeker" — the high-value guest
- **Who:** Woman, 30–55. Books advanced facials (anti-aging, brightening, hydradermabrasion, carbon laser, anti-acne); buys take-home skincare.
- **Wants:** Visible results, genuine expertise, calm luxury, fair pricing vs. a clinical medspa.
- **Hesitations:** "Will it actually work?"; is the esthetician skilled?; medspa vs. salon.
- **Convincers:** Treatment education + honest detail, credible expertise framing, the boutique products as at-home continuation, series/package pricing, the elevated environment.

### Persona 3: "The Occasion & Gifter"
- **Who:** Bride / event guest, or someone buying gift cards & products. 25–45.
- **Wants:** To look flawless for an event (lashes, brows, facial prep, nails) or to gift an experience/products easily.
- **Hesitations:** Availability before the date; reliability; unclear packages.
- **Convincers:** Clear packages, gift cards, the on-domain boutique, effortless booking, a polished brand that signals dependability.

---

## 5. Content Map (Pages to Build)

**Phase 1 = launch-critical; Phase 2 = deferred.** Phase 1 is intentionally lean — the marketing site + the in-house booking flow (where Harav's competitive edge lives). The shop and portal come later. No bloat.

### Phase 1 — Launch (marketing site + booking)

**Home (`/`)** — brand-first conversion; routes to Book / Treatments / Shop. *(Re-map the three featured service cards from Facial/Hair/Makeup → real pillars, e.g. **Facials · Body Sugaring · Lash & Brow**; fix footer category list to real categories.)* Keywords: `women's spa Winnipeg`, `body sugaring Winnipeg`, `facial Winnipeg`. Sections: Hero · Brand intro · Social-proof bento · Services menu · The Experience · Journal preview · CTA · Footer.

**Treatments (`/treatments`)** — the full real menu; the page that converts service searches. Categories: **Facials · Body Sugaring · Waxing & Threading · Lash & Brow · Nails · Massage**, each with service, duration, CAD price (regular + sale). Per-service "Reserve." Keywords: every service term in §2. Consider per-category landing sections/anchors (or sub-pages) for SEO depth.

**About (`/about`)** — story, philosophy ("an hour kept in gold"), the space (gallery), the estheticians. Builds trust for intimate services. Keywords: brand + `women only spa Winnipeg`.

**Book / Reserve (`/book`)** — **the priority flow, in-house.** Service select → date/esthetician (or request) → details → **$20 Stripe deposit for deposit-required services** (others book deposit-free) → confirmation (Resend notification). Mobile-first, minimal steps. Writes the booking to Supabase. Keywords: `book body sugaring / facial Winnipeg`, `online booking`.

> **$20 deposit applies to (per the price list):** **all Facials**; **Sugaring** – Full Legs; **Waxing** – Full Body with Brazilian & Full Body without Brazilian; **Massage** – 60-min Relaxation; **Lash & Brow** – Sweet YY Lash Extensions, Sweet Lash Classic, Sweet Lash Lift + Tint, Sweet Lash Lift; **Nails** – Gel Nails & Nail Fill. All other services book with **no deposit**. *(→ Stripe is needed at launch for deposits; product checkout remains Phase 2.)*

**Admin / Back-office (`/admin`)** — *private, auth-protected, `noindex`.* The salon's operational dashboard — the back-office the client requested (not a customer portal). **Phase 1:** all **appointments** (upcoming + past) showing customer **name, email, phone, service(s), booked time slot**, and notes; manage status (confirm · reschedule · cancel · complete · no-show). **Phase 2:** an **Orders** view (items, customer, total, fulfilment). Staff login only (Supabase Auth, admin role); customer PII → admin-only, protect with row-level security.

**Journal (`/journal`)** + **posts (`/journal/[slug]`)** — long-tail SEO + brand voice. Target real queries: "sugaring vs waxing," "first Brazilian — what to expect," "how to prep for a facial," "extend your lash fills." Keywords: top-funnel education.

**Contact / Visit (`/contact`)** — location, hours, map, NAP, contact form (Resend). Local-SEO anchor. Keywords: `[service] near me`, neighbourhood + Winnipeg.

**404** — on-brand styled not-found. **Legal/policy** (`/terms`, `/returns`, `/privacy`, `/cookies`) — light pages (footer links + the shop takes payments).

### Phase 2 — Deferred (build after launch)
**Shop / Boutique (`/shop`) + product detail (`/shop/[slug]`)** — on-domain retail (Supabase + Stripe), **guest checkout** (no customer login). *Deferred at client's request:* product data (names, images, descriptions, prices) will be **migrated from another site the business has permission to use**, then seeded into Supabase. Editorial grid, category rail, concern filters, cart drawer, product pages, Stripe Checkout. Orders are recorded for the business (Supabase/Stripe + a Resend notification) — an ops concern, not a customer account.
**Gift Cards (`/gift-cards`)** — recurring/gifting revenue.

> **No _customer_ portal — but yes, a _staff_ admin dashboard.** Confirmed with the client: customers never log in (booking + shop checkout are **guest flows**), so the design kit's customer portal (`ui_kits/portal/`) won't be built. The business **does** get a private **admin/back-office** (`/admin`) to view and manage bookings (and later orders) — staff login only (Supabase Auth). Customer-facing stays guest; the only account is the admin's.

---

## 6. Local SEO Notes

- **Google Business Profile:** assume **needs creation/claiming** (new domain). Highest-leverage local asset. Primary category `Beauty salon` (or `Waxing hair removal service`); secondaries `Facial spa`, `Nail salon`, `Massage`, `Eyelash service`. Service area: **Fort Garry / South Winnipeg / Pembina Hwy / U of M**. Add real photos, hours, booking link. Also Bing Places + Apple Business Connect.
- **Listings/aggregators competitors rank on — get on these:** Google Business Profile, Yelp (Winnipeg "Sugaring" top-10), **Fresha**, **Booksy**, **Vagaro**, Tourism Winnipeg, plus wedding directories for the bridal/occasion line. (Note: these aggregators are competitors *and* channels — list, but drive bookings to the in-house flow.)
- **NAP — locked:** **Harav Salon & Spa · Unit #2 – 1172 Pembina Hwy, Winnipeg, MB R3T 2A4 · 431-570-1420 · contact@haravsalonspa.ca.** Drop the prototype placeholders (`+8801303785216`, `hello@haravsalon.com`). Use this NAP identically everywhere (footer, schema, GBP).
- **Schema priorities:** `BeautySalon` / `DaySpa` (LocalBusiness) with NAP, geo, hours, `sameAs` socials → Home/Contact. `Service` per treatment (with `offers`/price in CAD). `Product` + `Offer` for shop SKUs. `BlogPosting` for Journal. `BreadcrumbList` site-wide. `Organization` + logo.

---

## 7. Strategic Recommendations

**1. Own "the one women-only destination that does it all — beautifully."**
The field is fragmented (sugaring-only, lash-only, nails-only) or dated-multi-service. Harav uniquely combines facials (incl. advanced skin), sugaring/waxing, lash & brow, nails, and massage under one warm, gilded, women-only brand with a boutique. Lead with that breadth + the aesthetic no competitor has. Push design fidelity hard — it *is* the moat. Keep copy on *experience/feel*, not price (the menu is accessibly priced).

**2. Sugaring/lash/nails = the high-frequency hook; facials + boutique = the high-value engine.**
Recurring maintenance drives loyalty and rebooking; advanced facials and take-home products drive margin. Make rebooking effortless **inside the booking flow itself** (smart defaults, a rebook link in the confirmation email) — no account required — and cross-sell facials/products to maintenance regulars.

**3. Win local search via service + neighbourhood + comparison content.**
Competitors rank through Vagaro/Booksy/Fresha/Yelp and GBP. Harav needs a strong GBP, consistent NAP, dedicated per-service content (sugaring, Brazilian, each facial, lash, nails), neighbourhood targeting around its real location, and a Journal answering genuine questions ("sugaring vs waxing," "first Brazilian," "facial prep"). That's compounding organic ground single-service competitors can't hold — and it feeds the in-house booking flow instead of an aggregator.

---

## 8. Open Questions & Blockers

**Resolved**
- ✅ **Booking model:** in-house, custom-built flow — no third-party widget. (Resend notifications; optional Stripe deposit TBD.)
- ✅ **Service menu & prices:** `Salon_Services_Pricelist.xlsx` is the source of truth (CAD). For blank/uncertain figures (Anti-Acne Facial; the 30-/60-min massage) use **placeholder prices** for now — the client confirms on review.
- ✅ **Menu scope:** the price-list services are the **complete** offering — no hair styling, makeup, laser hair removal, spray tan, or men's services. Re-map the homepage Facial/Hair/Makeup cards to real pillars.
- ✅ **Address:** Unit #2 – 1172 Pembina Hwy, Winnipeg, MB R3T 2A4 (Fort Garry / Pembina corridor, near U of M).
- ✅ **Products / boutique:** **deferred to Phase 2** — product data will be migrated from another permitted source, then seeded into Supabase. Not in the launch build (so no on-domain shop or Stripe product checkout at launch).
- ✅ **No _customer_ accounts, but a _staff_ admin dashboard:** customers use **guest flows** (booking + shop checkout); the kit's customer portal won't be built. The client **does** want a private **admin/back-office** (`/admin`) to manage all bookings — name, contact, service, time slot, status — plus orders in Phase 2. Staff login via Supabase Auth. → **Supabase is needed at launch** (bookings store + admin auth), even with products deferred.
- ✅ **Phone:** 431-570-1420 — NAP now fully locked.
- ✅ **Photography:** no real photos yet (new business). Use **curated luxury stock** matching the warm, gilded, low-lit theme (women's salon/spa, facials, sugaring/wax, lashes, nails; warm grade per design spec). Swap for a real shoot later. Hero still must hit **< 1.5s** → compress/optimise.
- ✅ **Booking deposit:** **$20 Stripe deposit** on a defined subset of services (listed in §5). → **Stripe needed at launch** for deposits; product checkout stays Phase 2.

**Still open (does not block Copywriting)**
1. **Team & social proof** — real esthetician names/bios + permission for real reviews. Until provided, copy must use **honest, non-fabricated proof** (no invented `100% / 4.9★ / 12k` figures).

---

## Sources
- Client-supplied competitors: [Bare Body Sugaring](https://www.barebodysugar.com/) · [J'Adore Body Sugaring](https://www.jadorebodysugaring.com/) · [Sweet Secrets (winnipegbodysugaring.me)](https://winnipegbodysugaring.me/) · [Crown Nails & Spa](https://crownnailsandspa.ca/) · [Sugaring Sisters](https://www.sugaringsisters.ca/) · [Ten Spa](https://www.tenspa.ca/)
- Local landscape: [Advanced Body Sugaring & Aesthetics by Maria](https://aestheticsbymaria.com/) · [Bloom Esthetics](https://www.bloomestheticsinc.ca/services-6) · [sugar+ (Fresha)](https://www.fresha.com/lvp/sugar-body-sugaring-mcgregor-street-winnipeg-9QXPve) · [Ten Spa — waxing & sugaring](https://www.tenspa.ca/add-on-services/waxing)
- Lash/brow/facial bars: [The Face Bar](https://thefacebar.ca/lash-brow) · [Lavilash](https://lavilashbeautylounge.setmore.com/) · [The Lash Lounge](https://www.thelashloungewpg.com/) · [Made For You Beauty](https://www.madeforyoubeauty.com/) · [Eye Candy](https://winnipeglashes.com/) · [The Magic Room Beauty Bar & Med Spa](https://www.magicroomspa.com/beauty-bar)
- Directories/aggregators: [Yelp — Sugaring in Winnipeg](https://www.yelp.ca/search?find_desc=Sugaring&find_loc=Winnipeg%2C+MB) · [Fresha — sugaring Winnipeg](https://www.fresha.com/lp/en/tt/sugaring/in/ca-winnipeg) · [Best Waxing Salons in Winnipeg](https://winnipegbest.ca/waxing-salon/best-waxing-salons-in-winnipeg/)
- Source of truth for services & prices: `Salon_Services_Pricelist.xlsx` (project root).
