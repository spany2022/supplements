"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { unsplash } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Pack } from "@/components/product/Pack";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const packY = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const a = getProduct("creatine-monohydrate")!;
  const b = getProduct("whey-isolate-pro")!;

  return (
    <section ref={ref} aria-labelledby="final-title" className="grain relative isolate overflow-hidden bg-ink py-28 lg:py-44">
      <motion.div style={{ y: bgY }} className="absolute inset-[-10%] -z-10">
        <Image
          src={unsplash("1605296867304-46d5465a13f1")}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_75%_50%,transparent,#0b0d10_75%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-transparent" />

      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-10">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-3 text-lime">
            <span className="h-px w-8 bg-lime" aria-hidden /> Start today
          </p>
          <h2 id="final-title" className="display text-[clamp(4rem,11vw,10rem)] text-fg">
            Your next chapter <span className="text-lime">starts here.</span>
          </h2>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
            Find the products that fit your routine and make every training session count.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop" magnetic>
              Shop the collection <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/guides" variant="ghost" magnetic>
              Explore buying guides
            </ButtonLink>
          </div>
        </div>
        <motion.div style={{ y: packY }} className="relative mx-auto flex w-full max-w-md items-end justify-center" aria-hidden>
          <div className="beam absolute -top-1/2 left-1/2 h-[180%] w-[160%] -translate-x-1/2" />
          <Pack pack={b.pack} name={b.name} brand={b.brand} size="2 kg" decorative className="relative z-10 w-[62%] -rotate-3 drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]" />
          <Pack pack={a.pack} name={a.name} brand={a.brand} size="500 g" decorative className="relative z-20 -ml-[18%] w-[46%] rotate-6 drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]" />
        </motion.div>
      </div>
    </section>
  );
}
