"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { getProduct, getCategory, defaultVariant } from "@/lib/catalog";
import { formatINR } from "@/lib/format";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Pack } from "@/components/product/Pack";

const scenes = [
  { slug: "whey-isolate-pro", glow: "182,242,58", code: "PRT-01" },
  { slug: "ignite-pre-workout", glow: "95,199,232", code: "PRE-02" },
  { slug: "creatine-monohydrate", glow: "245,247,242", code: "CRT-03" },
  { slug: "eaa-recovery", glow: "242,169,59", code: "REC-04" },
];

/**
 * Pinned horizontal "laboratory" on large screens: each panel brings a
 * product under its own light, and the scene's glow shifts as you travel.
 * Below lg — or with reduced motion — it's a plain vertical stack.
 */
export function Lab() {
  const root = useRef<HTMLElement>(null);
  const items = scenes.map((s) => ({ ...s, product: getProduct(s.slug)! }));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const track = root.current!.querySelector<HTMLElement>(".lab-track")!;
        const panels = gsap.utils.toArray<HTMLElement>(".lab-panel");
        const glow = root.current!.querySelector<HTMLElement>(".lab-glow")!;

        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
              const rgb = panels[idx].dataset.glow!;
              gsap.to(glow, { "--glow": rgb, duration: 0.8, overwrite: "auto" });
              root.current!.querySelectorAll<HTMLElement>(".lab-dot").forEach((d, i) => d.classList.toggle("is-on", i === idx));
            },
          },
        });

        panels.forEach((panel) => {
          const pack = panel.querySelector(".lab-pack");
          const callouts = panel.querySelectorAll(".lab-callout");
          const copy = panel.querySelectorAll(".lab-copy > *");
          gsap.fromTo(
            pack,
            { xPercent: 40, rotate: 12, scale: 0.8, opacity: 0.2 },
            {
              xPercent: 0, rotate: 0, scale: 1, opacity: 1, ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 85%", end: "center 55%", scrub: true },
            },
          );
          gsap.from(callouts, {
            opacity: 0, x: 24, stagger: 0.12, duration: 0.8,
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 45%", toggleActions: "play none none reverse" },
          });
          gsap.from(copy, {
            opacity: 0, y: 30, stagger: 0.08, duration: 0.9,
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 60%", toggleActions: "play none none reverse" },
          });
        });

        // Keyboard users: focusing something in an off-screen panel scrolls the page to that panel.
        const st = tween.scrollTrigger!;
        const onFocus = (e: FocusEvent) => {
          const panel = (e.target as HTMLElement).closest<HTMLElement>(".lab-panel");
          if (!panel) return;
          const i = panels.indexOf(panel);
          const y = st.start + (st.end - st.start) * (i / (panels.length - 1));
          window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
        };
        root.current!.addEventListener("focusin", onFocus);
        return () => root.current?.removeEventListener("focusin", onFocus);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="lab-title" className="relative overflow-hidden bg-ink lg:motion-safe:h-[100svh]">
      <div
        aria-hidden
        className="lab-glow pointer-events-none absolute inset-0 [--glow:182,242,58]"
        style={{ background: "radial-gradient(50% 55% at 62% 55%, rgba(var(--glow),0.16), transparent 70%)" }}
      />
      <div aria-hidden className="hairline-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] items-end justify-between gap-6 px-4 pt-24 sm:px-6 lg:px-10 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-0 lg:motion-safe:pt-[calc(var(--header-h)+1.5rem)]">
        <div>
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="h-px w-8 bg-lime" aria-hidden /> The product laboratory
          </p>
          <h2 id="lab-title" className="heading mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Under the light.
          </h2>
        </div>
        <ol className="hidden items-center gap-2 lg:flex" aria-hidden>
          {items.map((s, i) => (
            <li key={s.slug} className={`lab-dot h-1 w-8 rounded-full bg-line transition-colors duration-500 [&.is-on]:bg-lime ${i === 0 ? "is-on" : ""}`} />
          ))}
        </ol>
      </div>

      <div className="lab-track relative flex flex-col lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row">
        {items.map(({ product: p, glow, code }, i) => {
          const v = defaultVariant(p);
          return (
            <article
              key={p.slug}
              data-glow={glow}
              aria-labelledby={`lab-${p.slug}`}
              className="lab-panel relative grid min-h-[100svh] w-full items-center gap-10 px-4 py-20 sm:px-6 lg:motion-safe:h-full lg:motion-safe:w-screen lg:grid-cols-[1fr_1.1fr] lg:px-[max(2.5rem,calc((100vw_-_1440px)/2_+_2.5rem))] lg:motion-safe:py-0"
            >
              <div className="lab-copy relative z-10 max-w-lg lg:pt-16">
                <p className="font-mono text-xs tracking-[0.3em] text-muted">
                  {code} · {getCategory(p.category)?.name}
                </p>
                <h3 id={`lab-${p.slug}`} className="display mt-4 text-[clamp(3.4rem,7vw,7.5rem)] text-fg">
                  {p.name}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-muted">{p.description}</p>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Link
                    href={`/products/${p.slug}`}
                    className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-lime px-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-[#c6ff52]"
                  >
                    View product <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <span className="text-sm text-muted">
                    From <span className="font-semibold text-fg">{formatINR(v.price)}</span>
                  </span>
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center justify-center sm:flex-row lg:h-[70vh]">
                <div aria-hidden className="absolute inset-x-[10%] bottom-[6%] h-10 rounded-[50%] blur-2xl" style={{ background: `rgba(${glow},0.25)` }} />
                <div aria-hidden className="beam absolute -top-[20%] left-1/2 h-[120%] w-[120%] -translate-x-1/2 opacity-70" />
                <div className="lab-pack relative w-[62%] max-w-[360px]">
                  <Pack pack={p.pack} name={p.name} brand={p.brand} size={v.size} className="h-auto w-full drop-shadow-[0_50px_60px_rgba(0,0,0,0.7)]" />
                </div>
                <ul className="mt-8 flex flex-wrap justify-center gap-2 sm:absolute sm:inset-0 sm:mt-0 sm:block">
                  {[...p.highlights, p.servingSize].slice(0, 3).map((h, k) => (
                    <li
                      key={h}
                      className={`lab-callout flex items-center gap-2 sm:absolute ${
                        ["sm:left-0 sm:top-[18%]", "sm:right-0 sm:top-[44%] sm:flex-row-reverse", "sm:bottom-[16%] sm:left-[4%]"][k]
                      }`}
                    >
                      <span className="max-w-[11rem] rounded-xl border border-white/10 bg-ink/75 px-3 py-2 text-[0.72rem] leading-snug text-fg backdrop-blur">
                        {h}
                      </span>
                      <span aria-hidden className="hidden h-px w-12 bg-white/30 sm:block" />
                      <span aria-hidden className="hidden h-1.5 w-1.5 rounded-full sm:block" style={{ background: `rgb(${glow})` }} />
                    </li>
                  ))}
                </ul>
              </div>
              <span aria-hidden className="display pointer-events-none absolute bottom-6 right-6 text-[8rem] leading-none text-white/[0.03] lg:text-[14rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
