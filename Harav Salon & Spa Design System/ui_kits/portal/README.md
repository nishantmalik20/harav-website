# Client portal — UI kit

The signed-in member surface for returning guests. Where you see your upcoming hours, re-book favorites, and manage gift cards.

This is a **different surface** from the marketing site's reservation drawer — the drawer is for one-off conversions; this is for the relationship after.

## Files

| File | What it is |
|---|---|
| `index.html` | The composed dashboard view (interactive — sidebar, upcoming, history) |
| `PortalNav.jsx` | Slim top bar — wordmark, search, member chip |
| `Sidebar.jsx` | Left rail navigation — Hours, Past visits, Favorites, Gift cards, Profile |
| `UpcomingHour.jsx` | The hero card on the dashboard — your next held hour |
| `VisitHistory.jsx` | List of past visits with stylist + service + note |
| `RebookPanel.jsx` | Right-rail panel — "Book the same again?" with quick-pick stylists |
| `GiftCardBalance.jsx` | Compact gift card balance & recent activity |

## Surfaces

The portal has these pages (only "Hours" is implemented):

- **Hours** — upcoming + rebook (the home view)
- Past visits, Favorites, Gift cards, Profile (sidebar items, not built)

## Caveats

- Only the Hours / dashboard view is built; sidebar links are decorative.
- Names, services, and history are illustrative.
