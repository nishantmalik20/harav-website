import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BookingsTable } from "@/components/admin/bookings-table";
import { SignOutButton } from "@/components/admin/sign-out-button";
import type { BookingRow } from "@/types/database";

export const metadata: Metadata = {
  title: "Bookings",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });
  const bookings = (data ?? []) as BookingRow[];

  return (
    <section className="px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.18em] text-gold-deep">
              Harav back office
            </p>
            <h1 className="mt-1 font-display text-3xl text-espresso">Bookings</h1>
            <p className="mt-1 font-body text-sm text-ink-400">Signed in as {user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-8">
          <BookingsTable bookings={bookings} />
        </div>
      </div>
    </section>
  );
}
