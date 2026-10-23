"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { categories, defaultVariant, products } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { formatINR } from "@/lib/format";
import { Pack } from "@/components/product/Pack";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => (q.trim() ? searchProducts(products, q).slice(0, 6) : []), [q]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-ink/80 backdrop-blur-xl"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-[8vh] w-[min(760px,calc(100%-2rem))] overflow-hidden rounded-3xl border border-line bg-ink-2 shadow-2xl"
          >
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 shrink-0 text-lime" aria-hidden />
              <label htmlFor="site-search" className="sr-only">
                Search products
              </label>
              <input
                id="site-search"
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search whey, creatine, vegan, vitamin D…"
                autoComplete="off"
                className="h-16 flex-1 bg-transparent text-lg text-fg outline-none placeholder:text-muted/60"
              />
              <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full text-muted hover:text-fg" aria-label="Close search">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </form>

            <div className="max-h-[60vh] overflow-y-auto p-3" aria-live="polite">
              {q.trim() === "" ? (
                <div className="p-3">
                  <p className="eyebrow mb-3 text-muted">Browse categories</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/shop/${c.slug}`}
                        onClick={onClose}
                        className="rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-lime hover:text-lime"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="p-6 text-center text-muted">No products match “{q}”. Try a category or ingredient name.</p>
              ) : (
                <ul>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-card focus-visible:bg-card"
                      >
                        <span className="grid h-16 w-14 shrink-0 place-items-center rounded-xl bg-card">
                          <Pack pack={p.pack} name={p.name} brand={p.brand} decorative shadow={false} className="h-14 w-auto" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium text-fg">{p.name}</span>
                          <span className="block truncate text-sm text-muted">
                            {p.brand} · {p.tagline}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-lime">{formatINR(defaultVariant(p).price)}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="submit"
                      onClick={submit}
                      className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl border border-line p-3 text-sm text-fg hover:border-lime hover:text-lime"
                    >
                      See all results for “{q}” <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
