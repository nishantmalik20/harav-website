"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="font-body text-xs uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-gold-deep"
    >
      Sign out
    </button>
  );
}
