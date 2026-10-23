"use client";

import { useId } from "react";
import type { PackStyle } from "@/lib/catalog";

/**
 * Studio-rendered packshot. Until real product photography is supplied, every
 * product is drawn as a vector container in its own colourway so the catalog
 * keeps consistent ratios and lighting. Swap for <Image> once photos exist.
 */

type Props = {
  pack: PackStyle;
  name: string;
  brand: string;
  size?: string;
  className?: string;
  /** Soft contact shadow under the container */
  shadow?: boolean;
  decorative?: boolean;
};

const splitName = (name: string) => {
  const words = name.split(" ");
  if (words.length === 1) return [name];
  let best: [string, string] = [name, ""];
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const diff = Math.abs(a.length - b.length);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = [a, b];
    }
  }
  return best;
};

const geometry = {
  tub: { lid: [38, 30, 164, 34], body: [44, 62, 152, 220], label: [44, 104, 152, 146], textW: 128 },
  jar: { lid: [46, 84, 148, 30], body: [50, 112, 140, 170], label: [50, 138, 140, 118], textW: 116 },
  pouch: { lid: [0, 0, 0, 0], body: [46, 30, 148, 254], label: [62, 104, 116, 136], textW: 100 },
  bottle: { lid: [86, 48, 68, 40], body: [62, 100, 116, 182], label: [62, 140, 116, 112], textW: 96 },
} as const;

