import type { SupabaseClient } from "@supabase/supabase-js";
import { BUSINESS_HOURS } from "@/lib/site";
import { findService } from "@/lib/services";

/** The booking calendar runs on a 30-minute grid. */
export const SLOT_MINUTES = 30;

export interface Slot {
  value: string;
  label: string;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

function toSlot(mins: number): Slot {
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;
  const value = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  const ampm = hh >= 12 ? "pm" : "am";
  const h12 = ((hh + 11) % 12) + 1;
  return { value, label: `${h12}:${String(mm).padStart(2, "0")} ${ampm}` };
}

/** How many 30-minute slots a treatment of `durationMin` occupies (min one). */
export function slotsNeeded(durationMin: number): number {
  return Math.max(1, Math.ceil(durationMin / SLOT_MINUTES));
}

/** The 30-minute slot start-times ("HH:MM") a treatment fills from a start. */
export function occupiedSlots(startValue: string, durationMin: number): string[] {
  const start = toMinutes(startValue);
  return Array.from(
    { length: slotsNeeded(durationMin) },
    (_, i) => toSlot(start + i * SLOT_MINUTES).value,
  );
}

/** Bookable start times for a date where a treatment of `durationMin` finishes
 *  inside business hours. Defaults to a single 30-minute slot. */
export function generateSlots(dateStr: string, durationMin = SLOT_MINUTES): Slot[] {
  if (!dateStr) return [];
  const date = new Date(`${dateStr}T00:00:00`);
  const hours = BUSINESS_HOURS[date.getDay()];
  if (!hours) return [];
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const slots: Slot[] = [];
  // The whole treatment, not just its first slot, has to fit before closing.
  for (let mins = open; mins + durationMin <= close; mins += SLOT_MINUTES) {
    slots.push(toSlot(mins));
  }
  return slots;
}

interface SlotRow {
  preferred_time: string;
  service_category: string;
  service_name: string;
  status: string;
  deposit_required: boolean;
  deposit_status: string;
}

/** A booking only holds its slot once it's actually secured: salon-confirmed, a
 *  no-deposit booking (confirmed the moment it's placed), or a deposit that has
 *  been PAID. An unpaid deposit — e.g. a guest who opened Stripe Checkout and
 *  backed out — never holds the slot, so it can't block that guest from trying
 *  again, or anyone else, when no money has changed hands. */
function blocksSlot(row: SlotRow): boolean {
  if (row.status === "confirmed") return true;
  if (row.status !== "new") return false; // cancelled / no_show / completed
  if (!row.deposit_required) return true;
  return row.deposit_status === "paid";
}

function rowDuration(row: SlotRow): number {
  return findService(row.service_category, row.service_name)?.service.durationMin ?? SLOT_MINUTES;
}

/** Every 30-minute slot start-time already held on a date ("HH:MM"), expanded
 *  by each booking's treatment length so an hour-long appointment blocks the
 *  whole hour. SERVER ONLY — bookings are behind RLS, so this needs the
 *  service-role client; only times ever leave here. */
export async function takenTimes(supabase: SupabaseClient, date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("preferred_time,service_category,service_name,status,deposit_required,deposit_status")
    .eq("preferred_date", date)
    .in("status", ["new", "confirmed"]);
  if (error) throw error;
  const taken = new Set<string>();
  for (const row of (data ?? []) as SlotRow[]) {
    if (!blocksSlot(row)) continue;
    for (const slot of occupiedSlots(row.preferred_time, rowDuration(row))) taken.add(slot);
  }
  return [...taken];
}
