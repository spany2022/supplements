"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore, type ResolvedLine } from "@/lib/cart";
import { formatINR } from "@/lib/format";
import { Pack } from "./Pack";

export function CartLineItem({ line, onNavigate }: { line: ResolvedLine; onNavigate?: () => void }) {
  const { setQty, remove } = useStore();
  const { product, variant, qty } = line;
  const max = Math.min(variant.stock, 10);
  const label = [variant.flavor, variant.size].filter(Boolean).join(" · ");

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/products/${product.slug}`}
        onClick={onNavigate}
        className="grid h-24 w-20 shrink-0 place-items-center rounded-2xl bg-card"
        tabIndex={-1}
        aria-hidden
      >
        <Pack pack={product.pack} name={product.name} brand={product.brand} decorative shadow={false} className="h-20 w-auto" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${product.slug}`} onClick={onNavigate} className="font-medium text-fg hover:text-lime">
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-muted">{label}</p>
          </div>
          <p className="shrink-0 font-semibold text-fg">{formatINR(line.lineTotal)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-full border border-line" role="group" aria-label={`Quantity for ${product.name}`}>
            <button
              type="button"
              onClick={() => setQty(variant.id, qty - 1)}
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:text-fg"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden />
            </button>
            <span className="w-7 text-center text-sm tabular-nums text-fg" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(variant.id, qty + 1)}
              disabled={qty >= max}
              className="grid h-9 w-9 place-items-center rounded-full text-muted hover:text-fg disabled:opacity-30"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <button
            type="button"
            onClick={() => remove(variant.id)}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-danger"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
          </button>
        </div>
        {qty >= max && <p className="mt-2 text-xs text-amber-300">Maximum available quantity in cart.</p>}
      </div>
    </li>
  );
}
