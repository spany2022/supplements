"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { firstAvailable, getCategory, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { cx } from "@/lib/format";
import { Pack } from "./Pack";
import { Price } from "./Price";
import { StockBadge } from "./StockBadge";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, layout = "grid" }: { product: Product; layout?: "grid" | "list" }) {
  const { add } = useStore();
  const flavors = useMemo(
    () => [...new Set(product.variants.map((v) => v.flavor).filter(Boolean))] as string[],
    [product.variants],
  );
  const [flavor, setFlavor] = useState(firstAvailable(product).flavor);
  const [added, setAdded] = useState(false);

  // Cheapest in-stock size of the chosen flavour, else the cheapest size of it.
  const variant = useMemo(() => {
    const pool = product.variants.filter((v) => !flavor || v.flavor === flavor);
    const stocked = pool.filter((v) => v.stock > 0);
    return (stocked.length ? stocked : pool).reduce((a, b) => (b.price < a.price ? b : a));
  }, [flavor, product.variants]);

  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const href = `/products/${product.slug}`;
  const soldOut = variant.stock <= 0;

  const onAdd = () => {
    if (add(variant.id)) {
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    }
  };

  return (
    <article
      className={cx(
        "group relative flex h-full overflow-hidden rounded-[1.4rem] border border-line bg-card transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]",
        layout === "grid" ? "flex-col" : "flex-col sm:flex-row",
      )}
    >
      <div
        className={cx(
          "relative overflow-hidden bg-[radial-gradient(120%_80%_at_50%_0%,#2a313a_0%,#14181d_60%)]",
          layout === "grid" ? "aspect-[4/4.2]" : "aspect-square sm:aspect-auto sm:w-64 sm:shrink-0",
        )}
      >
        <div aria-hidden className="beam absolute left-1/2 top-0 h-full w-2/3 -translate-x-1/2 opacity-60" />
        <div className="absolute inset-0 grid place-items-center p-8">
          <Pack
            pack={product.pack}
            name={product.name}
            brand={product.brand}
            size={variant.size}
            decorative
            className="h-full max-h-64 w-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-2 group-hover:scale-[1.07]"
          />
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {product.bestseller && (
            <span className="rounded-full bg-lime px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink">
              Bestseller
            </span>
          )}
          {product.dietary.includes("vegan") && (
            <span className="rounded-full border border-white/15 bg-ink/60 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur">
              Vegan
            </span>
          )}
        </div>
        <WishlistButton slug={product.slug} name={product.name} className="absolute right-4 top-4" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="min-w-0">
          <p className="eyebrow text-[0.62rem] text-muted">
            {product.brand} · {getCategory(product.category)?.short}
          </p>
          <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg font-bold leading-tight tracking-tight text-fg">
            <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[0.8rem] text-muted">
            {sizes.join(" / ")} · {variant.servings} servings
          </p>
        </div>

        {flavors.length > 1 && (
          <div className="relative z-10 flex flex-wrap gap-1.5" role="radiogroup" aria-label={`${product.name} flavour`}>
            {flavors.map((f) => (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={flavor === f}
                onClick={() => setFlavor(f)}
                className={cx(
                  "rounded-full border px-2.5 py-1 text-[0.7rem] transition-colors",
                  flavor === f ? "border-lime bg-lime/10 text-lime" : "border-line text-muted hover:border-white/30 hover:text-fg",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}
        {flavors.length === 1 && <p className="text-[0.75rem] text-muted">{flavors[0]}</p>}

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <Price price={variant.price} compareAt={variant.compareAt} />
            <StockBadge stock={variant.stock} />
          </div>
          <button
            type="button"
            onClick={onAdd}
            disabled={soldOut}
            aria-label={
              soldOut
                ? `${product.name} is out of stock`
                : `Add ${product.name}${variant.flavor ? `, ${variant.flavor}` : ""}, ${variant.size} to cart`
            }
            className={cx(
              "relative z-10 inline-flex h-11 shrink-0 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors",
              soldOut ? "cursor-not-allowed border border-line text-muted" : "bg-lime text-ink hover:bg-[#c6ff52]",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "added" : "add"}
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5"
              >
                {added ? <Check className="h-4 w-4" aria-hidden /> : !soldOut && <Plus className="h-4 w-4" aria-hidden />}
                {added ? "Added" : soldOut ? "Sold out" : "Add"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>
    </article>
  );
}
