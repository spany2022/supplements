"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { cx } from "@/lib/format";
import { Pack } from "./Pack";
import { NutritionPanel } from "./NutritionPanel";

const views = ["Front", "Studio", "Label"] as const;
type View = (typeof views)[number];

export function ProductGallery({ product, size }: { product: Product; size: string }) {
  const [view, setView] = useState<View>("Front");

  const render = (v: View, thumb = false) => {
    if (v === "Label") {
      return thumb ? (
        <div className="h-full w-full rounded-md bg-paper p-1.5">
          <div className="h-1.5 w-3/4 bg-ink" />
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="mt-1 h-px w-full bg-ink/30" />
          ))}
        </div>
      ) : (
        <NutritionPanel product={product} className="w-[min(100%,380px)] shadow-2xl" />
      );
    }
    return (
      <Pack
        pack={product.pack}
        name={product.name}
        brand={product.brand}
        size={size}
        decorative={thumb}
        shadow={!thumb}
        className={cx("h-full w-auto", v === "Studio" && "-rotate-6", !thumb && "max-h-[460px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.65)]")}
      />
    );
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="flex gap-3 lg:flex-col" role="tablist" aria-label="Product images">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            aria-controls="gallery-panel"
            onClick={() => setView(v)}
            className={cx(
              "grid h-20 w-20 place-items-center overflow-hidden rounded-2xl border bg-card p-2.5 transition-colors",
              view === v ? "border-lime" : "border-line hover:border-white/30",
            )}
          >
            <span className="sr-only">{v} view</span>
            <span aria-hidden className="grid h-full w-full place-items-center">
              {render(v, true)}
            </span>
          </button>
        ))}
      </div>
      <div
        id="gallery-panel"
        role="tabpanel"
        aria-label={`${view} view`}
        className={cx(
          "relative grid aspect-square flex-1 place-items-center overflow-hidden rounded-[2rem] border border-line p-10",
          view === "Studio" ? "bg-ink" : "bg-[radial-gradient(120%_90%_at_50%_0%,#2a313a_0%,#14181d_65%)]",
        )}
      >
        {view === "Studio" && (
          <>
            <div aria-hidden className="beam absolute -top-1/4 left-1/2 h-[140%] w-[110%] -translate-x-1/2" />
            <div aria-hidden className="absolute bottom-[12%] left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-[50%] bg-lime/20 blur-2xl" />
          </>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid h-full w-full place-items-center"
          >
            {render(view)}
          </motion.div>
        </AnimatePresence>
        <p className="absolute bottom-4 left-5 text-[0.62rem] uppercase tracking-[0.2em] text-muted/60">Illustrative packshot</p>
      </div>
    </div>
  );
}
