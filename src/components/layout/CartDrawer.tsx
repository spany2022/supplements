"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useStore } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { store } from "@/lib/store-config";
import { CartLineItem } from "@/components/product/CartLineItem";
import { ButtonLink } from "@/components/ui/Button";

export function FreeShippingMeter({ subtotal }: { subtotal: number }) {
  const threshold = store.shipping.freeThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  return (
    <div>
      <p className="text-sm text-muted">
        {remaining > 0 ? (
          <>
            Add <span className="font-semibold text-fg">{formatINR(remaining)}</span> more for free standard shipping
          </>
        ) : (
          <span className="text-lime">Your order qualifies for free standard shipping</span>
        )}
      </p>
      <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
        <motion.div className="h-full rounded-full bg-lime" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { drawerOpen, setDrawerOpen, lines, subtotal, count } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = () => setDrawerOpen(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      prev?.focus();
    };
  }, [drawerOpen, setDrawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <div className="fixed inset-0 z-[90]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-ink-2"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
                Your cart <span className="text-muted">({count})</span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg hover:border-lime hover:text-lime"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-card text-lime">
                  <ShoppingBag className="h-7 w-7" aria-hidden />
                </span>
                <p className="text-muted">Your cart is empty.</p>
                <ButtonLink href="/shop" onClick={close}>
                  Shop supplements
                </ButtonLink>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <FreeShippingMeter subtotal={subtotal} />
                </div>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {lines.map((l) => (
                    <CartLineItem key={l.variantId} line={l} onNavigate={close} />
                  ))}
                </ul>
                <div className="space-y-4 border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-[family-name:var(--font-display)] text-xl font-bold">{formatINR(subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted">Shipping and discounts are calculated at checkout. Prices include GST.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <ButtonLink href="/cart" variant="ghost" onClick={close}>
                      View cart
                    </ButtonLink>
                    <ButtonLink href="/checkout" onClick={close}>
                      Checkout
                    </ButtonLink>
                  </div>
                  <Link href="/shop" onClick={close} className="block text-center text-xs text-muted underline-offset-4 hover:text-fg hover:underline">
                    Continue shopping
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