export function Pack({ pack, name, brand, size, className, shadow = true, decorative }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, "");
  const id = (s: string) => `${s}${raw}`;
  const g = geometry[pack.kind];
  const [bx, by, bw, bh] = g.body;
  const [lx, ly, lw, lh] = g.label;
  const lines = splitName(name);
  const longest = Math.max(...lines.map((l) => l.length));
  const nameSize = Math.min(pack.kind === "tub" ? 24 : 19, g.textW / (longest * 0.56));
  const cx = 120;
  const labelMid = ly + lh / 2;

  const bodyPath =
    pack.kind === "pouch"
      ? `M${bx + 6} ${by} H${bx + bw - 6} L${bx + bw + 4} ${by + bh - 24} Q${bx + bw + 6} ${by + bh} ${bx + bw - 18} ${by + bh} H${bx + 18} Q${bx - 6} ${by + bh} ${bx - 4} ${by + bh - 24} Z`
      : pack.kind === "bottle"
        ? `M${bx + 18} ${by} H${bx + bw - 18} Q${bx + bw} ${by} ${bx + bw} ${by + 22} V${by + bh - 10} Q${bx + bw} ${by + bh} ${bx + bw - 12} ${by + bh} H${bx + 12} Q${bx} ${by + bh} ${bx} ${by + bh - 10} V${by + 22} Q${bx} ${by} ${bx + 18} ${by} Z`
        : `M${bx} ${by} H${bx + bw} V${by + bh - 8} Q${bx + bw} ${by + bh + 6} ${cx} ${by + bh + 6} Q${bx} ${by + bh + 6} ${bx} ${by + bh - 8} Z`;

  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${brand} ${name}${size ? `, ${size}` : ""}`}
    >
      <defs>
        <linearGradient id={id("shade")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.62" />
          <stop offset="0.16" stopColor="#000" stopOpacity="0.14" />
          <stop offset="0.32" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.08" />
          <stop offset="0.9" stopColor="#000" stopOpacity="0.42" />
          <stop offset="1" stopColor="#000" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={id("top")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("floor")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <path d={bodyPath} />
        </clipPath>
      </defs>

      {shadow && <ellipse cx={cx} cy={290} rx={pack.kind === "bottle" ? 70 : 96} ry={9} fill={`url(#${id("floor")})`} />}

      {/* body */}
      <path d={bodyPath} fill={pack.body} />
      <g clipPath={`url(#${id("clip")})`}>
        <rect x={lx - 20} y={ly} width={lw + 40} height={lh} fill={pack.label} />
        <rect x={lx - 20} y={ly + lh - 10} width={lw + 40} height={4} fill={pack.accent} opacity={0.9} />
        {pack.kind === "pouch" && (
          <>
            <rect x={bx} y={by} width={bw} height={22} fill="#000" opacity={0.18} />
            {Array.from({ length: 22 }, (_, i) => (
              <rect key={i} x={bx + 4 + i * 6.6} y={by + 4} width={2} height={14} fill="#fff" opacity={0.12} />
            ))}
            <rect x={bx} y={by + 34} width={bw} height={2} fill="#000" opacity={0.25} />
          </>
        )}
        {/* label typography */}
        <text
          x={cx}
          y={ly + 20}
          textAnchor="middle"
          fill={pack.ink}
          opacity={0.75}
          style={{ font: "600 7.5px var(--font-inter), sans-serif", letterSpacing: "0.32em" }}
        >
          {brand.toUpperCase()}
        </text>
        {lines.map((line, i) => (
          <text
            key={line}
            x={cx}
            y={labelMid - (lines.length - 1) * nameSize * 0.5 + i * nameSize * 1.02 + nameSize * 0.32}
            textAnchor="middle"
            fill={pack.ink}
            style={{ font: `700 ${nameSize}px var(--font-display), sans-serif`, letterSpacing: "-0.01em" }}
          >
            {line.toUpperCase()}
          </text>
        ))}
        {size && (
          <text
            x={cx}
            y={ly + lh - 18}
            textAnchor="middle"
            fill={pack.ink}
            opacity={0.7}
            style={{ font: "600 7px var(--font-inter), sans-serif", letterSpacing: "0.2em" }}
          >
            {size.toUpperCase()}
          </text>
        )}
        {/* cylindrical shading + specular */}
        <rect x={bx - 10} y={by - 10} width={bw + 20} height={bh + 20} fill={`url(#${id("shade")})`} />
        <rect x={bx + bw * 0.26} y={by} width={3} height={bh} fill="#fff" opacity={0.22} />
        <rect x={bx + bw * 0.3} y={by} width={10} height={bh} fill="#fff" opacity={0.05} />
      </g>

      {/* lids & caps */}
      {(pack.kind === "tub" || pack.kind === "jar") && (
        <g>
          <rect x={g.lid[0]} y={g.lid[1]} width={g.lid[2]} height={g.lid[3]} rx={4} fill={pack.kind === "tub" ? "#0B0D10" : pack.accent === "#0B0D10" ? "#14181D" : "#0B0D10"} />
          {Array.from({ length: Math.floor(g.lid[2] / 6) }, (_, i) => (
            <rect key={i} x={g.lid[0] + 3 + i * 6} y={g.lid[1] + 6} width={2} height={g.lid[3] - 10} fill="#fff" opacity={0.06} />
          ))}
          <ellipse cx={cx} cy={g.lid[1]} rx={g.lid[2] / 2} ry={7} fill="#1B2026" />
          <ellipse cx={cx} cy={g.lid[1]} rx={g.lid[2] / 2} ry={7} fill={`url(#${id("top")})`} />
          <rect x={g.lid[0]} y={g.lid[1]} width={g.lid[2]} height={g.lid[3]} rx={4} fill={`url(#${id("shade")})`} />
          <rect x={g.lid[0]} y={g.lid[1] + g.lid[3] - 3} width={g.lid[2]} height={3} fill={pack.accent} opacity={0.85} />
        </g>
      )}
      {pack.kind === "bottle" && (
        <g>
          <path d={`M${bx + 22} ${by + 2} Q${cx} ${by - 18} ${bx + bw - 22} ${by + 2} Z`} fill={pack.body} />
          <rect x={92} y={86} width={56} height={16} fill={pack.body} />
          <rect x={92} y={86} width={56} height={16} fill={`url(#${id("shade")})`} />
          <rect x={g.lid[0]} y={g.lid[1]} width={g.lid[2]} height={g.lid[3]} rx={5} fill="#0B0D10" />
          {Array.from({ length: 11 }, (_, i) => (
            <rect key={i} x={g.lid[0] + 4 + i * 6} y={g.lid[1] + 4} width={2} height={g.lid[3] - 8} fill="#fff" opacity={0.08} />
          ))}
          <rect x={g.lid[0]} y={g.lid[1]} width={g.lid[2]} height={g.lid[3]} rx={5} fill={`url(#${id("shade")})`} />
        </g>
      )}
    </svg>
  );
}
