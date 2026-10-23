"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { dietaryLabels, firstAvailable, getCategory, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { cx, formatINR } from "@/lib/format";
import { store } from "@/lib/store-config";
import { Button } from "@/components/ui/Button";
import { ProductGallery } from "./ProductGallery";
import { Price } from "./Price";
import { StockBadge } from "./StockBadge";
import { WishlistButton } from "./WishlistButton";

export function ProductView({ product }: { product: Product }) {
  const router = useRouter();
  const { add, setDrawerOpen } = useStore();
  const initial = firstAvailable(product);
  const [flavor, setFlavor] = useState(initial.flavor);
  const [size, setSize] = useState(initial.size);
  const [qty, setQty] = useState(1);

  const flavors = useMemo(() => [...new Set(product.variants.map((v) => v.flavor).filter(Boolean))] as string[], [product.variants]);
  const sizes = useMemo(() => [...new Set(product.variants.map((v) => v.size))], [product.variants]);

  const variant =
    product.variants.find((v) => v.flavor === flavor && v.size === size) ??
    product.variants.find((v) => v.flavor === flavor) ??
    initial;
  const sizeAvailable = (s: string) => product.variants.some((v) => v.size === s && v.flavor === flavor);
  const soldOut = variant.stock <= 0;
  const maxQty = Math.min(variant.stock, 10);

  const pickFlavor = (f: string) => {
    setFlavor(f);
    if (!product.variants.some((v) => v.flavor === f && v.size === size)) {
      setSize(product.variants.find((v) => v.flavor === f)!.size);
    }
    setQty(1);
  };

  const addToCart = () => add(variant.id, qty);
  const buyNow = () => {
    if (add(variant.id, qty)) {
      setDrawerOpen(false);
      router.push("/checkout");
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
        <ProductGallery product={product} size={variant.size} />
      </div>

      <div>
        <p className="eyebrow text-lime">
          {product.brand} · {getCategory(product.category)?.name}
        </p>
        <h1 className="heading mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">{product.name}</h1>
        <p className="mt-3 text-lg text-muted">{product.tagline}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {product.dietary.map((d) => (
            <li key={d} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {dietaryLabels[d]}
            </li>
          ))}
          <li className="rounded-full border border-line px-3 py-1 text-xs text-muted">{product.form}</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-y border-line py-6">
          <div>
            <Price price={variant.price} compareAt={variant.compareAt} size="lg" />
            <p className="mt-1 text-xs text-muted">
              Inclusive of GST · {formatINR(variant.price / variant.servings)} per serving
            </p>
          </div>
          <StockBadge stock={variant.stock} className="text-sm" />
        </div>

        {flavors.length > 0 && (
          <fieldset className="mt-8">
            <legend className="eyebrow mb-3 text-fg">
              Flavour <span className="ml-2 normal-case tracking-normal text-muted">{flavor}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {flavors.map((f) => {
                const anyStock = product.variants.some((v) => v.flavor === f && v.stock > 0);
                return (
                  <label
                    key={f}
                    className={cx(
                      "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime",
                      flavor === f ? "border-lime bg-lime/10 text-lime" : "border-line text-muted hover:border-white/30 hover:text-fg",
                      !anyStock && "line-through decoration-muted/60",
                    )}
                  >
                    <input type="radio" name="flavour" value={f} checked={flavor === f} onChange={() => pickFlavor(f)} className="sr-only" />
                    {f}
                    {!anyStock && <span className="sr-only"> (out of stock)</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        <fieldset className="mt-7">
          <legend className="eyebrow mb-3 text-fg">Size</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => {
              const available = sizeAvailable(s);
              const v = product.variants.find((x) => x.size === s && x.flavor === flavor);
              return (
                <label
                  key={s}
                  className={cx(
                    "inline-flex min-h-14 cursor-pointer flex-col justify-center rounded-2xl border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime",
                    size === s ? "border-lime bg-lime/10" : "border-line hover:border-white/30",
                    !available && "cursor-not-allowed opacity-35",
                  )}
                >
                  <input type="radio" name="size" value={s} checked={size === s} disabled={!available} onChange={() => { setSize(s); setQty(1); }} className="sr-only" />
                  <span className={cx("font-semibold", size === s ? "text-lime" : "text-fg")}>{s}</span>
                  <span className="text-xs text-muted">{v ? `${v.servings} servings` : "Not in this flavour"}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex h-14 items-center rounded-full border border-line" role="group" aria-label="Quantity">
            <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} disabled={qty <= 1 || soldOut} className="grid h-14 w-12 place-items-center text-muted hover:text-fg disabled:opacity-30" aria-label="Decrease quantity">
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <output className="w-8 text-center tabular-nums" aria-live="polite">
              {qty}
            </output>
            <button type="button" onClick={() => setQty((n) => Math.min(maxQty, n + 1))} disabled={qty >= maxQty || soldOut} className="grid h-14 w-12 place-items-center text-muted hover:text-fg disabled:opacity-30" aria-label="Increase quantity">
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <Button onClick={addToCart} disabled={soldOut} className="h-14 flex-1">
            {soldOut ? "Out of stock" : "Add to cart"}
          </Button>
          <WishlistButton slug={product.slug} name={product.name} className="h-14 w-14" />
        </div>
        <Button variant="ghost" onClick={buyNow} disabled={soldOut} className="mt-3 h-14 w-full">
          Buy now
        </Button>

        <ul className="mt-8 grid gap-3 rounded-2xl border border-line bg-ink-2 p-5 text-sm text-muted sm:grid-cols-3">
          <li className="flex gap-2.5">
            <Truck className="h-4 w-4 shrink-0 text-lime" aria-hidden />
            Free standard shipping over {formatINR(store.shipping.freeThreshold)}
          </li>
          <li className="flex gap-2.5">
            <Undo2 className="h-4 w-4 shrink-0 text-lime" aria-hidden />
            {store.returns.windowDays}-day returns on sealed items
          </li>
          <li className="flex gap-2.5">
            <ShieldCheck className="h-4 w-4 shrink-0 text-lime" aria-hidden />
            Secure checkout
          </li>
        </ul>

        <ul className="mt-8 space-y-2.5">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-center gap-3 text-fg">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lime" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
