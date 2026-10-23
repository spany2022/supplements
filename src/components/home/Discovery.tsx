"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { categories, products, type CategorySlug } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { cx } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";

export function Discovery() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategorySlug | "all">("all");

  const results = useMemo(() => {
    const base = cat === "all" ? products : products.filter((p) => p.category === cat);
    return searchProducts(base, q).sort((a, b) => b.popularity - a.popularity);
  }, [q, cat]);

  const shopHref = `/shop?${new URLSearchParams({ ...(q && { q }), ...(cat !== "all" && { category: cat }) })}`;

  return (
    <section aria-labelledby="discover-title" className="relative border-t border-line bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="discover-title"
          eyebrow="Product discovery"
          title="Find your formula."
          intro="Search by product, ingredient, flavour or diet — then filter by brand, price and more in the full shop."
        />

        <div className="mt-12 flex flex-col gap-5 rounded-[1.6rem] border border-line bg-ink-2 p-4 sm:p-5 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-full border border-line bg-ink px-5 focus-within:border-lime">
            <Search className="h-5 w-5 shrink-0 text-lime" aria-hidden />
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Try “vegan”, “caffeine-free”, “kesar”…"
              className="h-14 w-full bg-transparent text-fg outline-none placeholder:text-muted/60"
            />
          </label>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1" role="radiogroup" aria-label="Category">
            {[{ slug: "all" as const, short: "All" }, ...categories].map((c) => (
              <button
                key={c.slug}
                type="button"
                role="radio"
                aria-checked={cat === c.slug}
                onClick={() => setCat(c.slug)}
                className={cx(
                  "h-11 shrink-0 rounded-full border px-5 text-sm transition-colors",
                  cat === c.slug ? "border-lime bg-lime text-ink" : "border-line text-muted hover:border-white/30 hover:text-fg",
                )}
              >
                {c.short}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {results.length} product{results.length === 1 ? "" : "s"}
          {q && <> matching “{q}”</>}
        </p>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {results.slice(0, 4).map((p) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {results.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">
            Nothing matches yet. Try a broader term or another category.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            href={shopHref}
            className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-lime hover:text-lime"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Open the full shop with filters
            {results.length > 4 && <span className="text-muted">({results.length - 4} more)</span>}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
