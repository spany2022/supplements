"use client";

import { useStore, quote, type ShippingMethod } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { Pack } from "@/components/product/Pack";

export function OrderSummary({
  method = "standard",
  code,
  compact,
}: {
  method?: ShippingMethod;
  code?: string;
  compact?: boolean;
}) {
  const { lines, subtotal } = useStore();
  const q = quote(subtotal, method, code);

  return (
    <div className="rounded-[1.6rem] border border-line bg-ink-2 p-6">
      <h2 className="heading text-2xl">Order summary</h2>
      {!compact && (
        <ul className="mt-5 divide-y divide-line">
          {lines.map((l) => (
            <li key={l.variantId} className="flex items-center gap-4 py-3">
              <span className="relative grid h-16 w-14 shrink-0 place-items-center rounded-xl bg-card">
                <Pack pack={l.product.pack} name={l.product.name} brand={l.product.brand} decorative shadow={false} className="h-14 w-auto" />
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[0.65rem] font-bold text-ink">
                  {l.qty}
                </span>
              </span>
              <span className="min-w-0 flex-1 text-sm">
                <span className="block truncate text-fg">{l.product.name}</span>
                <span className="block truncate text-muted">{[l.variant.flavor, l.variant.size].filter(Boolean).join(" · ")}</span>
              </span>
              <span className="text-sm text-fg">{formatINR(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd>{formatINR(subtotal)}</dd>
        </div>
        {q.discount && (
          <div className="flex justify-between text-lime">
            <dt>Discount ({q.discount.code})</dt>
            <dd>−{formatINR(q.discountAmount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted">Shipping ({method})</dt>
          <dd>{q.shipping === 0 ? "Free" : formatINR(q.shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-medium">Total</dt>
          <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-lime">{formatINR(q.total)}</dd>
        </div>
        <p className="text-xs text-muted">Prices include GST. Final tax breakdown is shown on your invoice.</p>
      </dl>
    </div>
  );
}
