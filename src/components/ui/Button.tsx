"use client";

import Link from "next/link";
import { useRef } from "react";
import { cx } from "@/lib/format";

type Variant = "primary" | "ghost" | "dark" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:bg-[#c6ff52] shadow-[0_10px_40px_-12px_rgba(182,242,58,0.55)]",
  ghost: "border border-white/20 text-fg hover:border-lime hover:text-lime bg-white/[0.02] backdrop-blur-sm",
  dark: "bg-ink text-fg hover:bg-ink-2",
  light: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

const base =
  "relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Magnetic on fine pointers only: the button drifts toward the cursor while it
 * hovers, and settles back on leave. Keyboard and touch behave normally.
 */
function useMagnet<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);
  const onMove = (e: React.PointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return { ref, onPointerMove: onMove, onPointerLeave: onLeave };
}

type LinkProps = {
  href: string;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({ href, variant = "primary", magnetic, className, children, ...rest }: LinkProps) {
  const magnet = useMagnet<HTMLAnchorElement>();
  return (
    <Link
      href={href}
      {...rest}
      {...(magnetic ? magnet : {})}
      className={cx(base, styles[variant], className)}
    >
      {children}
    </Link>
  );
}

type BtnProps = {
  variant?: Variant;
  magnetic?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", magnetic, className, children, type = "button", ...rest }: BtnProps) {
  const magnet = useMagnet<HTMLButtonElement>();
  return (
    <button type={type} {...rest} {...(magnetic ? magnet : {})} className={cx(base, styles[variant], className)}>
      {children}
    </button>
  );
}
