"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useStore } from "@/lib/cart";

export function Toast() {
  const { toast, setDrawerOpen } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[95] w-[min(420px,calc(100%-2rem))] -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-card/95 p-3 pr-4 shadow-2xl backdrop-blur-xl"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-ink">
              <Check className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-fg">{toast.title}</p>
              {toast.detail && <p className="truncate text-xs text-muted">{toast.detail}</p>}
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-lime hover:underline"
            >
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
