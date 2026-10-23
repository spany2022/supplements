import Link from "next/link";
import { cx } from "@/lib/format";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect width="32" height="32" rx="8" fill="#B6F23A" />
      <path d="M9 7h4.6v7.4L19.8 7H25l-7.2 8.2L25.4 25h-5.3l-5.2-6.9-1.3 1.4V25H9z" fill="#0B0D10" />
    </svg>
  );
}

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" className={cx("group inline-flex items-center gap-2.5", className)} aria-label="Kynetic — home">
      <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-8deg]" />
      <span
        className={cx(
          "font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.04em]",
          tone === "light" ? "text-fg" : "text-ink",
        )}
      >
        KYNETIC
      </span>
    </Link>
  );
}
