"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bestsellers } from "@/lib/catalog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

export function Bestsellers() {
  const items = bestsellers();
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 320) + 20), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="best-title" className="relative overflow-hidden border-t border-line bg-ink-2 py-24 lg:py-36">
      <div aria-hidden className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-lime/[0.05] blur-3xl" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="best-title"
          eyebrow="Bestselling supplements"
          title={
            <>
              The shelf <br className="hidden sm:block" />
              everyone reaches for.
            </>
          }
          action={
            <div className="flex items-center gap-3">
              <div className="hidden gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  disabled={edge.start}
                  aria-label="Previous products"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg transition-colors hover:border-lime hover:text-lime disabled:opacity-30"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  disabled={edge.end}
                  aria-label="Next products"
                  className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg transition-colors hover:border-lime hover:text-lime disabled:opacity-30"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <ButtonLink href="/shop?sort=popular" variant="ghost">
                View all
              </ButtonLink>
            </div>
          }
        />
      </div>

      <ul
        ref={track}
        className="no-scrollbar relative mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 sm:px-6 lg:mt-16 lg:px-[max(2.5rem,calc((100vw_-_1440px)/2_+_2.5rem))]"
        aria-label="Bestselling products"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[82vw] max-w-[340px] shrink-0 snap-start sm:w-[340px]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
