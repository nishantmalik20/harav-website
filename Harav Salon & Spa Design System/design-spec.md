# Harav Salon & Spa — Design Spec (Homepage)

> **This file is the source of truth for the final homepage.** Where it conflicts
> with `README.md`, `colors_and_type.css`, or anything under `ui_kits/`, **this
> file wins.** See "Conflicts & precedence" below before writing any code.

---

## 0. The system at a glance — READ FIRST

Harav runs **one** visual system: **warm espresso + brushed gold, with a single
burnt-terracotta accent.** Refined serif headlines (**Marcellus**) over a clean
sans (**Jost**). No green, no Bodoni — an earlier exploration used those and has
been fully retired.

Everything is aligned and token-driven:

- `colors_and_type.css` — the live token file; **its values are the warm system**
  (legacy names like `--onyx`/`--emerald` are kept as aliases but remapped to warm).
  You can read values from it directly; they match §2 below.
- `README.md` — brand voice + visual foundations, warm system.
- `Harav Salon & Spa.html` — the reference build (flagship homepage / marketing site); styles in `harav-home.css`.
- `ui_kits/shop|portal/` — other surfaces; they read the same tokens, so
  they inherit the warm system automatically.

This spec documents the **homepage** in implementation detail. For other surfaces,
follow the same tokens + the patterns in their `ui_kits/` folders.

---

## 1. Overview

A single-page marketing **homepage** for Harav Salon & Spa, a luxury women's
salon & spa. The page is a long editorial scroll: hero → brand intro → social-proof
bento → services menu → "the experience" steps → journal/blog → closing CTA → footer.

**Fidelity: high.** Colors, type, spacing, and copy below are final. Rebuild the
UI pixel-accurately in the target codebase's framework, using its conventions
(component structure, CSS approach, image handling). The bundled `.html` is a
**design reference**, not code to ship verbatim.

**Canvas:** designed at a fixed **1600px** content width, centered, with a warm
golden "frame" (16px padding) around a rounded page card. In a real responsive
build you will likely drop the fixed-frame device and let sections go full-width
with a max content width of ~1440–1600px; keep the frame only if a framed art
piece is explicitly wanted.

---

## 2. Design tokens (FINAL — warm)

### Color

| Token | Hex | Use |
|---|---|---|
| Espresso (ink) | `#241712` | Primary text, dark sections, footer, buttons, chips. (Warm near-black — replaces the old `--onyx`.) |
| Terracotta (accent) | `#C36602` | The orange accent: active service card, the `100%` stat, primary highlight. (Replaces old `--emerald`.) |
| Cocoa deep | `#33210F` | Tinted dark panels (bento chat panel / `--dark-card`). |
| Gold (brass) | `#C99B5C` | The metallic. Rules, eyebrow type, logo echo, focus, sheen. Most-used accent after ink. |
| Gold deep | `#9A6E2E` | Gold for type on light surfaces (eyebrows, prices, dates). |
| Gold light | `#E8C887` | Gold highlight on dark surfaces (hero/CTA emphasis, footer labels). |
| Cream | `#F6EEDF` | Warm neutral. |
| Pearl | `#FBF4E6` | Card background. |
| Ivory (page) | `#FBF6EC` | Page background inside the frame. |
| Bone | `#EFE6D3` | Quiet beige — blog section background, image-placeholder fills. |
| Frame | `#B6884E` | Golden-brown outer frame; rendered as a gradient `135deg, #C49A5C → #B6884E → #9C6F37`. |

**Warm neutrals (inherited, unchanged from `colors_and_type.css`):**
`--ink-600 #4A3F35` (secondary text), `--ink-500 #6B5B49` (tertiary/muted text),
`--ink-400 #8E7C66`, `--ink-300 #B19C82`, `--ink-200 #D1BFA1`.

**Semantic mapping used on the page:**
- Body/primary text = Espresso `#241712`
- Muted/lead text = `#6B5B49`
- Page bg = Ivory `#FBF6EC`; card bg = Pearl `#FBF4E6`; raised card = `#FFFFFF`; blog bg = Bone `#EFE6D3`

**Dark-section gradients (hero + CTA):**
`linear-gradient(120deg, #8A5A24 0%, #5C3917 ~47%, #2C1B11 100%)`

### Borders & rules
- Hairline: `1px solid rgba(10,9,8,0.10)`
- Gold border: `1px solid rgba(139,106,47,0.50)`
- Strong: `1px solid rgba(10,9,8,0.32)`
- **Signature element — brass double-rule:** a 64×5px box with `border-top:1px` and
  `border-bottom:1px` in Gold `#C99B5C` (two parallel lines, 5px apart). Sits left
  of every eyebrow label.

### Radii
4–6px on cards/buttons (sharp, deco). `999px` only for the rating pill and small dots.

### Shadows
Cards have **no shadow at rest**. Logo image carries `drop-shadow(0 2px 6px rgba(0,0,0,.25))`
on dark backgrounds. Page card: `0 0 0 1px rgba(139,106,47,0.50)`.

### Spacing
Section vertical padding **96px** desktop (48px at ≤1200px). Horizontal **80px**
desktop (48px at ≤1200px). Grid gaps 14–28px.

