import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { takenTimes } from "@/lib/availability";

export const dynamic = "force-dynamic";

/** Taken time slots for a date, so the booking form can grey them out.
 *  Returns times only — no booking details ever leave this endpoint. */
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ ok: false, error: "Invalid date." }, { status: 400 });
  }
  try {
    const taken = await takenTimes(createAdminClient(), date);
    return NextResponse.json({ ok: true, taken });
  } catch (e) {
    console.error("availability lookup failed", e);
    // Fail open — the booking POST re-checks and is the source of truth.
    return NextResponse.json({ ok: true, taken: [] });
  }
}
