"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, List, Search, SlidersHorizontal, X } from "lucide-react";
import {
  brands,
  categories,
  dietaryLabels,
  goals,
  priceRange,
  products,
  type CategorySlug,
  type Dietary,
  type GoalSlug,
} from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { cx, formatINR } from "@/lib/format";
import { ProductCard } from "@/components/product/ProductCard";

const PAGE = 9;

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "popular", label: "Most popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  // "Top rated" appears automatically once verified rating data exists.
  ...(products.some((p) => p.rating) ? [{ value: "rating", label: "Top rated" }] : []),
] as const;

const PRICE_MAX = Math.ceil(Math.max(...products.flatMap((p) => p.variants.map((v) => v.price))) / 500) * 500;

const csv = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);

export function ShopExplorer({ fixedCategory }: { fixedCategory?: CategorySlug }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = params.get("q") ?? "";
  const cats = fixedCategory ? [fixedCategory] : (csv(params.get("category")) as CategorySlug[]);
  const goalSel = csv(params.get("goal")) as GoalSlug[];
  const brandSel = csv(params.get("brand"));
  const dietSel = csv(params.get("diet")) as Dietary[];
  const max = Number(params.get("max")) || PRICE_MAX;
  const inStockOnly = params.get("stock") === "1";
  const sort = params.get("sort") ?? "featured";
  const view = params.get("view") === "list" ? "list" : "grid";

  const [visible, setVisible] = useState(PAGE);
  const [sheet, setSheet] = useState(false);
  const [draftQ, setDraftQ] = useState(q);

  // Keep the input in sync when the URL query changes from elsewhere (header search, back button).
  const [syncedQ, setSyncedQ] = useState(q);
  if (syncedQ !== q) {
    setSyncedQ(q);
    setDraftQ(q);
  }

  const update = (patch: Record<string, string | string[] | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      const value = Array.isArray(v) ? v.join(",") : v;
      if (!value) next.delete(k);
      else next.set(k, value);
    }
    setVisible(PAGE);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = (key: string, list: string[], value: string) =>
    update({ [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value] });

  // Debounce free-text search into the URL.
  useEffect(() => {
    if (draftQ === q) return;
    const t = setTimeout(() => update({ q: draftQ.trim() || null }), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftQ]);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (!cats.length || cats.includes(p.category)) &&
        (!goalSel.length || goalSel.some((g) => p.goals.includes(g))) &&
        (!brandSel.length || brandSel.includes(p.brand)) &&
        (!dietSel.length || dietSel.every((d) => p.dietary.includes(d))) &&
        priceRange(p).min <= max &&
        (!inStockOnly || p.variants.some((v) => v.stock > 0)),
    );
    list = searchProducts(list, q);
    const by = {
      featured: (a: (typeof list)[0], b: (typeof list)[0]) => Number(!!b.bestseller) - Number(!!a.bestseller) || b.popularity - a.popularity,
      popular: (a: (typeof list)[0], b: (typeof list)[0]) => b.popularity - a.popularity,
      newest: (a: (typeof list)[0], b: (typeof list)[0]) => b.addedOn.localeCompare(a.addedOn),
      "price-asc": (a: (typeof list)[0], b: (typeof list)[0]) => priceRange(a).min - priceRange(b).min,
      "price-desc": (a: (typeof list)[0], b: (typeof list)[0]) => priceRange(b).min - priceRange(a).min,
      rating: (a: (typeof list)[0], b: (typeof list)[0]) => (b.rating?.value ?? 0) - (a.rating?.value ?? 0),
    }[sort as "featured"];
    return q && sort === "featured" ? list : [...list].sort(by ?? (() => 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, fixedCategory]);

  const activeChips = [
    ...(!fixedCategory ? cats.map((c) => ({ key: "category", list: cats, value: c, label: categories.find((x) => x.slug === c)?.name ?? c })) : []),
    ...goalSel.map((g) => ({ key: "goal", list: goalSel, value: g, label: goals.find((x) => x.slug === g)?.name ?? g })),
    ...brandSel.map((b) => ({ key: "brand", list: brandSel, value: b, label: b })),
    ...dietSel.map((d) => ({ key: "diet", list: dietSel, value: d, label: dietaryLabels[d] })),
  ];
  const hasFilters = activeChips.length > 0 || max < PRICE_MAX || inStockOnly || !!q;

  const clearAll = () =>
    update({ category: null, goal: null, brand: null, diet: null, max: null, stock: null, q: null });

  const filters = (
    <div className="space-y-9">
      {!fixedCategory && (
        <FilterGroup title="Category">
          {categories.map((c) => (
            <Check key={c.slug} checked={cats.includes(c.slug)} onChange={() => toggle("category", cats, c.slug)} label={c.name} count={products.filter((p) => p.category === c.slug).length} />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Goal">
        {goals.map((g) => (
          <Check key={g.slug} checked={goalSel.includes(g.slug)} onChange={() => toggle("goal", goalSel, g.slug)} label={g.name} />
        ))}
      </FilterGroup>
      <FilterGroup title="Brand">
        {brands.map((b) => (
          <Check key={b} checked={brandSel.includes(b)} onChange={() => toggle("brand", brandSel, b)} label={b} count={products.filter((p) => p.brand === b).length} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        <label className="block text-sm text-muted">
          <span className="flex justify-between">
            <span>Up to</span>
            <span className="font-semibold text-fg">{formatINR(max)}</span>
          </span>
          <input
            type="range"
            min={500}
            max={PRICE_MAX}
            step={250}
            value={max}
            onChange={(e) => update({ max: Number(e.target.value) >= PRICE_MAX ? null : e.target.value })}
            className="mt-3 w-full accent-[#b6f23a]"
            aria-label="Maximum price"
          />
        </label>
      </FilterGroup>
      <FilterGroup title="Dietary">
        {(Object.keys(dietaryLabels) as Dietary[]).map((d) => (
          <Check key={d} checked={dietSel.includes(d)} onChange={() => toggle("diet", dietSel, d)} label={dietaryLabels[d]} />
        ))}
      </FilterGroup>
      <FilterGroup title="Availability">
        <Check checked={inStockOnly} onChange={() => update({ stock: inStockOnly ? null : "1" })} label="In stock only" />
      </FilterGroup>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-10">
      {/* toolbar */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-4 flex flex-wrap items-center gap-3 border-b border-line bg-ink/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-ink-2 px-4 focus-within:border-lime sm:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={draftQ}
            onChange={(e) => setDraftQ(e.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted/60"
          />
        </label>
        <button
          type="button"
          onClick={() => setSheet(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-fg hover:border-lime lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden /> Filters
          {activeChips.length > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[0.65rem] font-bold text-ink">{activeChips.length}</span>}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <label className="flex h-11 items-center gap-2 rounded-full border border-line bg-ink-2 pl-4 pr-2 text-sm text-muted">
            <span className="hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}
              className="h-full cursor-pointer bg-transparent pr-1 text-fg outline-none [&>option]:bg-ink-2"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div className="hidden rounded-full border border-line p-1 sm:flex" role="group" aria-label="Layout">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => update({ view: v === "grid" ? null : v })}
                aria-pressed={view === v}
                aria-label={v === "grid" ? "Grid view" : "List view"}
                className={cx("grid h-9 w-9 place-items-center rounded-full transition-colors", view === v ? "bg-lime text-ink" : "text-muted hover:text-fg")}
              >
                {v === "grid" ? <LayoutGrid className="h-4 w-4" aria-hidden /> : <List className="h-4 w-4" aria-hidden />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr]">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+6rem)] max-h-[calc(100svh-var(--header-h)-8rem)] overflow-y-auto pb-10 pr-2">{filters}</div>
        </aside>

        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <p className="mr-2 text-sm text-muted" aria-live="polite">
              <span className="font-semibold text-fg">{filtered.length}</span> product{filtered.length === 1 ? "" : "s"}
              {q && <> for “{q}”</>}
            </p>
            {activeChips.map((c) => (
              <button
                key={c.key + c.value}
                type="button"
                onClick={() => toggle(c.key, c.list, c.value)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-3 text-xs text-lime hover:bg-lime/20"
              >
                {c.label} <X className="h-3 w-3" aria-hidden />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            {hasFilters && (
              <button type="button" onClick={clearAll} className="text-xs text-muted underline underline-offset-4 hover:text-fg">
                Clear all
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-line px-6 py-20 text-center">
              <p className="heading text-3xl">No matches.</p>
              <p className="mt-3 text-muted">Try removing a filter or searching for something broader.</p>
              <button type="button" onClick={clearAll} className="mt-6 rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink">
                Reset filters
              </button>
            </div>
          ) : (
            <ul className={cx("grid gap-5", view === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.slice(0, visible).map((p) => (
                  <motion.li
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProductCard product={p} layout={view} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          {visible < filtered.length && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-xs text-muted">
                Showing {Math.min(visible, filtered.length)} of {filtered.length}
              </p>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="rounded-full border border-line px-8 py-3.5 text-sm font-medium text-fg transition-colors hover:border-lime hover:text-lime"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      <AnimatePresence>
        {sheet && (
          <div className="fixed inset-0 z-[85] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div className="absolute inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col rounded-t-[1.8rem] border-t border-line bg-ink-2"
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                <p className="heading text-xl">Filters</p>
                <button type="button" onClick={() => setSheet(false)} className="grid h-10 w-10 place-items-center rounded-full border border-line" aria-label="Close filters">
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{filters}</div>
              <div className="grid grid-cols-2 gap-3 border-t border-line px-6 py-4">
                <button type="button" onClick={clearAll} className="h-12 rounded-full border border-line text-sm">
                  Clear
                </button>
                <button type="button" onClick={() => setSheet(false)} className="h-12 rounded-full bg-lime text-sm font-semibold text-ink">
                  Show {filtered.length} results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-fg">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label className="group flex min-h-10 cursor-pointer items-center gap-3 text-sm text-muted hover:text-fg">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        aria-hidden
        className={cx(
          "grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-lime",
          checked ? "border-lime bg-lime text-ink" : "border-line group-hover:border-white/40",
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-3 w-3">
            <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={cx("flex-1", checked && "text-fg")}>{label}</span>
      {count !== undefined && <span className="text-xs text-muted/70">{count}</span>}
    </label>
  );
}
