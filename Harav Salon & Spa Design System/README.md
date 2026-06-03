# Harav Salon & Spa — Design System

> *Brushed gold on the doors. Warm light over everything. An hour kept in gold.*

Harav is a luxury salon & spa in Winnipeg, Manitoba, serving a 100% women clientele. The brand sits in a **warm, gilded, modern-classic** tradition — espresso & brushed gold, burnt-terracotta accents, cream paper, refined serif type. Opulent but warm; considered, never cold. This design system gives any agent or designer everything they need to make on-brand work for Harav.

---

## Source materials used

This system is built around Harav's **real logo** — a brushed-gold "H" that doubles as a woman's profile with flowing hair (`assets/harav-logo.png`). The brand's gold gradient drives the palette; the warm, candle-lit mood and refined serif type follow from it. Service menus, prices, photography, and team names below are **illustrative placeholders** to be replaced with real business data.

> An earlier exploration used a cooler "art-deco glam" direction (onyx + emerald green + Bodoni type). That has been **retired** in favor of the warm gold system documented here, to match the logo. If any older green references remain in stray files, this README + `colors_and_type.css` are the source of truth.

---

## What's in this system

The system covers **two UI-kit surfaces** plus the homepage:
0. **Homepage** (`Harav Salon & Spa.html`) — the flagship marketing site. The reference build for the warm system; structure in the HTML, styles in `harav-home.css`.
1. **Shop / boutique** (`ui_kits/shop/`) — on-site retail for ~50 SKUs across hair, skin, body, and home & ritual. Editorial grid, product detail modal, cart drawer.
2. **Client portal** (`ui_kits/portal/`) — signed-in member dashboard: upcoming hour, past visits, quick re-book, gift card balance.

Plus all the underlying **brand foundations** (color, type, motion, iconography) and a Design System tab full of preview cards you can browse.

> The UI kits are fully token-driven — they read their colors and fonts from `colors_and_type.css`, so they inherit the warm system automatically.

---

## CONTENT FUNDAMENTALS

Harav's voice is **considered, warm, and gilded.** Think of editorial fashion captions, an old hotel bar's menu, or a perfume house's house style — opulent without being loud. Glamour through restraint.

### Tone
- **Warm but adult.** Reads like the menu at a candle-lit supper room, not a brand on Instagram.
- **Reverent of the ritual.** Treatments are rites, not appointments. "An hour in gold and warm light," not "a great facial!"
- **Confident through restraint.** A short sentence holds more glamour than a long one.
- **Sensory and material.** Gold, cedar, caramel, marble, smoke, rose. Surfaces and textures, named directly.
- **Local but not folksy.** Winnipeg is the home, not the punchline.

### Person & pronouns
- **"You"** for the guest, always. ("Your hour begins the moment you arrive.")
- **"We"** for the salon, sparingly. ("We hold this hour for you.")
- **Never "ladies", "girls", "babes", "hun".**
- **No "I"** in marketing surfaces — the brand speaks as one voice.

### Casing
- **Sentence case** for headlines and buttons. Never Title Case In Marketing UI.
- **ALL CAPS** with wide tracking reserved for eyebrows, labels, and the wordmark.
- **Emphasis through gold color**, set in the display serif — not italics (the display face is upright; see Type).

### Punctuation & rhythm
- **Em dashes** ( — ) are encouraged for cadence.
- **Full stops** over exclamation marks. We never use `!` in body copy.
- **Fragments** are fine. ("Gold. Warm light. Held.")
- **Numerals as numerals** (`60 min`, `$135`).
- **Ampersand** in the wordmark only.

### Specific examples — the right way

> **Eyebrow:** A RITE OF WARM LIGHT
> **Headline:** An hour, kept in gold.
> **Body:** Step in from the cold. Brushed gold on the doors, warm light over everything. An hour cast entirely for you — facials, scalp rituals, a slow cut and colour.

> **Service card:**
> Champagne Facial — 75 min — $185
> A slow rite. Hand-blended masque, gold leaf, lymphatic massage.

> **Button copy:**
> Reserve an hour · See the menu · Hold this time

### Examples — the wrong way (avoid)

> ❌ "Book your appointment today!! ✨"
> ❌ "Hey gorgeous, ready to glow up? 💆‍♀️"
> ❌ "Our AMAZING stylists will TRANSFORM your hair!"
> ❌ "Click here for our awesome services"

### Emoji
**Never.** Not in copy, UI, social, or confirmation emails.

### Sentence lengths
Keep cadence varied:

> Step in. The gold is warm under your hand; the light is low. An hour belongs to you, and only to you — a hand-blended oil, pressed linen, the slow choreography of someone who knows what they're doing.

Short. Short. One longer, comma-rich sentence to breathe in.

---

## VISUAL FOUNDATIONS

