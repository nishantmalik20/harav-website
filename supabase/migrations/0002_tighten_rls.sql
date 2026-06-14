-- Harav Salon & Spa — tighten RLS to the salon admin account (Phase 1, hardening)
-- Run in the Supabase SQL editor (or via the Supabase CLI) AFTER 0001_init.sql.
--
-- 0001 granted full access to ANY authenticated user (USING (true) / WITH CHECK
-- (true)). The Supabase security advisor flags this (rls_policy_always_true):
-- if public sign-ups are ever enabled, a self-registered user could read or
-- write customer PII directly against the REST API, bypassing the /admin UI.
--
-- This single-admin studio has exactly one account, so we scope every booking
-- and subscriber policy to that email. Inserts still happen through the
-- service-role client (which bypasses RLS), so the public booking + newsletter
-- forms are unaffected. If the admin email ever changes, update the literal here.

drop policy if exists "admin manage bookings" on public.bookings;
create policy "admin manage bookings"
  on public.bookings
  for all
  to authenticated
  using ( lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@haravsalonspa.ca' )
  with check ( lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@haravsalonspa.ca' );

drop policy if exists "admin read subscribers" on public.subscribers;
create policy "admin read subscribers"
  on public.subscribers
  for select
  to authenticated
  using ( lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@haravsalonspa.ca' );
