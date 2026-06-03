"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { BookingStatus } from "@/types/database";

async function setStatus(id: string, status: BookingStatus) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // RLS allows the authenticated admin to update; the service role is not used here.
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

export async function confirmBooking(id: string) {
  await setStatus(id, "confirmed");
}
export async function completeBooking(id: string) {
  await setStatus(id, "completed");
}
export async function cancelBooking(id: string) {
  await setStatus(id, "cancelled");
}
export async function noShowBooking(id: string) {
  await setStatus(id, "no_show");
}
