import Link from "next/link";
import { categories } from "@/lib/catalog";
import { cx } from "@/lib/format";

export function ShopHeader({
  title,
  intro,
  active,
  crumbs,
}: {
  title: string;
  intro: string;
  active?: string;
  crumbs: { name: string; href?: string }[];
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-lime/[0.07] blur-3xl" />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-12 sm:px-6 lg:px-10 lg:pt-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {crumbs.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-lime">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-fg">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="display mt-6 text-[clamp(3.6rem,10vw,8rem)]">{title}</h1>
        <p className="mt-4 max-w-xl text-muted">{intro}</p>
        <nav aria-label="Categories" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4">
          {[{ slug: "", name: "All" }, ...categories].map((c) => {
            const isActive = (active ?? "") === c.slug;
            return (
              <Link
                key={c.slug || "all"}
                href={c.slug ? `/shop/${c.slug}` : "/shop"}
                aria-current={isActive ? "page" : undefined}
                className={cx(
                  "inline-flex h-10 shrink-0 items-center rounded-full border px-5 text-sm transition-colors",
                  isActive ? "border-lime bg-lime text-ink" : "border-line text-muted hover:border-white/30 hover:text-fg",
                )}
              >
                {c.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