Harav looks like a **warm, candle-lit salon in brushed gold and cream.** Espresso & gold, burnt-terracotta accents, cream paper, marble. Refined serif headlines over clean sans body. Photography is warm, intimate, low-lit. The brand's gold-gradient logo is the anchor.

### Color
A warm, gilded palette. **No greens, no cool blues, no purples, no pastels.**

- **Espresso** (`#241712`) — primary ink. A warm near-black. Dark sections, footer, buttons, body text.
- **Gold / Brass** (`#C99B5C`) — the metallic, drawn from the logo. Double-rules, eyebrow type, focus states, the logo echo. The most-used accent after espresso.
- **Gold deep** (`#9A6E2E`) — darker gold for type on light surfaces (eyebrows, prices, dates).
- **Gold light** (`#E8C887`) — highlight & sheen for emphasis on dark surfaces.
- **Terracotta** (`#C36602`) — burnt-orange accent. Feature cards, the active state, key stats, rare buttons. The brand's one chromatic pop.
- **Cocoa** (`#33210F`) — tinted dark panels within light sections.
- **Cream** (`#F6EEDF`) / **Pearl** (`#FBF4E6`) / **Ivory** (`#FBF6EC`) — warm page & card backgrounds. Never pure white.
- **Bone** (`#EFE6D3`) — quiet beige for sunken sections (e.g. the journal).
- **Frame gold** (`#B6884E`) — golden-brown framing device (`135deg, #C49A5C → #B6884E → #9C6F37`).

See `colors_and_type.css` for the full token set. Legacy token names (`--onyx`, `--emerald`, `--velvet`) are kept as aliases remapped to warm values so older files keep working.

### Type
**Two families (one with an italic companion).**
- **Display — Marcellus.** A refined, even-stroke serif (Trajan / luxury-hotel energy). The upright headline face for everything — heroes, section titles, prices, stats. Single weight; hierarchy comes from **size and color**, never faux-bold. On the homepage, emphasis is a **gold-colored word**.
- **Display italic — Cormorant Garamond italic.** The editorial italic companion for leads, blurbs, and emphasised words in the UI kits (Marcellus has no italic, so italic requests fall through to Cormorant). Moderate contrast — legible, unlike the old Bodoni.
- **Body — Jost.** A clean, geometric sans for body, UI, forms, eyebrows, and labels. Weights 300–600. 14–18px body; eyebrows are uppercase, wide-tracked (`0.30em`), in gold-deep.

> **Why Marcellus:** the previous high-contrast face (Bodoni) had hairline strokes that read poorly at size. Marcellus's even weight is deliberately legible while staying elegant; Cormorant italic covers the editorial italic the kits need.
>
> **Font substitution flag:** Both families load from Google Fonts. If Harav licenses a custom typeface, share the files.

### Spacing & layout
- **Generous whitespace** — section padding starts at **96px vertical** desktop (128px for grand moments), 48px on mobile.
- **Symmetric and centered** for brand moments; left-aligned for editorial content.
- **Anchor lines.** A **gold double-rule** (two parallel 1px lines, 5px apart) sits left of eyebrows and section starts. The single most-used brand element after type.

### Backgrounds
- **Ivory / Cream** is the default page background.
- **Espresso** and **Cocoa** are used for full-bleed dark sections — usually the hero, one mid-page band, and the footer.
- **Warm dark gradient** (`120deg, #8A5A24 → #5C3917 → #2C1B11`) for the hero and closing CTA.
- **Warm, low-lit photography** is used full-bleed for hero and category headers.
- **Terracotta** appears as the single chromatic accent — one feature card or active state per view, not a field.

### Corner radii
- **0–6px on UI elements.** Soft, architectural — never pill-round.
- **Pill (999px)** allowed only for the status/rating pill and small dots.

### Shadows
Warm and deep.
- `shadow-sm` (`0 2px 12px rgba(36,23,18,0.12)`) for hover-raised cards.
- `shadow-md` for floating menus and modals.
- `shadow-glow-gold` for premium CTA moments.
- The logo carries a soft `drop-shadow` on dark backgrounds.

### Borders & rules
- **Gold double-rule.** Two parallel 1px gold lines, 5px apart. The signature divider.
- **Single gold.** 1px gold for inline accents — link underlines, focus states.
- **Hairlines.** 1px borders at `rgba(36,23,18,0.10)` for list dividers.

### Motion
Warm, slow, never bouncy.
- **Durations:** UI fades 300ms; section reveals 600ms; modal/drawer 450ms.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (a soft ease-out).
- **No spring, no overshoot.**
- **Hovers:** opacity dips to ~0.85, OR a link shifts to gold-light. Never scale.
- **Press states:** opacity to 0.6.
- **Photographic zoom on tile hover** allowed at 1.04× over 600ms.

