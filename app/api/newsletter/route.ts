import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Enter a valid email." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("subscribers")
      .upsert({ email: parsed.data.email.toLowerCase() }, { onConflict: "email", ignoreDuplicates: true });

    if (error) {
      console.error("newsletter insert failed", error);
      return NextResponse.json({ ok: false, error: "Could not subscribe." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("newsletter route error", e);
    return NextResponse.json({ ok: false, error: "Something went wrong." }, { status: 500 });
  }
}
