"use client";

import { useState } from "react";
import { store } from "@/lib/store-config";
import { Button } from "@/components/ui/Button";

/** OTP-style sign-in shell. Does nothing until an auth provider is configured. */
export function SignInForm() {
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState<{ tone: "err" | "info"; text: string }>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) return setMsg({ tone: "err", text: "Enter a 10-digit Indian mobile number." });
    setMsg(
      store.authConfigured
        ? { tone: "info", text: "We’ve sent a one-time code to your phone." }
        : { tone: "info", text: "Prototype: no sign-in provider is connected, so no code was sent." },
    );
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-[1.6rem] border border-line bg-card p-7">
      <h2 className="heading text-3xl">Sign in</h2>
      <p className="mt-2 text-muted">Use your mobile number — we’ll send a one-time code.</p>
      <label htmlFor="signin-phone" className="mb-2 mt-7 block text-sm text-muted">
        Mobile number
      </label>
      <div className="flex h-12 items-center rounded-xl border border-line bg-ink focus-within:border-lime">
        <span className="pl-4 pr-2 text-muted">+91</span>
        <input
          id="signin-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          aria-invalid={msg?.tone === "err"}
          aria-describedby="signin-msg"
          className="h-full min-w-0 flex-1 bg-transparent pr-4 text-fg outline-none"
        />
      </div>
      <p id="signin-msg" aria-live="polite" className={msg?.tone === "err" ? "mt-2 min-h-5 text-xs text-danger" : "mt-2 min-h-5 text-xs text-amber-300"}>
        {msg?.text}
      </p>
      <Button type="submit" className="mt-4 w-full">
        Send code
      </Button>
    </form>
  );
}
