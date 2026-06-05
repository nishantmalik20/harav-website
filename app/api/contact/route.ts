import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { sendContactEmail, sendContactAutoReply } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  message: z.string().min(1).max(4000),
});

export async function POST(req: NextRequest) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid input." }, { status: 400 });
    }
    await sendContactEmail(parsed.data); // to the salon — throws on failure
    await sendContactAutoReply(parsed.data); // "thanks for contacting" to the guest — best-effort
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact route error", e);
    return NextResponse.json({ ok: false, error: "Could not send your message." }, { status: 500 });
  }
}
