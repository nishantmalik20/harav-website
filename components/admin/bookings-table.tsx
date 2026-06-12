"use client";

import { Fragment, useState, useTransition } from "react";
import {
  confirmBooking,
  completeBooking,
  cancelBooking,
  noShowBooking,
} from "@/app/admin/actions";
import { INTAKE_FORMS, intakeSummary, isUnder18 } from "@/lib/intake";
import type { BookingRow, BookingStatus } from "@/types/database";
import { cn } from "@/lib/utils";

type Tab = "upcoming" | "past" | "all";

const STATUS_STYLES: Record<BookingStatus, string> = {
  new: "bg-gold/15 text-gold-deep",
  confirmed: "bg-success/15 text-success",
  completed: "bg-espresso/10 text-ink-600",
  no_show: "bg-warn/15 text-warn",
  cancelled: "bg-error/10 text-error",
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "New",
  confirmed: "Confirmed",
  completed: "Completed",
  no_show: "No-show",
  cancelled: "Cancelled",
};

export function BookingsTable({ bookings }: { bookings: BookingRow[] }) {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [openIntakeId, setOpenIntakeId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings.filter((b) => {
    const done = b.status === "cancelled" || b.status === "completed";
    if (tab === "upcoming") return b.preferred_date >= today && !done;
    if (tab === "past") return b.preferred_date < today || done;
    return true;
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "all", label: "All" },
  ];

  return (
    <div>
      <div className="mb-5 flex gap-1 border-b border-espresso/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "px-4 py-2.5 font-body text-xs uppercase tracking-[0.16em] transition-colors",
              tab === t.id
                ? "border-b-2 border-espresso text-espresso"
                : "text-ink-400 hover:text-espresso",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center font-body text-sm text-ink-400">No bookings here yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-espresso/10">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-cream/40 font-body text-[11px] uppercase tracking-[0.12em] text-ink-500">
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Treatment</th>
                <th className="px-4 py-3 font-medium">Deposit</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Manage</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm text-ink-600">
              {filtered.map((b) => (
                <Fragment key={b.id}>
                <tr className="border-t border-espresso/[0.08] align-top">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-espresso">{b.preferred_date}</div>
                    <div className="text-ink-400">{b.preferred_time}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-espresso">{b.customer_name}</div>
                    {b.intake && isUnder18(INTAKE_FORMS[b.intake_form], b.intake) && (
                      <span className="my-0.5 inline-block rounded-full bg-warn/15 px-2 py-0.5 text-[11px] font-medium text-warn">
                        Under 18 — call to confirm
                      </span>
                    )}
                    <div className="text-ink-400">{b.customer_phone}</div>
                    <div className="text-ink-400">{b.customer_email}</div>
                    {b.notes && <div className="mt-1 max-w-xs text-xs italic text-ink-400">{b.notes}</div>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-espresso">{b.service_name}</div>
                    <div className="text-ink-400">{b.service_category}</div>
                    {b.intake && b.intake_form !== "general" && (
                      <button
                        type="button"
                        onClick={() => setOpenIntakeId(openIntakeId === b.id ? null : b.id)}
                        className="mt-1.5 font-body text-[11px] uppercase tracking-[0.1em] text-gold-deep underline-offset-2 hover:underline"
                      >
                        {openIntakeId === b.id ? "Hide consultation" : "View consultation"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {b.deposit_required ? (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px]",
                          b.deposit_status === "paid"
                            ? "bg-success/15 text-success"
                            : "bg-warn/15 text-warn",
                        )}
                      >
                        ${b.deposit_amount} {b.deposit_status}
                      </span>
                    ) : (
                      <span className="text-ink-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                        STATUS_STYLES[b.status],
                      )}
                    >
                      {STATUS_LABEL[b.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      <Action label="Confirm" disabled={isPending} onClick={() => startTransition(() => confirmBooking(b.id))} />
                      <Action label="Complete" disabled={isPending} onClick={() => startTransition(() => completeBooking(b.id))} />
                      <Action label="No-show" disabled={isPending} onClick={() => startTransition(() => noShowBooking(b.id))} />
                      <Action label="Cancel" disabled={isPending} onClick={() => startTransition(() => cancelBooking(b.id))} />
                    </div>
                  </td>
                </tr>
                {openIntakeId === b.id && b.intake && (
                  <tr className="border-t border-espresso/[0.05] bg-cream/30">
                    <td colSpan={6} className="px-4 py-5">
                      <p className="font-body text-[11px] uppercase tracking-[0.14em] text-gold-deep">
                        {INTAKE_FORMS[b.intake_form]?.title ?? "Consultation"}
                      </p>
                      <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        {intakeSummary(b.intake_form, b.intake).map((q) => (
                          <div key={q.label}>
                            <dt className="font-body text-xs text-ink-400">{q.label}</dt>
                            <dd className="mt-0.5 font-body text-sm text-espresso">{q.value}</dd>
                          </div>
                        ))}
                      </dl>
                      {b.consented_at && (
                        <p className="mt-4 font-body text-xs text-ink-400">
                          Consent confirmed online · {new Date(b.consented_at).toLocaleString()}
                        </p>
                      )}
                    </td>
                  </tr>
                )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Action({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-sm border border-espresso/15 px-2.5 py-1 font-body text-[11px] text-ink-600 transition-colors hover:border-gold-deep hover:text-gold-deep disabled:opacity-40"
    >
      {label}
    </button>
  );
}
