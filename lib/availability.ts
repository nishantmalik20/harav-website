import type { SupabaseClient } from "@supabase/supabase-js";
import { BUSINESS_HOURS } from "@/lib/site";

/** How long an unpaid deposit booking holds its slot. The row is created before
 *  Stripe Checkout opens, so a hold window keeps the slot safe while the guest
 *  pays — but an abandoned checkout must not block the calendar forever. */
const DEPOSIT_HOLD_MINUTES = 30;

export interface Slot {
  value: string;
  label: string;
}

/** Every bookable 30-minute slot for a date, from the business hours. */
export function generateSlots(dateStr: string): Slot[] {
  if (!dateStr) return [];
  const date = new Date(`${dateStr}T00:00:00`);
  const hours = BUSINESS_HOURS[date.getDay()];
  if (!hours) return [];
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const end = closeH * 60 + closeM;
  const slots: Slot[] = [];
  for (let mins = openH * 60 + openM; mins <= end - 30; mins += 30) {
    const hh = Math.floor(mins / 60);
    const mm = mins % 60;
    const value = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    const ampm = hh >= 12 ? "pm" : "am";
    const h12 = ((hh + 11) % 12) + 1;
    slots.push({ value, label: `${h12}:${String(mm).padStart(2, "0")} ${ampm}` });
  }
  return slots;
}

interface SlotRow {
  preferred_time: string;
  status: string;
  deposit_required: boolean;
  deposit_status: string;
  created_at: string;
}

function blocksSlot(row: SlotRow): boolean {
  // One esthetician — a salon-confirmed booking always owns its slot.
  if (row.status === "confirmed") return true;
  if (row.status !== "new") return false;
  if (!row.deposit_required || row.deposit_status === "paid") return true;
  return Date.now() - new Date(row.created_at).getTime() < DEPOSIT_HOLD_MINUTES * 60_000;
}

/** Times already held on a date ("HH:MM"). SERVER ONLY — bookings are behind
 *  RLS, so this needs the service-role client; only times ever leave here. */
export async function takenTimes(supabase: SupabaseClient, date: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("preferred_time,status,deposit_required,deposit_status,created_at")
    .eq("preferred_date", date)
    .in("status", ["new", "confirmed"]);
  if (error) throw error;
  const rows = (data ?? []) as SlotRow[];
  return [...new Set(rows.filter(blocksSlot).map((r) => r.preferred_time.slice(0, 5)))];
}
