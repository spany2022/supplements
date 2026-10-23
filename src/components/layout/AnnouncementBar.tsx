"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { store } from "@/lib/store-config";

export function AnnouncementBar() {
  const messages = store.announcements;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || messages.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % messages.length), 4500);
    return () => clearInterval(t);
  }, [paused, messages.length]);

  return (
    <div
      className="relative z-[60] flex h-9 items-center justify-center overflow-hidden bg-lime px-4 text-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-live="off"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={i}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="truncate text-center text-[0.62rem] font-bold uppercase tracking-[0.12em] sm:text-[0.68rem] sm:tracking-[0.2em]"
        >
          {messages[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
