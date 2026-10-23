import { discountPercent, formatINR, cx } from "@/lib/format";

export function Price({
  price,
  compareAt,
  size = "md",
  tone = "dark",
  from,
}: {
  price: number;
  compareAt?: number;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "paper";
  from?: boolean;
}) {
  const off = discountPercent(price, compareAt);
  return (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span
        className={cx(
          "font-[family-name:var(--font-display)] font-bold tracking-tight",
          size === "lg" ? "text-3xl" : size === "md" ? "text-xl" : "text-base",
          tone === "dark" ? "text-lime" : "text-ink",
        )}
      >
        {from && <span className="mr-1 text-[0.6em] font-medium text-muted">from</span>}
        {formatINR(price)}
      </span>
      {off > 0 && (
        <>
          <s className={cx("text-sm", tone === "dark" ? "text-muted" : "text-graphite")}>
            <span className="sr-only">Was </span>
            {formatINR(compareAt!)}
          </s>
          <span className="rounded-full bg-lime/15 px-2 py-0.5 text-[0.68rem] font-semibold text-lime">{off}% off</span>
        </>
      )}
    </div>
  );
}
