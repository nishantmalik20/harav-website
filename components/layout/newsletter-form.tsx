"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-7 font-body text-sm text-gold-light" role="status">
        You&rsquo;re on the list. Warmly.
      </p>
    );
  }

  return (
    <div className="mt-7 max-w-md">
      <form onSubmit={onSubmit} className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Your email
        </label>
      <Input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 border-gold/30 bg-white/5 text-ivory placeholder:text-ink-400 focus-visible:border-gold"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 bg-gold px-7 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-espresso transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === "loading" ? "…" : "Subscribe"}
      </button>
      </form>
      {status === "error" && (
        <p className="mt-2 font-body text-sm text-gold-light" role="alert">
          That email didn&rsquo;t take. Mind trying again?
        </p>
      )}
    </div>
  );
}
