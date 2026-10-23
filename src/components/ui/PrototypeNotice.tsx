import { Info } from "lucide-react";
import { cx } from "@/lib/format";

/** Visible flag wherever the prototype stands in for real data or services. */
export function PrototypeNotice({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "paper";
  className?: string;
}) {
  return (
    <p
      role="note"
      className={cx(
        "flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[0.8rem] leading-relaxed",
        tone === "dark" ? "border-line bg-ink-2/80 text-muted" : "border-ink/15 bg-white/60 text-graphite",
        className,
      )}
    >
      <Info className={cx("mt-0.5 h-4 w-4 shrink-0", tone === "dark" ? "text-lime" : "text-ink")} aria-hidden />
      <span>{children}</span>
    </p>
  );
}
