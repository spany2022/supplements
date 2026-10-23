"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Unsplash serves resized, format-negotiated images from its own CDN,
 * so we hand next/image a URL instead of proxying through the Next optimizer.
 */
export default function unsplashLoader({ src, width, quality }: LoaderArgs) {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  return url.toString();
}