---

## 3. Typography (FINAL)

| Role | Family | Notes |
|---|---|---|
| Display / headings (upright) | **Marcellus** (Google Fonts), fallback `"Times New Roman", serif` | Single weight (400). Even, refined strokes — chosen specifically for legibility. **Do not faux-bold or faux-italic it.** Set `font-synthesis: none`. For emphasis use color (gold), not italic. |
| Body / UI / labels | **Jost** (Google Fonts), fallback `"Helvetica Neue", sans-serif` | Weights 300–600 available and real. |

> Earlier drafts used Bodoni Moda + Poiret One + Italiana. Those are **dropped** —
> their stroke contrast was the legibility complaint. The system is **Marcellus**
> (upright display) + **Cormorant Garamond italic** (editorial italic for leads &
> emphasis, used by the UI kits) + **Jost** (body). The homepage itself uses no
> italic — it emphasises with gold color — but the kits lean on the Cormorant italic.

**Type scale as used (px):**

| Element | Family | Size | Weight | Tracking | Color |
|---|---|---|---|---|---|
| Hero H1 | Marcellus | 90 (66 ≤1200px) | 400 | .005em | Pearl; emphasis word in Gold-light `#E8C887` |
| Section title (H2) | Marcellus | 54 | 400 | .005em | Espresso; emphasis word in Gold-deep `#9A6E2E` |
| Blog H2 | Marcellus | 58 | 400 | — | Espresso |
| CTA H2 | Marcellus | 64 | 400 | .005em | Pearl; emphasis in Gold-light |
| Service card H3 | Marcellus | 30 | 400 | — | Espresso (white on active card) |
| Blog post H3 | Marcellus | 32 | 400 | .005em | Espresso |
| Feature/trusted H3 | Marcellus | 26–27 | 400 | — | Espresso |
| Stat number (`100%`) | Marcellus | 64 | 400 | — | Terracotta `#C36602` |
| Offer "40% Offer" | Marcellus | 48 | 400 | .01em | Pearl |
| Eyebrow label | Jost | 13 | 500 | .30em, UPPERCASE | Gold-deep `#9A6E2E` (Gold-light on dark) |
| Lead paragraph | Jost | 17 | 400 | — | `#6B5B49`, line-height 1.65 |
| Body / excerpt | Jost | 14–15 | 400 | — | `#6B5B49` |
| Buttons | Jost | 12 | 500 | .22em, UPPERCASE | varies (see §5) |
| Footer / nav links | Jost | 12 | 400 | .20em, UPPERCASE | Pearl |
| Wordmark "HARAV" | Marcellus | 25–28 | 400 | .30em, UPPERCASE | Pearl/Ivory on dark |
| Wordmark sub "SALON · SPA" | Jost | 9.5 | 500 | .36em, UPPERCASE | Gold, preceded by a 22×1px gold tick |

---

## 4. Screens / sections (top → bottom)

All sections sit inside `.page` (Ivory bg). Order and detail:

### 4.1 Hero (dark)
- Full-bleed warm-brown gradient (§2) over a low-lit photo placeholder
  (`filter: saturate(.92) sepia(.14) brightness(.84)`), plus two overlay gradients
  for legibility, plus faint gold deco circles top-left.
- **Top nav** (transparent, gold hairline underline): left = **brand lockup** (gold
  logo image + "HARAV / SALON · SPA" stacked); center = links `Home · Treatments ·
  About · Journal · Visit` (active = gold); right = `Login` + **Reserve** button
  (gold bg, ink text, ↗ icon).
- **Headline** (lower-left, after ~392px top spacing): eyebrow "REAL BEAUTY, REAL
  RESULTS" + H1 "Natural Beauty & **Wellness Care.**" (second line gold).
- **Offer module** (lower-right): a pearl product tile + a translucent brown card
  reading "40% Offer / SELECT BEAUTY SERVICES / Trusted with a 5.00 rating from 12k
  happy clients."

### 4.2 Brand intro (light, centered)
Eyebrow "THE HARAV STANDARD" + H2 "Expert dermatology, offering advanced **skin &
hair** care." (gold emphasis) + lead + dark **Book Appointment** button.

### 4.3 Social-proof bento (light)
A 3-col / 2-row grid, 580px tall, hairline-bordered: tall image (left), a cocoa
"chat" panel with three rows (middle-top), a "Trusted Experts" text card, a stat
card (`100%` in terracotta + a rating pill `4.9 ★` with overlapped avatars), and a
facial image (bottom-right).

### 4.4 Services menu (light)
Head row: eyebrow "THE MENU" + H2 "Our Beauty Services" + lead on the left; two
round arrow buttons on the right (one outlined, one ink-filled). Then a 3-card grid:
**Facial Treatment** (active = **terracotta `#C36602`** card, white text, white
corner badge with terracotta icon), **Hair Styling**, **Makeup** (inactive = pearl
cards). Each card: title + ↗ corner badge, a "60 Mins / From £xx" row (price in
gold-deep), and a square image.

