import { cx } from "@/lib/format";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "dark",
  className,
  action,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "paper";
  className?: string;
  action?: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <Reveal className={cx("max-w-3xl", align === "center" && "mx-auto")}>
        <p className={cx("eyebrow mb-5 flex items-center gap-3", tone === "dark" ? "text-lime" : "text-graphite", align === "center" && "justify-center")}>
          <span className={cx("h-px w-8", tone === "dark" ? "bg-lime" : "bg-graphite")} aria-hidden />
          {eyebrow}
        </p>
        <h2 id={id} className={cx("heading text-[clamp(2.4rem,6vw,5rem)]", tone === "dark" ? "text-fg" : "text-ink")}>
          {title}
        </h2>
        {intro && (
          <p className={cx("mt-6 max-w-xl text-base leading-relaxed md:text-lg", tone === "dark" ? "text-muted" : "text-graphite", align === "center" && "mx-auto")}>
            {intro}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
