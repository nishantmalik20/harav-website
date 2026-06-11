"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { IntakeField } from "@/lib/intake";

export const selectClass =
  "flex h-12 w-full rounded-sm border border-espresso/15 bg-white px-4 font-body text-sm text-espresso focus-visible:border-gold-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-deep disabled:opacity-50";

interface IntakeFieldInputProps {
  field: IntakeField;
  value: string | string[] | undefined;
  error?: string;
  onChange: (fieldId: string, value: string | string[]) => void;
}

/** Renders one consultation question (radio group, checkbox group, select, or
 *  free text) in the site's form style, with its validation message. */
export function IntakeFieldInput({ field, value, error, onChange }: IntakeFieldInputProps) {
  const describedBy = error ? `intake-${field.id}-error` : undefined;

  const heading = (
    <>
      <span className="block font-body text-sm font-medium leading-snug text-espresso">
        {field.label}
      </span>
      {field.help && (
        <span className="mt-1 block font-body text-xs text-ink-400">{field.help}</span>
      )}
    </>
  );

  const errorLine = error ? (
    <p id={describedBy} className="mt-2 font-body text-xs text-error" role="alert">
      {error}
    </p>
  ) : null;

  if (field.kind === "radio" || field.kind === "checkboxes") {
    const isMulti = field.kind === "checkboxes";
    const exclusive = field.kind === "checkboxes" ? field.exclusiveOption : undefined;
    const selected = isMulti ? (Array.isArray(value) ? value : []) : value;

    function toggle(option: string) {
      if (!isMulti) {
        onChange(field.id, option);
        return;
      }
      const current = Array.isArray(selected) ? selected : [];
      let next: string[];
      if (current.includes(option)) {
        next = current.filter((v) => v !== option);
      } else if (exclusive && option === exclusive) {
        next = [option];
      } else {
        next = [...current.filter((v) => v !== exclusive), option];
      }
      onChange(field.id, next);
    }

    return (
      // min-w-0 + floated legend: fieldsets default to min-width:min-content and
      // legends have non-wrapping quirks, which blow out the layout on phones.
      <fieldset id={`intake-${field.id}`} aria-describedby={describedBy} className="min-w-0">
        <legend className="float-left w-full">{heading}</legend>
        <div
          className={cn(
            "clear-both mt-3 grid gap-2",
            field.options.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 sm:max-w-xs",
          )}
        >
          {field.options.map((option) => {
            const checked = isMulti
              ? Array.isArray(selected) && selected.includes(option)
              : selected === option;
            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-sm border px-3.5 py-2.5 font-body text-sm leading-snug transition-colors",
                  checked
                    ? "border-gold-deep bg-cream/70 text-espresso"
                    : "border-espresso/15 bg-white text-ink-600 hover:border-gold/60",
                )}
              >
                <input
                  type={isMulti ? "checkbox" : "radio"}
                  name={`intake-${field.id}`}
                  value={option}
                  checked={checked}
                  onChange={() => toggle(option)}
                  className="size-4 shrink-0 accent-gold-deep"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errorLine}
      </fieldset>
    );
  }

  if (field.kind === "select") {
    return (
      <div id={`intake-${field.id}`}>
        <label htmlFor={`intake-${field.id}-select`}>{heading}</label>
        <select
          id={`intake-${field.id}-select`}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          aria-describedby={describedBy}
          className={cn(selectClass, "mt-3")}
        >
          <option value="" disabled>
            Choose an option…
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errorLine}
      </div>
    );
  }

  // text / textarea
  const common = {
    id: `intake-${field.id}-input`,
    value: typeof value === "string" ? value : "",
    placeholder: field.placeholder,
    "aria-describedby": describedBy,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(field.id, e.target.value),
  };

  return (
    <div id={`intake-${field.id}`}>
      <label htmlFor={common.id}>{heading}</label>
      <div className="mt-3">
        {field.kind === "textarea" ? <Textarea rows={3} {...common} /> : <Input {...common} />}
      </div>
      {errorLine}
    </div>
  );
}
