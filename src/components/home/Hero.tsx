"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { store } from "@/lib/store-config";
import { ButtonLink } from "@/components/ui/Button";
import { Pack } from "@/components/product/Pack";
import { Particles } from "./Particles";

const ease = [0.16, 1, 0.3, 1] as const;
const lines = ["Built for", "your next", "level."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const hero = getProduct("whey-isolate-pro")!;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const productY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="grain relative -mt-[var(--header-h)] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-12 pt-[calc(var(--header-h)+1rem)] sm:pb-16 sm:pt-[calc(var(--header-h)+3rem)] [--mx:68%] [--my:35%] lg:flex-row lg:items-center lg:pb-0"
    >
      {/* Studio backdrop */}
      <motion.div
        aria-hidden
        style={{ scale: bgScale }}
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0"
      >
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(80%_60%_at_70%_40%,black,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_68%_62%,rgba(182,242,58,0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(28rem_28rem_at_var(--mx)_var(--my),rgba(245,247,242,0.07),transparent_70%)] transition-[background] duration-300" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.8, delay: 0.3, ease }}
        className="beam absolute -top-10 right-[-20%] h-[115%] w-[90%] origin-top sm:right-[-6%] sm:w-[70%] lg:right-[-2%] lg:w-[55%]"
      />

      <Particles className="absolute inset-0 h-full w-full" />

      {/* Product on pedestal */}
      <motion.div
        style={{ y: productY }}
        className="pointer-events-none relative z-0 mx-auto mb-4 w-[40vw] max-w-[220px] sm:w-[34vw] lg:absolute lg:bottom-[12%] lg:right-[10%] lg:mb-0 lg:w-[min(36vw,520px)] lg:max-w-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.55, ease }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 mx-auto w-[78%]"
          >
            <Pack pack={hero.pack} name={hero.name} brand={hero.brand} size="1 kg" shadow={false} className="h-auto w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
          </motion.div>
          {/* pedestal */}
          <div className="relative z-0 mx-auto -mt-[7%] w-full">
            <div className="mx-auto h-8 w-[92%] rounded-[50%] bg-[radial-gradient(closest-side,#4a535e,#232930)] shadow-[inset_0_1px_0_rgba(182,242,58,0.55),0_0_80px_rgba(182,242,58,0.18)]" />
            <div className="mx-auto -mt-4 h-12 w-[92%] sm:h-24 rounded-b-[40%_18%] bg-[linear-gradient(90deg,#07080a_0%,#20262e_35%,#2c333c_45%,#14181d_70%,#07080a_100%)] sm:h-32" />
          </div>
        </motion.div>

        {/* lab callouts */}
        {hero.highlights.slice(0, 2).map((h, i) => (
          <motion.div
            key={h}
            initial={{ opacity: 0, x: i ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 + i * 0.2, ease }}
            className={`absolute hidden items-center gap-3 lg:flex ${i ? "-right-24 top-[60%] flex-row-reverse" : "-left-28 top-[24%]"}`}
          >
            <span className="whitespace-nowrap rounded-full border border-white/15 bg-ink/70 px-3 py-1.5 text-[0.7rem] font-medium text-fg backdrop-blur">
              {h}
            </span>
            <span className="h-px w-14 bg-gradient-to-r from-lime/0 via-lime to-lime/0" />
            <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#b6f23a]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Copy */}
      <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-4 flex items-center gap-3 text-lime lg:mb-6"
        >
          <span className="h-px w-8 bg-lime" aria-hidden /> Performance nutrition lab
        </motion.p>
        <h1 id="hero-title" className="display text-[clamp(3.5rem,min(12.5vw,15.5vh),10.5rem)] text-fg">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className={`block ${i === 2 ? "text-lime" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg"
        >
          Discover premium sports nutrition designed to complement your training, recovery, and everyday wellness routine.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <ButtonLink href="/shop" magnetic>
            Shop supplements <ArrowRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href="#shop-by-goal" variant="ghost" magnetic>
            Explore our range
          </ButtonLink>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem] text-muted"
        >
          {store.heroTrust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-lime" aria-hidden /> {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.a
        href="#shop-by-goal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 right-6 z-10 hidden flex-col items-center gap-3 text-[0.62rem] uppercase tracking-[0.3em] text-muted hover:text-lime lg:flex"
        aria-label="Scroll to shop by goal"
      >
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-line">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-lime" />
        </span>
      </motion.a>
    </section>
  );
}
