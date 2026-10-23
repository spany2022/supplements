import { cx } from "@/lib/format";

export function StockBadge({ stock, className }: { stock: number; className?: string }) {
  const state = stock <= 0 ? "out" : stock <= 5 ? "low" : "in";
  return (
    <span className={cx("inline-flex items-center gap-1.5 text-[0.72rem] font-medium", className)}>
      <span
        aria-hidden
        className={cx(
          "h-1.5 w-1.5 rounded-full",
          state === "in" && "bg-lime",
          state === "low" && "bg-amber-400",
          state === "out" && "bg-danger",
        )}
      />
      <span className={cx(state === "out" ? "text-danger" : state === "low" ? "text-amber-300" : "text-muted")}>
        {state === "out" ? "Out of stock" : state === "low" ? `Only ${stock} left` : "In stock"}
      </span>
    </span>
  );
}
