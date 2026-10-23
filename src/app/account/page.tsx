import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Package, UserRound } from "lucide-react";
import { store } from "@/lib/store-config";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";
import { SignInForm } from "@/components/checkout/SignInForm";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
  alternates: { canonical: "/account" },
};

const panels = [
  { icon: Package, title: "Order history", body: "Track deliveries, download invoices and reorder in one tap." },
  { icon: MapPin, title: "Saved addresses", body: "Store home and work addresses for faster checkout." },
  { icon: UserRound, title: "Profile", body: "Update your contact details and communication preferences." },
];

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <h1 className="display text-[clamp(3.6rem,9vw,7rem)]">Account</h1>
      {!store.authConfigured && (
        <PrototypeNotice className="mt-6 max-w-2xl">
          Customer accounts aren’t connected in this prototype. Sign-in, order history and address management activate once an authentication provider and order backend are configured.
        </PrototypeNotice>
      )}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <SignInForm />
        <ul className="grid gap-4">
          {panels.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-5 rounded-[1.6rem] border border-line bg-ink-2 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line text-lime">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">{title}</h2>
                <p className="mt-1 text-muted">{body}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted/70">Available after sign-in</p>
              </div>
            </li>
          ))}
          <li className="text-sm text-muted">
            Need help with an order? <Link href="/help/contact" className="text-lime underline underline-offset-4">Contact support</Link>.
          </li>
        </ul>
      </div>
    </div>
  );
}
