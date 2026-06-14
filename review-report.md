# Code Review Report — Harav Salon & Spa
*Generated: 2026-06-14*

## Summary
- 🔴 Critical issues: **0**
- 🟡 Important issues: **2** (1 fixed this session, 1 dashboard toggle)
- 🔵 Nice-to-have improvements: **6**

**Overall verdict:** **Ready to ship** (for the sandbox/demo build). The codebase
is clean, typed, and the one externally-facing security gap found was fixed
during this review. Remaining items are a one-click Supabase Auth toggle and
quality polish.

---

## 🔴 Critical Issues

None found.

- No hardcoded secrets in tracked files (`.env*.local` and `.env` are gitignored;
  the only `sk_live`/`re_` grep hits are a `package-lock.json` hash and a
  `key.startsWith("sk_live")` mode check).
- No XSS sinks from user input. The three `dangerouslySetInnerHTML` uses
  (`components/seo/json-ld.tsx`, `components/sections/faq.tsx`,
  `app/journal/[slug]/page.tsx`) all render **static, server-controlled**
  JSON-LD — no user-generated content flows in.
- Build compiles and prerenders all routes; TypeScript (`tsc --noEmit`) is clean.

---

## 🟡 Important Issues

### 1. Bookings/subscribers RLS allowed any authenticated user — **FIXED this session**
- **File:** `supabase/migrations/0001_init.sql` → remediated by new
  `supabase/migrations/0002_tighten_rls.sql`
- **Issue:** The initial policies used `USING (true)` / `WITH CHECK (true)` for the
  `authenticated` role on `public.bookings` (and `SELECT` on `subscribers`).
  The Supabase security advisor flagged this (`rls_policy_always_true`,
  EXTERNAL/SECURITY). If public sign-ups were ever enabled, a self-registered
  user could read/write customer PII directly via the REST API, bypassing the
  `/admin` UI guard.
- **Fix applied:** Scoped both policies to the salon admin email
  (`admin@haravsalonspa.ca`) via `auth.jwt() ->> 'email'`. Applied to the live
  (sandbox) project and committed as a repo migration. Advisor re-run confirms
  the warning is cleared. Public booking + newsletter inserts are unaffected
  (they go through the service-role client, which bypasses RLS).

### 2. Leaked-password protection disabled (Supabase Auth)
- **Where:** Supabase Auth settings (not code).
- **Issue:** Advisor warns `auth_leaked_password_protection` is off — the admin
  password isn't checked against HaveIBeenPwned.
- **Fix:** Enable it in Dashboard → Authentication → Policies. One toggle, no code.
  Remediation: https://supabase.com/docs/guides/auth/password-security

---

## 🔵 Nice-to-Have Improvements

1. **Fake/placeholder star ratings** (`lib/ratings.ts`) — deterministic, not real
   reviews. Fine while the boutique is gated off (`NEXT_PUBLIC_STORE_ENABLED`),
   but **must be removed or replaced with real reviews before the shop goes
   live** (Competition Act / FTC risk). Centralised at one swap-point. *(Known,
   tracked in CLAUDE.md.)*
2. **No `engines` field** in `package.json` — pin Node (e.g. `"node": ">=20"`)
   so Vercel and local stay aligned.
3. **`eslint.ignoreDuringBuilds: true`** (`next.config.mjs`) — intentional for the
   exFAT/D: build, but lint isn't enforced at build time. Consider running
   `npm run lint` in CI.
4. **No `loading.tsx` / `error.tsx`** route boundaries (only `not-found.tsx`).
   Adding them would smooth perceived load and error states. Not required.
5. **JSON-LD escaping** — the JSON-LD `dangerouslySetInnerHTML` blocks could
   escape `<` defensively. Safe today (no user input), worth it if reviews/UGC
   are ever added.
6. **Off-brand About photos** (`about-room-1.jpg`, `about-room-2.jpg`) show hair
   chairs / branded hair products on a women-only, no-hair salon. *(Known.)*

---

## Category Breakdown

### Security — strong
- Stripe webhook verifies signatures (`constructEvent`, returns 400 on
  missing/invalid). All API routes validate input with Zod. Booking price +
  deposit and shop line-item prices are re-derived **server-side** (client never
  names an amount). Service-role key is confined to `lib/supabase/admin.ts`
  (server only) and imported only by API routes. RLS now scoped to the admin.
- `/admin` gated by middleware (Supabase session + `ADMIN_EMAILS` allowlist).
- Newsletter upsert uses `ignoreDuplicates` (no enumeration leak); availability
  endpoint returns times only (no PII).

### Accessibility — good
- Exactly one `<h1>` per page (verified across all routes). Semantic landmarks
  (`<nav aria-label>`, `<address>`, `<dl>`). Icon-only social links have
  `aria-label`. No raw `<img>` — all via `next/image` (`components/ui/photo.tsx`,
  `alt` required). Browser spot-check in `qa-report.md`.

### Performance — good
- All images `next/image`; above-the-fold photos use `priority`. Hero rebuilt
  without framer-motion (CSS crossfade). First-load JS ~190 kB shared. Home and
  most pages prerendered static; shop product pages SSG (142 paths).

### Code Quality — good
- No stray `console.log` (only intentional `console.error` in API catch blocks).
  Named exports, kebab-case files, utilities in `lib/`. TypeScript strict, no
  `@ts-ignore`/`@ts-expect-error`, no `any` leaks found.

### SEO — complete (pass 1)
- Per-page metadata + canonicals, `sitemap.xml`, `robots.txt`, dynamic OG image,
  Organization + BeautySalon + FAQPage + Product + BlogPosting JSON-LD.
  ⚠ Set `NEXT_PUBLIC_SITE_URL=https://haravsalonspa.ca` at go-live (currently the
  Vercel URL) so canonicals/sitemap stop emitting the preview host.

---

## Recommended Next Steps
1. ✅ Critical: none.
2. Enable leaked-password protection in Supabase Auth (1 toggle).
3. Before the **boutique** goes live: decide on the fake-ratings removal and swap
   `NEXT_PUBLIC_SITE_URL` to the custom domain.
4. QA results: see `qa-report.md`.
