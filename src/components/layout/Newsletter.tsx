"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { store } from "@/lib/store-config";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setState("invalid");
    setState("done");
  };

  return (
    <form onSubmit={submit} noValidate className="w-full max-w-md">
      <label htmlFor="newsletter-email" className="eyebrow mb-3 block text-muted">
        Newsletter
      </label>
      <div className="flex items-center rounded-full border border-line bg-ink-2 p-1.5 focus-within:border-lime">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "idle") setState("idle");
          }}
          placeholder="you@example.com"
          aria-invalid={state === "invalid"}
          aria-describedby="newsletter-msg"
          className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-fg outline-none placeholder:text-muted/60"
        />
        <button
          type="submit"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-lime text-ink transition-colors hover:bg-[#c6ff52]"
          aria-label="Subscribe"
        >
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <p id="newsletter-msg" className="mt-3 min-h-5 text-xs" aria-live="polite">
        {state === "invalid" && <span className="text-danger">Please enter a valid email address.</span>}
        {state === "done" &&
          (store.newsletterConfigured ? (
            <span className="text-lime">You’re subscribed. Check your inbox to confirm.</span>
          ) : (
            <span className="text-amber-300">Prototype: no email provider is connected yet, so this address was not saved.</span>
          ))}
        {state === "idle" && <span className="text-muted">New launches and buying guides. No spam — unsubscribe any time.</span>}
      </p>
    </form>
  );
}
