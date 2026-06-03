---
name: harav-design
description: Use this skill to generate well-branded interfaces and assets for Harav Salon & Spa, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

Harav is a luxury salon & spa in Winnipeg for a 100% women clientele. The brand is **warm, gilded, candle-lit** — think a quiet hotel spa rendered as a magazine. Restraint is the system: warm cream paper, refined serif type, thin gold rules, brushed-gold logo, soft hands.

**Never** use emoji, exclamation marks, rounded UI corners, blue/purple gradients, or cheerful sales copy.

**Always** import `colors_and_type.css` as the first thing in any new HTML, use **Marcellus** for display + **Jost** for body, UI & eyebrows, emphasize with **gold color** (not italics), and let whitespace do the heavy lifting.

## Key files

- `README.md` — full brand brief: voice, visual foundations, iconography
- `colors_and_type.css` — design tokens + semantic type classes
- `assets/` — logos and brand glyphs
- `preview/` — 29 design-system reference cards (color, type, components, brand)
- `ui_kits/shop/` — boutique recreation (~50 SKUs scaling pattern)
- `ui_kits/portal/` — client portal recreation
