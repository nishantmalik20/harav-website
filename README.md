# Harav Salon & Spa

A women's salon & spa in Winnipeg (facials, body sugaring, waxing, lash & brow, nails, massage). Marketing site with an in-house guest booking flow, a $20 Stripe deposit on select treatments, Resend email notifications, and a staff-only admin dashboard backed by Supabase.

Built and managed by [inishant.com](https://inishant.com).

## Stack

- **Next.js 15** (App Router) · **TypeScript** · **Tailwind CSS v4**
- **Supabase** — bookings storage + staff admin auth
- **Stripe** — $20 booking deposit (Checkout)
- **Resend** — booking + contact email
- **Framer Motion** — section reveals
- Deployed on **Vercel**

## Getting started

> **Build note:** `next build` needs an **NTFS** drive. On exFAT/FAT volumes the build fails with a `readlink EISDIR` error (the dev server is unaffected). On Windows, keep the project on `C:` for builds, or let Vercel build it.

```bash
npm install
cp .env.example .env.local   # then fill in the keys
npm run dev                  # http://localhost:3000
npm run build                # production build (NTFS)
```

## Environment variables

See `.env.example`. You will need keys for **Resend**, **Stripe**, and **Supabase**, plus `NEXT_PUBLIC_SITE_URL` and `ADMIN_EMAILS`. After creating the Supabase project, run `supabase/migrations/0001_init.sql` and create the admin user.

## Structure

```
app/                 routes (pages, /api routes, /admin)
components/          UI, layout, sections, brand, booking, admin
lib/                 services menu, journal, site constants, supabase/stripe/resend clients, images
supabase/migrations/ database schema + RLS
public/images/       site photography (license-free stock placeholders)
```

Planning docs live at the repo root: `discovery.md`, `copy.md`, `architecture.md`.
