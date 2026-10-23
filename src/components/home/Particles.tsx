"use client";

import { useEffect, useRef } from "react";

/**
 * Powder-like dust drifting through the hero's light beam. Lightweight 2D
 * canvas; particle count scales with viewport, pauses off-screen and is
 * skipped entirely for reduced-motion users.
 */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number };
    let ps: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(140, (w * h) / (w < 768 ? 16000 : 9000)));
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.25 - 0.04,
        a: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      const beamX = w * 0.68;
      for (const p of ps) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 0.6;
          p.vx += (dx / Math.sqrt(d2 + 1)) * f * 0.08;
          p.vy += (dy / Math.sqrt(d2 + 1)) * f * 0.08;
        }
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 - 0.002;
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
          p.vy = -Math.random() * 0.25 - 0.04;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        // Particles inside the beam catch more light.
        const inBeam = Math.max(0, 1 - Math.abs(p.x - beamX) / (w * 0.18));
        const alpha = p.a * (0.35 + inBeam * 0.9) * (0.75 + Math.sin(p.tw) * 0.25);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 + inBeam * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = inBeam > 0.6 && p.r > 1.4 ? `rgba(182,242,58,${alpha * 0.8})` : `rgba(245,247,242,${alpha})`;
        ctx.fill();
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
