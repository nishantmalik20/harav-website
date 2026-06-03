# Shop — UI kit

The on-site boutique. Harav retails about 50 SKUs across hair, skin, body, and a small "home & ritual" line (candles, essential oils, tea). This UI kit covers the editorial product list, a product detail page, and the cart drawer.

The shop lives at `/shop` on the same site — the top-nav "Shop" link routes here. The brand voice on shop pages is the same as marketing: hushed, considered, no exclamation marks, prices in oldstyle numerals.

## Files

| File | What it is |
|---|---|
| `index.html` | The shop landing: category rail + filter + product grid (interactive — click any product, click Cart) |
| `ShopHeader.jsx` | Page header with category eyebrow + display title + filter row |
| `CategoryRail.jsx` | Horizontal category navigation (Hair · Skin · Body · Home & ritual · Gift) |
| `ProductCard.jsx` | The grid tile — image, name, type, price; hover reveals "Add" |
| `ProductGrid.jsx` | Responsive 4-col grid that hosts ProductCard |
| `ProductDetail.jsx` | Modal that opens on tile-click — hero image, copy, ritual, add to bag |
| `CartDrawer.jsx` | Right-side cart with line items, subtotal, "Take this with you" CTA |
| `FilterBar.jsx` | Sort + concern filter row above the grid |

## How it composes

The index renders header → category rail → filter bar → grid. Clicking any product opens `ProductDetail` (a modal in the same editorial style). Adding to cart triggers `CartDrawer`. State (cart contents, open detail, open drawer) lives in `index.html`.

## Caveats

- **Product names, brands, prices, and ingredient copy are illustrative.** Replace with Harav's real merchandise list.
- **Imagery is Unsplash CDN.** Each product needs a real on-brand still life (warm shadows, ceramics, linen).
- The kit displays 12 products — the grid is designed to take 50+ without restyling. Filter chips and category rail are how guests navigate at scale.
