"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/cart";
import { cx } from "@/lib/format";

export function WishlistButton({ slug, name, className }: { slug: string; name: string; className?: string }) {
  const { isWished, toggleWish, hydrated } = useStore();
  const on = hydrated && isWished(slug);
  return (
    <button
      type="button"
      onClick={() => toggleWish(slug)}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={cx(
        "z-10 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-colors",
        on ? "border-lime/60 bg-lime/15 text-lime" : "border-white/15 bg-ink/50 text-fg hover:border-lime hover:text-lime",
        className,
      )}
    >
      <motion.span
        key={String(on)}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
      >
        <Heart className="h-4 w-4" fill={on ? "currentColor" : "none"} aria-hidden />
      </motion.span>
    </button>
  );
}
