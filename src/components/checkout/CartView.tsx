"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/cart";
import { CartLineItem } from "@/components/product/CartLineItem";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { FreeShippingMeter } from "@/components/layout/CartDrawer";
import { ButtonLink } from "@/components/ui/Button";

export function CartView() {
  const { lines, subtotal, hydrated } = useStore();

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <h1 className="display text-[clamp(3.6rem,9vw,7rem)]">Your cart</h1>
      {!hydrated ? (
        <p className="mt-10 text-muted">Loading your cart…</p>
      ) : lines.length === 0 ? (
        <div className="mt-10 flex flex-col items-start gap-6 rounded-[1.6rem] border border-dashed border-line p-10">
          <ShoppingBag className="h-8 w-8 text-lime" aria-hidden />
          <p className="text-lg text-muted">Your cart is empty. Start with our bestsellers or browse by goal.</p>
          <ButtonLink href="/shop">Shop supplements</ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <section aria-label="Cart items">
            <div className="rounded-[1.6rem] border border-line bg-ink-2 p-5">
              <FreeShippingMeter subtotal={subtotal} />
            </div>
            <ul className="mt-4 divide-y divide-line">
              {lines.map((l) => (
                <CartLineItem key={l.variantId} line={l} />
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-block text-sm text-muted underline underline-offset-4 hover:text-fg">
              ← Continue shopping
            </Link>
          </section>
          <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <OrderSummary compact />
            <ButtonLink href="/checkout" className="w-full">
              Proceed to checkout <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
