import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { goals } from "@/lib/catalog";
import { cx, unsplash } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

// Bento spans for the six editorial tiles on large screens.
const spans = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function ShopByGoal() {
  return (
    <section id="shop-by-goal" aria-labelledby="goal-title" className="relative scroll-mt-20 bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="goal-title"
          eyebrow="Shop by goal"
          title={
            <>
              Train with <span className="text-lime">intent.</span>
            </>
          }
          intro="Start from what you’re working toward. Each collection groups products people commonly choose for that focus — always read the label and pick what fits your routine."
        />

        <ul className="mt-14 grid auto-rows-[minmax(260px,auto)] gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:auto-rows-[300px]">
          {goals.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(i % 3) * 0.08} className={cx("min-h-[260px]", spans[i])}>
              <Link
                href={`/shop?goal=${g.slug}`}
                className="group relative flex h-full overflow-hidden rounded-[1.6rem] border border-line bg-card"
              >
                <Image
                  src={unsplash(g.image)}
                  alt={g.alt}
                  fill
                  sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
                  className="object-cover grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_100%,rgba(182,242,58,0.18),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative mt-auto flex w-full items-end justify-between gap-6 p-6 sm:p-8">
                  <div>
                    <span className="display text-2xl text-lime/80">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={cx("heading mt-2 text-fg", i === 0 ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl")}>{g.name}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg/70 transition-colors group-hover:text-fg/90">{g.blurb}</p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 text-fg transition-[background-color,color,transform,border-color] duration-500 group-hover:rotate-45 group-hover:border-lime group-hover:bg-lime group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                    <span className="sr-only">Explore {g.name}</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
