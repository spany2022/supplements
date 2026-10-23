"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Lock, ShoppingBag } from "lucide-react";
import { useStore, quote, type ShippingMethod } from "@/lib/cart";
import { cx, formatINR } from "@/lib/format";
import { store } from "@/lib/store-config";
import { Button, ButtonLink } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";

const states = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

type Form = {
  email: string;
  phone: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
};

const empty: Form = { email: "", phone: "", name: "", line1: "", line2: "", city: "", state: "", pin: "" };

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(f.phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, ""))) e.phone = "Enter a 10-digit Indian mobile number.";
  if (f.name.trim().length < 2) e.name = "Enter the recipient’s full name.";
  if (f.line1.trim().length < 5) e.line1 = "Enter house / flat number and street.";
  if (f.city.trim().length < 2) e.city = "Enter a city.";
  if (!f.state) e.state = "Select a state.";
  if (!/^[1-9]\d{5}$/.test(f.pin.trim())) e.pin = "Enter a valid 6-digit PIN code.";
  return e;
}

export function CheckoutView() {
  const { lines, subtotal, hydrated } = useStore();
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [method, setMethod] = useState<ShippingMethod>("standard");
  const [codeInput, setCodeInput] = useState("");
  const [code, setCode] = useState<string>();
  const [codeMsg, setCodeMsg] = useState<string>();
  const [payment, setPayment] = useState("upi");
  const [result, setResult] = useState<"prototype" | "stock" | null>(null);

  const errors = validate(form);
  const showErr = (k: keyof Form) => (touched[k] ? errors[k] : undefined);
  const q = quote(subtotal, method, code);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const applyCode = () => {
    const match = store.discountCodes.find((d) => d.code === codeInput.trim().toUpperCase());
    if (match) {
      setCode(match.code);
      setCodeMsg(`${match.label} applied.`);
    } else {
      setCode(undefined);
      setCodeMsg("That code isn’t valid.");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(Object.fromEntries(Object.keys(form).map((k) => [k, true])));
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      document.getElementById(`co-${first}`)?.focus();
      return;
    }
    // Re-validate stock before handing off to payment.
    if (lines.some((l) => l.qty > l.variant.stock)) return setResult("stock");
    if (!store.paymentsConfigured) return setResult("prototype");
    // A configured gateway (e.g. Razorpay / Cashfree) would create the order server-side here.
  };

  if (!hydrated) return <p className="mx-auto max-w-[1200px] px-4 py-24 text-muted">Loading checkout…</p>;

  if (lines.length === 0)
    return (
      <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6 lg:px-10">
        <h1 className="display text-[clamp(3.6rem,9vw,7rem)]">Checkout</h1>
        <div className="mt-10 flex flex-col items-start gap-6 rounded-[1.6rem] border border-dashed border-line p-10">
          <ShoppingBag className="h-8 w-8 text-lime" aria-hidden />
          <p className="text-lg text-muted">Your cart is empty — add something before checking out.</p>
          <ButtonLink href="/shop">Shop supplements</ButtonLink>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-[clamp(3.6rem,9vw,7rem)]">Checkout</h1>
        <p className="flex items-center gap-2 text-sm text-muted">
          <Lock className="h-4 w-4 text-lime" aria-hidden /> Secure checkout
        </p>
      </div>

      {!store.paymentsConfigured && (
        <p role="note" className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-300/30 bg-amber-300/5 p-4 text-sm text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Prototype checkout: no payment gateway or order backend is connected. You can review the flow, but no order will be placed and nothing will be charged.
        </p>
      )}

      <form onSubmit={submit} noValidate className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <Step n={1} title="Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set("email")} onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={showErr("email")} />
              <Field id="phone" label="Mobile number" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set("phone")} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} error={showErr("phone")} hint="For delivery updates" />
            </div>
          </Step>

          <Step n={2} title="Delivery address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="sm:col-span-2" id="name" label="Full name" autoComplete="name" value={form.name} onChange={set("name")} onBlur={() => setTouched((t) => ({ ...t, name: true }))} error={showErr("name")} />
              <Field className="sm:col-span-2" id="line1" label="Flat / house no., street" autoComplete="address-line1" value={form.line1} onChange={set("line1")} onBlur={() => setTouched((t) => ({ ...t, line1: true }))} error={showErr("line1")} />
              <Field className="sm:col-span-2" id="line2" label="Area, landmark (optional)" autoComplete="address-line2" value={form.line2} onChange={set("line2")} />
              <Field id="city" label="City" autoComplete="address-level2" value={form.city} onChange={set("city")} onBlur={() => setTouched((t) => ({ ...t, city: true }))} error={showErr("city")} />
              <Field id="pin" label="PIN code" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={form.pin} onChange={set("pin")} onBlur={() => setTouched((t) => ({ ...t, pin: true }))} error={showErr("pin")} />
              <div className="sm:col-span-2">
                <label htmlFor="co-state" className="mb-2 block text-sm text-muted">
                  State
                </label>
                <select
                  id="co-state"
                  value={form.state}
                  onChange={set("state")}
                  onBlur={() => setTouched((t) => ({ ...t, state: true }))}
                  aria-invalid={!!showErr("state")}
                  aria-describedby={showErr("state") ? "co-state-err" : undefined}
                  className={cx("h-12 w-full rounded-xl border bg-ink-2 px-4 text-fg outline-none focus:border-lime", showErr("state") ? "border-danger" : "border-line")}
                >
                  <option value="">Select state</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {showErr("state") && (
                  <p id="co-state-err" className="mt-1.5 text-xs text-danger">
                    {showErr("state")}
                  </p>
                )}
              </div>
            </div>
          </Step>

          <Step n={3} title="Shipping method">
            <div className="grid gap-3">
              {(
                [
                  ["standard", "Standard", store.shipping.standardEta, subtotal - q.discountAmount >= store.shipping.freeThreshold ? "Free" : formatINR(store.shipping.standardFee)],
                  ["express", "Express", store.shipping.expressEta, formatINR(store.shipping.expressFee)],
                ] as const
              ).map(([value, label, eta, price]) => (
                <label key={value} className={cx("flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime", method === value ? "border-lime bg-lime/5" : "border-line hover:border-white/30")}>
                  <input type="radio" name="shipping" value={value} checked={method === value} onChange={() => setMethod(value)} className="accent-[#b6f23a]" />
                  <span className="flex-1">
                    <span className="block font-medium text-fg">{label}</span>
                    <span className="text-sm text-muted">{eta}</span>
                  </span>
                  <span className="font-semibold text-fg">{price}</span>
                </label>
              ))}
            </div>
          </Step>

          <Step n={4} title="Payment">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["upi", "UPI"],
                ["card", "Card"],
                ["netbanking", "Net banking"],
              ].map(([value, label]) => (
                <label key={value} className={cx("flex cursor-pointer items-center gap-3 rounded-2xl border p-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime", payment === value ? "border-lime bg-lime/5" : "border-line hover:border-white/30")}>
                  <input type="radio" name="payment" value={value} checked={payment === value} onChange={() => setPayment(value)} className="accent-[#b6f23a]" />
                  <span className="text-fg">{label}</span>
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              You’ll complete payment on the payment provider’s secure page. Card details are never entered on or stored by this site.
            </p>
          </Step>
        </div>

        <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <OrderSummary method={method} code={code} />
          <div className="rounded-[1.6rem] border border-line bg-ink-2 p-5">
            <label htmlFor="co-code" className="mb-2 block text-sm text-muted">
              Discount code
            </label>
            <div className="flex gap-2">
              <input
                id="co-code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCode())}
                className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-ink px-4 uppercase text-fg outline-none focus:border-lime"
                aria-describedby="co-code-msg"
              />
              <button type="button" onClick={applyCode} className="h-12 rounded-xl border border-line px-5 text-sm hover:border-lime hover:text-lime">
                Apply
              </button>
            </div>
            <p id="co-code-msg" className={cx("mt-2 min-h-4 text-xs", code ? "text-lime" : "text-muted")} aria-live="polite">
              {codeMsg ?? (store.isPrototype ? "Prototype: try DEMO10." : "")}
            </p>
          </div>
          <Button type="submit" className="h-14 w-full">
            Place order · {formatINR(q.total)}
          </Button>
          <p className="text-center text-xs text-muted">
            By placing your order you agree to our <Link href="/help/terms" className="underline">terms</Link> and{" "}
            <Link href="/help/privacy" className="underline">privacy policy</Link>.
          </p>
        </div>
      </form>

      <AnimatePresence>
        {result && (
          <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="alertdialog" aria-modal="true" aria-labelledby="result-title" aria-describedby="result-body">
            <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setResult(null)} />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="relative w-full max-w-lg rounded-[1.8rem] border border-line bg-ink-2 p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-300/10 text-amber-300">
                <AlertTriangle className="h-6 w-6" aria-hidden />
              </span>
              {result === "prototype" ? (
                <>
                  <h2 id="result-title" className="heading mt-6 text-3xl">Order not placed</h2>
                  <div id="result-body" className="mt-4 space-y-3 text-muted">
                    <p>
                      Your details passed validation, but this is a prototype: <strong className="text-fg">no payment gateway is connected</strong>, so no order was created and you were not charged.
                    </p>
                    <p className="text-sm">
                      To go live, connect a payment provider and order backend, then set <code className="rounded bg-card px-1.5 py-0.5 text-lime">paymentsConfigured</code> in the store config.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 id="result-title" className="heading mt-6 text-3xl">Stock has changed</h2>
                  <p id="result-body" className="mt-4 text-muted">Some items in your cart are no longer available in the quantity requested. Please review your cart.</p>
                </>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => setResult(null)} autoFocus>
                  Back to checkout
                </Button>
                <ButtonLink href="/cart" variant="ghost">
                  View cart
                </ButtonLink>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-[1.6rem] border border-line bg-ink-2 p-6 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden className="mb-6 flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-sm text-ink">{n}</span>
        {title}
      </p>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  className,
  ...input
}: { id: string; label: string; error?: string; hint?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [error && `co-${id}-err`, hint && `co-${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={`co-${id}`} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <input
        id={`co-${id}`}
        {...input}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={cx("h-12 w-full rounded-xl border bg-ink px-4 text-fg outline-none transition-colors focus:border-lime", error ? "border-danger" : "border-line")}
      />
      {hint && !error && (
        <p id={`co-${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`co-${id}-err`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
