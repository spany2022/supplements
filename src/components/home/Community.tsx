"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { communityPhotos, communityReviews } from "@/lib/community";
import { store } from "@/lib/store-config";
import { cx, unsplash } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";

export function Community() {
  const track = useRef<HTMLUListElement>(null);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const reduceMotion = useReducedMotion();
  const autoplay = playing && !reduceMotion;

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = (card?.clientWidth ?? 380) + 20;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  useEffect(() => {
    if (!autoplay || hovered) return;
    const t = setInterval(() => step(1), 5000);
    return () => clearInterval(t);
     
  }, [autoplay, hovered]);

  return (
    <section aria-labelledby="community-title" className="relative overflow-hidden border-t border-line bg-ink py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3 text-lime">
              <span className="h-px w-8 bg-lime" aria-hidden /> Community
            </p>
            <h2 id="community-title" className="display text-[clamp(3.6rem,9vw,8.5rem)] text-fg">
              Real people.
              <br />
              <span className="text-lime">Real training</span>
              <br />
              journeys.
            </h2>
          </Reveal>
          <ul className="grid grid-cols-2 gap-3">
            {communityPhotos.map((ph, i) => (
              <Reveal as="li" key={ph.id} delay={i * 0.07} className={cx("relative overflow-hidden rounded-2xl", i % 2 ? "mt-10 aspect-[3/4]" : "aspect-[3/4]")}>
                <Image
                  src={unsplash(ph.id)}
                  alt={ph.alt}
                  fill
                  sizes="(min-width:1024px) 22vw, 50vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 hover:scale-105 hover:grayscale-0"
                />
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
          {store.isPrototype ? (
            <PrototypeNotice className="max-w-2xl">
              Review cards below are layout samples, not real customers. Connect a verified review platform and gather consent before showing customer stories or photos.
            </PrototypeNotice>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPlaying(!autoplay)}
              className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg hover:border-lime hover:text-lime"
              aria-label={autoplay ? "Pause automatic scrolling" : "Start automatic scrolling"}
            >
              {autoplay ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
            </button>
            <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg hover:border-lime hover:text-lime" aria-label="Previous review">
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-fg hover:border-lime hover:text-lime" aria-label="Next review">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label="Customer feedback"
        className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2.5rem,calc((100vw_-_1440px)/2_+_2.5rem))]"
      >
        {communityReviews.map((r) => (
          <li key={r.id} className="w-[85vw] max-w-[420px] shrink-0 snap-start">
            <figure className="flex h-full flex-col rounded-[1.6rem] border border-line bg-card p-7">
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-lime" aria-hidden />
                {!r.verified && (
                  <span className="rounded-full border border-amber-300/40 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-amber-300">
                    Sample
                  </span>
                )}
              </div>
              <blockquote className="mt-6 flex-1 font-[family-name:var(--font-display)] text-xl leading-snug tracking-tight text-fg">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-5 text-sm">
                <span>
                  <span className="block font-medium text-fg">{r.name}</span>
                  <span className="text-muted">{r.city}</span>
                </span>
                <Link href={`/products/${r.productSlug}`} className="text-right text-xs text-lime underline-offset-4 hover:underline">
                  {r.product}
                </Link>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