### 4.5 The experience (light, centered)
Eyebrow "THE EXPERIENCE" + H2 "Transforming your journey into **pure relaxation**"
+ lead + a 3-up feature grid (outlined circular gold-stroke icon, H3, paragraph):
Book Your Appointment / Personalized Wellness Session / Restore & Glow.

### 4.6 Journal / blog (Bone bg)
Eyebrow "NOTES FROM THE SALON" + H2 "Wellness Insights & Beauty Tips" + lead, then
3 horizontal post cards (42% image / text): date (gold-deep), H3, excerpt, hairline,
author row (avatar, name, role, ↗ go-button — first is ink-filled). A centered
ghost **See More** button.

### 4.7 Closing CTA (dark)
Same warm gradient as hero, with faint gold swirl ornaments. Eyebrow "AN HOUR, KEPT
IN GOLD" + H2 "Ready to get **wellness care?**" + line + light **Book Appointment**
button.

### 4.8 Footer (Espresso bg)
5-col grid: brand lockup + subscribe field (gold submit) | Category | About Us |
Terms & Policy | Follow Us (phone, email, 4 social buttons — first is gold-filled).
Bottom hairline + "© 2026 Harav Salon & Spa. All rights reserved."

---

## 5. Components

**Buttons** — 16×28px padding, Jost 12px/500, .22em uppercase, 0 radius, `opacity .85` on hover:
- Primary (default): Espresso bg, Pearl text.
- `.brass`: Gold bg, Espresso text (nav Reserve).
- `.terra`: Terracotta bg, white text (available variant).
- `.ghost`: transparent, ink text, strong border.
- `.on-dark`: Pearl bg, Espresso text (used on dark sections).
- Most carry a small ↗ icon (`M7 17 17 7M9 7h8v8`).

**Eyebrow** — `[brass double-rule] + UPPERCASE label`. Used to open most sections.

**Card** — Pearl bg, hairline border, 6px radius, no rest shadow.

**Brand lockup** — gold logo image (`assets/harav-logo.png`) + stacked "HARAV" /
"— SALON · SPA". Logo height 56px in nav, 60px in footer.

**Icons** — inline SVG, 1.7–2.4 stroke, `currentColor`. Functional only (arrows,
star, calendar, phone, mail, socials). Stars are filled gold.

---

## 6. Interactions & behavior

The page is **mostly static / presentational**. Real behavior to wire up:
- **Nav links** scroll to anchors (`#services`, `#about`, `#blog`, `#contact`);
  `html { scroll-behavior: smooth }`.
- **Reserve / Book Appointment** → open a reservation flow (not built on the
  homepage — wire it to your booking system).
- **Hover:** links shift to gold-light; buttons drop to `opacity .85`. No scale, no
  spring (brand motion is slow/theatrical: ~300ms fades, ease-out
  `cubic-bezier(0.22,1,0.36,1)`).
- **Services arrows / "active" card** imply a carousel; currently the first card is
  statically active. Implement as a selectable/scrollable set if desired.
- **Subscribe form** posts an email (currently `onsubmit:return false`).
- **Responsive:** at ≤1200px, section padding tightens to 48px and hero H1 → 66px.
  Below tablet, collapse multi-col grids to 1 col and the nav to a menu — not
  designed here; follow codebase conventions.

The current file scales the 1600px canvas to the viewport via a `zoom` script.
In production, drop that and build natively responsive.

---

## 7. Assets

| Asset | Path | Notes |
|---|---|---|
| **Logo** (final, real) | `assets/harav-logo.png` | Brushed-gold "H" forming a woman's profile. Transparent background (white knocked out). Use in nav, footer, favicon. **This is the real business logo — use it, not the SVG wordmarks.** |
| Optional SVG wordmarks/ornaments | `assets/logo-*.svg`, `ornament-*.svg` | Earlier built marks; optional/decorative, superseded by the real logo. |
| `image-slot.js` | root | Drag-and-drop image placeholder web component used for all photography in the prototype. In production, replace `<image-slot>` with real `<img>`/CMS images. The hero, bento, service, blog, and avatar images are all empty placeholders awaiting a real photo shoot (warm, low-lit, brass-rich). |

Fonts: **Marcellus** + **Jost** via Google Fonts. If Harav licenses a custom face, swap here.

---

## 8. Copy

All headings, labels, prices, dates, and names in the prototype are **final-styled
but illustrative** — service prices (£40–£50), the "12k clients / 4.9★" proof
figures, blog titles, and author names (Devon, Mohali, Sevon) are placeholders.
Replace with real business data. Voice is sentence-case, no exclamation marks, no
emoji (see `README.md` → CONTENT FUNDAMENTALS).

---

## 9. Files

| File | Role |
|---|---|
| `Harav Salon & Spa.html` | **The final homepage** — the design reference to rebuild. |
| `colors_and_type.css` | Live token file — warm system; matches §2. Aliases like `--onyx`/`--emerald` remap to warm. |
| `assets/harav-logo.png` | Final logo. |
| `image-slot.js` | Placeholder image component (prototype only). |
| `README.md` | Brand voice + warm visual foundations (aligned with this spec). |
| `ui_kits/` | Other surfaces; token-driven, inherit the same warm system. |
