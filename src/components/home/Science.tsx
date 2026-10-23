"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getProduct } from "@/lib/catalog";
import { cx, unsplash } from "@/lib/format";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";
import { Pack } from "@/components/product/Pack";

const pillars = [
  {
    key: "ingredients",
    title: "Ingredient transparency",
    body: "Every product page carries the full ingredient list exactly as printed on the label — in order, including sweeteners, colours and additives.",
  },
  {
    key: "nutrition",
    title: "Clear nutrition information",
    body: "Serving size, servings per container and nutrition per serving, laid out like the panel on the pack so products are easy to compare.",
  },
  {
    key: "testing",
    title: "Quality documentation",
    body: "Certificates of analysis and third-party test results are shown only where the brand supplies them — never implied when they don’t exist.",
  },
  {
    key: "sourcing",
    title: "Accountable sourcing",
    body: "Stock is bought from brands and their authorised distributors, then checked for seals, batch codes and shelf life before it ships.",
  },
] as const;

type Key = (typeof pillars)[number]["key"];

export function Science() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Key>("ingredients");
  const p = getProduct("whey-isolate-pro")!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".sci-mask", {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sci-visual", start: "top 75%" },
        });
        gsap.from(".sci-label", {
          y: 80,
          rotate: 4,
          opacity: 0,
          duration: 1.4,
          scrollTrigger: { trigger: ".sci-visual", start: "top 70%" },
        });
        gsap.from(".sci-pack", {
          y: 120,
          opacity: 0,
          duration: 1.6,
          delay: 0.15,
          scrollTrigger: { trigger: ".sci-visual", start: "top 70%" },
        });
        gsap.utils.toArray<SVGPathElement>(".sci-line").forEach((line) => {
          const len = line.getTotalLength();
          gsap.fromTo(
            line,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".sci-visual", start: "top 60%", end: "bottom 40%", scrub: true } },
          );
        });
      });

      gsap.utils.toArray<HTMLElement>(".sci-pillar").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(el.dataset.key as Key),
        });
      });
    },
    { scope: root },
  );

  const mark = (k: Key) =>
    cx(
      "relative rounded-md transition-[background-color,box-shadow] duration-500",
      active === k ? "bg-lime/50 shadow-[0_0_0_4px_rgba(182,242,58,0.5)]" : "bg-transparent",
    );

  return (
    <section ref={root} aria-labelledby="science-title" className="on-paper relative bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-4 pt-24 sm:px-6 lg:px-10 lg:pt-36">
        <p className="eyebrow mb-5 flex items-center gap-3 text-graphite">
          <span className="h-px w-8 bg-graphite" aria-hidden /> The science of performance
        </p>
        <h2 id="science-title" className="heading max-w-5xl text-[clamp(2.6rem,7vw,6.5rem)]">
          Performance starts with what you <span className="relative inline-block">know<span aria-hidden className="absolute -bottom-1 left-0 h-[0.12em] w-full bg-lime" /></span>.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:pb-36">
        {/* sticky visual */}
        <div className="sci-visual relative lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:h-[calc(100svh-var(--header-h)-4rem)]">
          <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-ink sm:h-[600px] lg:h-full">
            <div className="sci-mask absolute inset-0" style={{ clipPath: "circle(75% at 50% 50%)" }}>
              <Image
                src={unsplash("1622484212850-eb596d769edc")}
                alt="Close-up of cocoa powder and chocolate protein bars"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink via-ink/70 to-transparent" />
            </div>

            <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path className="sci-line" d="M8 92 C 30 70, 30 40, 58 30" stroke="#B6F23A" strokeWidth="0.25" fill="none" vectorEffect="non-scaling-stroke" />
              <path className="sci-line" d="M4 40 C 20 44, 40 60, 60 72" stroke="#F5F7F2" strokeOpacity="0.35" strokeWidth="0.2" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>

            <div className="sci-pack absolute -bottom-6 -left-6 w-[46%] max-w-[260px] sm:left-2">
              <Pack pack={p.pack} name={p.name} brand={p.brand} size="1 kg" decorative className="h-auto w-full" />
            </div>

            {/* facts panel */}
            <div className="sci-label absolute right-4 top-4 w-[min(78%,360px)] rounded-2xl bg-paper p-5 font-[family-name:var(--font-inter)] text-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] sm:right-8 sm:top-8 sm:p-6">
              <p className="border-b-[6px] border-ink pb-2 font-[family-name:var(--font-display)] text-xl font-bold leading-none tracking-tight">
                Nutrition information
              </p>
              <div className={cx("mt-2 flex justify-between border-b border-ink/30 px-1 py-1.5 text-[0.72rem]", mark("nutrition"))}>
                <span>Serving size</span>
                <span className="font-semibold">{p.servingSize}</span>
              </div>
              <table className={cx("mt-2 w-full text-[0.72rem]", mark("nutrition"))}>
                <caption className="sr-only">Sample nutrition per serving</caption>
                <thead>
                  <tr className="border-b-2 border-ink">
                    <th scope="col" className="px-1 py-1 text-left font-semibold">Per serving</th>
                    <th scope="col" className="px-1 py-1 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {p.nutrition.slice(0, 5).map((r) => (
                    <tr key={r.label} className="border-b border-ink/15">
                      <th scope="row" className={cx("px-1 py-1 text-left font-normal", r.indent && "pl-4 text-graphite")}>
                        {r.label}
                      </th>
                      <td className="px-1 py-1 text-right font-semibold tabular-nums">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={cx("mt-3 px-1 py-1 text-[0.66rem] leading-snug", mark("ingredients"))}>
                <span className="font-bold">Ingredients: </span>
                {p.ingredients}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[0.62rem] uppercase tracking-wider">
                <span className={cx("px-1 py-1", mark("testing"))}>
                  <span className="block text-graphite">COA</span>
                  <span className="font-semibold">If supplied</span>
                </span>
                <span className={cx("px-1 py-1", mark("sourcing"))}>
                  <span className="block text-graphite">Batch · Best before</span>
                  <span className="font-semibold">On pack</span>
                </span>
              </div>
            </div>
            <p className="absolute bottom-4 right-5 text-[0.65rem] uppercase tracking-[0.2em] text-fg/50">Sample label</p>
          </div>
        </div>

        {/* pillars */}
        <ol className="flex flex-col">
          {pillars.map((pl, i) => (
            <li
              key={pl.key}
              data-key={pl.key}
              className={cx(
                "sci-pillar flex min-h-[38vh] flex-col justify-center border-t border-ink/15 py-10 transition-opacity duration-500 lg:min-h-[62vh]",
                active === pl.key ? "opacity-100" : "lg:opacity-35",
              )}
            >
              <span className="display text-5xl text-ink/25">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading mt-3 text-[clamp(1.8rem,3.4vw,3rem)]">{pl.title}</h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-graphite">{pl.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
