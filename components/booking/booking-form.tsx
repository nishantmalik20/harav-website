"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES, DEPOSIT_AMOUNT } from "@/lib/services";
import { BUSINESS_HOURS } from "@/lib/site";

const SEP = "~~~";

function generateSlots(dateStr: string) {
  if (!dateStr) return [] as { value: string; label: string }[];
  const date = new Date(`${dateStr}T00:00:00`);
  const hours = BUSINESS_HOURS[date.getDay()];
  if (!hours) return [];
  const [openH, openM] = hours.open.split(":").map(Number);
  const [closeH, closeM] = hours.close.split(":").map(Number);
  const end = closeH * 60 + closeM;
  const slots: { value: string; label: string }[] = [];
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

const selectClass =
  "flex h-12 w-full rounded-sm border border-espresso/15 bg-white px-4 font-body text-sm text-espresso focus-visible:border-gold-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep";

export function BookingForm() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [serviceValue, setServiceValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const slots = useMemo(() => generateSlots(date), [date]);

  const selected = useMemo(() => {
    if (!serviceValue) return null;
    const [categoryName, serviceName] = serviceValue.split(SEP);
    const category = SERVICE_CATEGORIES.find((c) => c.name === categoryName);
    const service = category?.services.find((s) => s.name === serviceName);
    return service ? { categoryName, service } : null;
  }, [serviceValue]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selected || !date || !time) return;
    const form = new FormData(e.currentTarget);
    setStatus("loading");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          serviceCategory: selected.categoryName,
          serviceName: selected.service.name,
          date,
          time,
          notes: form.get("notes") || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();

      if (data.requiresDeposit && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      router.push(`/book/success?booking=${data.bookingId ?? ""}`);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {/* Service */}
      <div className="space-y-2">
        <Label htmlFor="service">Which treatment?</Label>
        <select
          id="service"
          required
          value={serviceValue}
          onChange={(e) => setServiceValue(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>
            Choose a treatment…
          </option>
          {SERVICE_CATEGORIES.map((category) => (
            <optgroup key={category.slug} label={category.name}>
              {category.services.map((service) => (
                <option key={service.name} value={`${category.name}${SEP}${service.name}`}>
                  {service.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Date + time */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Preferred date</Label>
          <Input
            id="date"
            type="date"
            required
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime("");
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Preferred time</Label>
          <select
            id="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!date}
            className={`${selectClass} disabled:opacity-50`}
          >
            <option value="" disabled>
              {date ? "Choose a time…" : "Pick a date first"}
            </option>
            {slots.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required placeholder="(204) 000-0000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Anything we should know before your visit: sensitivities, first time, an occasion."
        />
      </div>

      {/* Deposit notice */}
      {selected && (
        <p className="rounded-sm border border-gold/30 bg-cream/50 px-4 py-3 font-body text-sm leading-relaxed text-ink-600">
          {selected.service.deposit
            ? `A $${DEPOSIT_AMOUNT} deposit holds this appointment. Non-refundable, and applied to your total on the day. You'll add it securely at the next step.`
            : "This treatment books with no deposit. We'll confirm by email."}
        </p>
      )}

      {status === "error" && (
        <p className="font-body text-sm text-error" role="alert">
          That didn&rsquo;t go through. Try again, or call us at 431-570-1420 and we&rsquo;ll book you in.
        </p>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? "Holding your hour…" : "Reserve my hour"}
        <ArrowUpRight className="size-4" strokeWidth={2.4} />
      </Button>
    </form>
  );
}