### Imagery direction
- **Warm, intimate, low-lit.** Tungsten light, brushed-gold surfaces, deep warm shadows, caramel highlights.
- **Subjects are partial** — the back of a neck, hands at work, a glass on marble.
- **Color grade:** deep warm-brown shadows, creamy highlights, low saturation, a touch of sepia.
- **No clinical before/after diptychs.**
- **Skin tones:** intentionally diverse.

### Use of transparency & blur
- **Drawer & modal backdrops:** `rgba(36, 23, 18, 0.55)` with 4px backdrop blur.
- **Sticky top nav** on scroll: cream at 92% opacity with 12px backdrop blur.

### Cards
A "card" at Harav is usually **text on cream paper**, separated from siblings by whitespace and a hairline rule. When a card *is* a box:
- Background: Pearl (`#FBF4E6`), or Blush (`#EAD8C0`) for secondary; Terracotta for the one feature/active card.
- Border: 1px hairline or 1px gold for special.
- Radius: 6px max.
- Padding: 30px desktop, 24px mobile.
- No shadow at rest. `shadow-sm` on hover.

---

## ICONOGRAPHY

Harav uses an **extremely restrained** functional icon vocabulary, and the **gold double-rule** as its primary decorative device. The brand prefers **gold rules + type** over icons for hierarchy.

### Icon system
- **Inline stroked SVG** at 1.7–2.4px weight, in `currentColor` (Lucide-style line icons are a fine source). Used **only for functional UI** — close (X), chevrons, arrows (↗), search, calendar, clock, map pin, phone, mail, socials. Never for decoration.
- **Size:** 16–20px in body; 24px max in nav. Stars (ratings) are filled gold.
- **Color:** inherits text color; gold is reserved for type, rules, and emphasis.

> **Substitution flag:** any line-icon set is a stand-in for an absent in-brand icon set.

### Brand decorative vocabulary
- **The gold double-rule** — two parallel 1px gold lines, the most-used brand element (also `assets/ornament-double-rule.svg`).
- Faint **gold line circles / swirls** may sit behind dark hero and CTA bands, sparingly.
- **Long dash** ( — ) — service-listing connector.
- **The ampersand** in Marcellus, in gold — used in the wordmark ("Salon & Spa") and headline emphasis.

> The older deco ornaments (`ornament-sunburst/fan/ziggurat.svg`) remain in `assets/` but are optional; the warm system leans on rules + type, not deco motifs.

### Emoji
**Never.**

### Logos & assets
See `assets/`:
- **`harav-logo.png`** — the real brand logo: a brushed-gold "H" forming a woman's profile. Transparent background. Used in nav, footer, and favicon. **This is the primary mark.**
- `logo-wordmark.svg` / `logo-monogram.svg` / `logo-stacked.svg` — earlier built wordmarks; optional, superseded by the real logo.
- `ornament-*.svg` — optional decorative ornaments.
- Photography is placeholder. **Flag:** awaiting a real on-brand shoot (warm, low-lit, gold-rich).

---

## Index

Root of project:

| File | Purpose |
|---|---|
| `Harav Salon & Spa.html` | The flagship homepage / marketing site — reference build for the warm system |
| `harav-home.css` | Homepage layout & component styles (structure lives in the HTML) |
| `design-spec.md` | Implementation spec (for handoff to Claude Code / a codebase) |
| `README.md` | This document |
| `colors_and_type.css` | All design tokens (CSS variables) + semantic type classes |
| `SKILL.md` | Agent-skill manifest for Claude Code compatibility |
| `assets/` | Logo (`harav-logo.png`), optional wordmarks & ornaments |
| `preview/` | Design System tab cards |
| `ui_kits/shop/` | Boutique (`index.html` + grid, detail modal, cart drawer) |
| `ui_kits/portal/` | Client portal (`index.html` + components) |

### Quickstart
1. Read this README top to bottom.
2. Open `Harav Salon & Spa.html` to see the system in motion.
3. Import `colors_and_type.css` at the top of any new HTML file.
4. Use **Marcellus** for display/headlines, **Jost** for body, UI, eyebrows. Emphasize with **gold color**, not italics. Use the gold double-rule pattern liberally.
5. When in doubt: more whitespace, fewer words, no exclamation marks, more gold.

---

## Caveats & open questions

- **Logo is the real one** (`assets/harav-logo.png`); the white background has been knocked out for use on dark surfaces.
- **Photography is placeholder.** Commission a real shoot — warm, low-lit, gold-rich, intimate.
- **Fonts are Google Fonts** (Marcellus + Jost). Swap if Harav licenses a custom face.
- **Service menu, prices, stylist names, products are illustrative.** Replace with real data.
- **Legacy token aliases** (`--onyx`, `--emerald`, `--velvet`) are remapped to warm values for backwards-compat; prefer the warm names (`--espresso`, `--terracotta`, `--gold`) in new work.
