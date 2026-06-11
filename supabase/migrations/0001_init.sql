-- Harav Salon & Spa — initial schema (Phase 1)
-- Run in the Supabase SQL editor (or via the Supabase CLI).

-- ───────────── bookings ─────────────
create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  service_category  text not null,
  service_name      text not null,
  service_price     numeric(10,2),
  preferred_date    date not null,
  preferred_time    text not null,
  esthetician       text default 'Khushi',
  notes             text,
  -- Pre-treatment consultation: which questionnaire the service carried
  -- (facial | carbon-laser | lash-extensions | sugaring | general) and the
  -- guest's answers (null for the general disclosure, which has no questions).
  intake_form       text not null default 'general',
  intake            jsonb,
  consented_at      timestamptz,
  deposit_required  boolean not null default false,
  deposit_amount    numeric(10,2) not null default 0,
  deposit_status    text not null default 'none',  -- none | pending | paid
  stripe_session_id text,
  status            text not null default 'new'    -- new | confirmed | completed | no_show | cancelled
);

create index if not exists bookings_preferred_date_idx on public.bookings (preferred_date);
create index if not exists bookings_status_idx on public.bookings (status);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;

-- Anon has NO access. Inserts/price updates happen server-side via the service
-- role (which bypasses RLS). The signed-in admin (the only account) may manage rows.
drop policy if exists "admin manage bookings" on public.bookings;
create policy "admin manage bookings"
  on public.bookings
  for all
  to authenticated
  using (true)
  with check (true);

-- ───────────── subscribers (newsletter) ─────────────
create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

-- Anon cannot read; inserts happen server-side via the service role.
-- The admin may read the list.
drop policy if exists "admin read subscribers" on public.subscribers;
create policy "admin read subscribers"
  on public.subscribers
  for select
  to authenticated
  using (true);

-- After applying: create the admin user (Khushi) in Authentication → Users,
-- and add her email to ADMIN_EMAILS in the environment.
