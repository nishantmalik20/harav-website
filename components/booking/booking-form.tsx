"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IntakeFieldInput, selectClass } from "@/components/booking/intake-fields";
import { SERVICE_CATEGORIES, DEPOSIT_AMOUNT } from "@/lib/services";
import { generateSlots } from "@/lib/availability";
import {
  INTAKE_FORMS,
  intakeFormIdForService,
  requiresQuestionnaire,
  validateIntake,
  sanitizeIntake,
  isFieldVisible,
  isUnder18,
  CONSENT_STATEMENT,
  CANCELLATION_NOTE,
  UNDER_18_MESSAGE,
  AGE_FIELD_ID,
  type IntakeAnswers,
} from "@/lib/intake";
import { cn } from "@/lib/utils";

const SEP = "~~~";

const STEPS = ["Treatment", "Date & time", "Your details", "Consultation"];

export function BookingForm() {
  const router = useRouter();
  // en-CA formats as YYYY-MM-DD in the *device's* timezone — toISOString would
  // roll an evening guest in Winnipeg over to tomorrow (it's UTC).
  const today = new Date().toLocaleDateString("en-CA");
  const topRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState(0);
  const [serviceValue, setServiceValue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [answers, setAnswers] = useState<IntakeAnswers>({});
  const [consent, setConsent] = useState(false);
  const [stepError, setStepError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [taken, setTaken] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const [availabilityRefresh, setAvailabilityRefresh] = useState(0);

  const slots = useMemo(() => {
    const all = generateSlots(date);
    if (date !== today) return all;
    // Same-day bookings can't reach into the past.
    const now = new Date();
    const nowHM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return all.filter((s) => s.value > nowHM);
  }, [date, today]);

  // One esthetician — a slot someone else holds must read as unavailable.
  useEffect(() => {
    if (!date) {
      setTaken([]);
      return;
    }
    let active = true;
    setChecking(true);
    fetch(`/api/bookings/availability?date=${date}`)
      .then((r) => r.json())
      .then((d) => {
        if (active && d?.ok && Array.isArray(d.taken)) setTaken(d.taken);
      })
      .catch(() => {
        // Fail open — the booking POST re-checks and is the source of truth.
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [date, availabilityRefresh]);

  useEffect(() => {
    if (time && taken.includes(time)) setTime("");
  }, [taken, time]);

  const selected = useMemo(() => {
    if (!serviceValue) return null;
    const [categoryName, serviceName] = serviceValue.split(SEP);
    const category = SERVICE_CATEGORIES.find((c) => c.name === categoryName);
    const service = category?.services.find((s) => s.name === serviceName);
    return category && service ? { category, service } : null;
  }, [serviceValue]);

  const intakeForm = useMemo(() => {
    if (!selected) return INTAKE_FORMS.general;
    return INTAKE_FORMS[intakeFormIdForService(selected.category.slug, selected.service.name)];
  }, [selected]);

  const hasQuestionnaire = requiresQuestionnaire(intakeForm.id);
  const under18 = isUnder18(intakeForm, answers);

  function onSelectService(value: string) {
    const prevFormId = intakeForm.id;
    setServiceValue(value);
    const [categoryName, serviceName] = value.split(SEP);
    const category = SERVICE_CATEGORIES.find((c) => c.name === categoryName);
    const nextFormId = category
      ? intakeFormIdForService(category.slug, serviceName)
      : "general";
    // A different consultation means the previous answers no longer apply.
    if (nextFormId !== prevFormId) {
      setAnswers({});
      setFieldErrors({});
      setConsent(false);
    }
    setStepError("");
  }

  function goTo(next: number) {
    setStep(next);
    setStepError("");
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function next() {
    if (step === 0) {
      if (!selected) {
        setStepError("Please choose a treatment to continue.");
        return;
      }
    }
    if (step === 1) {
      if (!date || !time) {
        setStepError("Please pick a date and a time to continue.");
        return;
      }
    }
    if (step === 2) {
      if (!name.trim()) return setStepError("Please add your name.");
      if (!/^\S+@\S+\.\S+$/.test(email)) return setStepError("Please add a valid email address.");
      if (phone.trim().length < 7) return setStepError("Please add a phone number we can reach you at.");
    }
    goTo(step + 1);
  }

  function onAnswer(fieldId: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
    setFieldErrors((prev) => {
      if (!prev[fieldId]) return prev;
      const rest = { ...prev };
      delete rest[fieldId];
      return rest;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // One submit handler for every step: advancing and booking share the same
    // button, so a mid-event type swap can't double-fire (and Enter advances).
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    if (!selected || !date || !time || status === "loading") return;

    const errors = validateIntake(intakeForm, answers);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStepError("A few questions still need an answer — they're marked below.");
      const firstId = Object.keys(errors)[0];
      document.getElementById(`intake-${firstId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!consent) {
      setStepError("Please confirm the acknowledgement to complete your booking.");
      return;
    }

    setStepError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceCategory: selected.category.name,
          serviceName: selected.service.name,
          date,
          time,
          notes: notes.trim() || undefined,
          intake: { formId: intakeForm.id, answers: sanitizeIntake(intakeForm, answers) },
          consent: true,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.status === 409) {
        // Someone took the slot while this guest was filling the form — send
        // them back to the time step with fresh availability.
        setStatus("idle");
        setTime("");
        setAvailabilityRefresh((n) => n + 1);
        goTo(1);
        setStepError(data?.error || "That time was just booked — please choose another.");
        return;
      }
      if (!res.ok || !data?.ok) throw new Error();

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
    <form onSubmit={onSubmit} className="scroll-mt-28" noValidate ref={topRef}>
      {/* Progress */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Booking steps">
        {STEPS.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} className="flex flex-1 flex-col gap-2">
              <span
                className={cn(
                  "h-0.5 w-full rounded-full transition-colors",
                  done || current ? "bg-gold-deep" : "bg-espresso/10",
                )}
              />
              <span
                className={cn(
                  "flex items-center gap-1.5 font-body text-[11px] uppercase tracking-[0.12em]",
                  current ? "text-espresso" : done ? "text-gold-deep" : "text-ink-300",
                )}
              >
                {done && <Check className="size-3" strokeWidth={3} />}
                <span className="hidden sm:inline">{label}</span>
                {current && <span className="sm:hidden">{label}</span>}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Step 1 — Treatment */}
      {step === 0 && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="service">Which treatment?</Label>
            <select
              id="service"
              required
              value={serviceValue}
              onChange={(e) => onSelectService(e.target.value)}
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

          {selected && (
            <p className="rounded-sm border border-gold/30 bg-cream/50 px-4 py-3 font-body text-sm leading-relaxed text-ink-600">
              {selected.service.deposit
                ? `A $${DEPOSIT_AMOUNT} deposit holds this appointment. Non-refundable, and applied to your total on the day. You'll add it securely at the last step.`
                : "This treatment books with no deposit. We'll confirm by email."}
              {hasQuestionnaire &&
                ` This treatment includes a short consultation — a few quick questions before you confirm.`}
            </p>
          )}
        </div>
      )}

      {/* Step 2 — Date & time */}
      {step === 1 && (
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
              disabled={!date || checking}
              className={cn(selectClass, "disabled:opacity-50")}
            >
              <option value="" disabled>
                {!date ? "Pick a date first" : checking ? "Checking times…" : "Choose a time…"}
              </option>
              {slots.map((slot) => {
                const isTaken = taken.includes(slot.value);
                return (
                  <option key={slot.value} value={slot.value} disabled={isTaken}>
                    {isTaken ? `${slot.label} — booked` : slot.label}
                  </option>
                );
              })}
            </select>
            {date && !checking && slots.length === 0 && (
              <p className="font-body text-sm text-ink-500">
                No times left that day — please pick another date.
              </p>
            )}
            {date && !checking && slots.length > 0 && slots.every((s) => taken.includes(s.value)) && (
              <p className="font-body text-sm text-ink-500">
                That day is fully booked — please try another date.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Step 3 — Your details */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" required placeholder="(204) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Anything we should know before your visit: sensitivities, first time, an occasion."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Step 4 — Consultation & consent */}
      {step === 3 && (
        <div className="space-y-9">
          <div>
            <h2 className="font-display text-2xl text-espresso">{intakeForm.title}</h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-ink-500">{intakeForm.intro}</p>
          </div>

          {intakeForm.sections.map((section) => (
            <section key={section.title} className="space-y-6">
              <h3 className="border-b border-espresso/10 pb-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-gold-deep">
                {section.title}
              </h3>
              {section.fields
                .filter((field) => isFieldVisible(field, answers))
                .map((field) => (
                  <IntakeFieldInput
                    key={field.id}
                    field={field}
                    value={answers[field.id]}
                    error={fieldErrors[field.id]}
                    onChange={onAnswer}
                  />
                ))}
              {section.fields.some((f) => f.id === AGE_FIELD_ID) && under18 && (
                <p className="rounded-sm border border-warn/40 bg-warn/10 px-4 py-3 font-body text-sm leading-relaxed text-ink-600" role="alert">
                  {UNDER_18_MESSAGE}
                </p>
              )}
            </section>
          ))}

          {/* Acknowledgements + consent */}
          <section className="rounded-md border border-espresso/10 bg-cream/40 p-5 sm:p-6">
            <h3 className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold-deep">
              Please read before booking
            </h3>
            <ul className="mt-4 space-y-3">
              {intakeForm.acknowledgements.map((item, i) => (
                <li key={i} className="flex gap-3 font-body text-sm leading-relaxed text-ink-600">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-deep" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-espresso/10 pt-4 font-body text-xs leading-relaxed text-ink-400">
              {CANCELLATION_NOTE}
            </p>
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-sm border border-gold/40 bg-white px-4 py-3.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 size-4 shrink-0 accent-gold-deep"
              />
              <span className="font-body text-sm leading-relaxed text-espresso">{CONSENT_STATEMENT}</span>
            </label>
          </section>

          {selected?.service.deposit && (
            <p className="font-body text-sm leading-relaxed text-ink-500">
              Next, you&rsquo;ll be taken to a secure checkout for the ${DEPOSIT_AMOUNT} deposit — it
              comes off your total on the day.
            </p>
          )}
        </div>
      )}

      {/* Errors */}
      {stepError && (
        <p className="mt-5 font-body text-sm text-error" role="alert">
          {stepError}
        </p>
      )}
      {status === "error" && (
        <p className="mt-5 font-body text-sm text-error" role="alert">
          That didn&rsquo;t go through. Try again, or call us at 431-570-1420 and we&rsquo;ll book you in.
        </p>
      )}

      {/* Navigation — stacks on phones so the wide submit label can't force
          the form past the viewport (buttons are whitespace-nowrap). */}
      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="inline-flex items-center gap-1.5 self-start font-body text-sm text-ink-500 transition-colors hover:text-espresso"
          >
            <ArrowLeft className="size-4" strokeWidth={2.2} />
            Back
          </button>
        ) : (
          <span className="hidden sm:block" />
        )}

        <Button
          type="submit"
          className="w-full sm:w-auto"
          disabled={status === "loading"}
        >
          {step < STEPS.length - 1
            ? "Continue"
            : status === "loading"
              ? "Booking your appointment…"
              : selected?.service.deposit
                ? "Continue to deposit"
                : "Book my appointment"}
          <ArrowUpRight className="size-4" strokeWidth={2.4} />
        </Button>
      </div>
    </form>
  );
}
