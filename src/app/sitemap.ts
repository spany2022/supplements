import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { guides } from "@/lib/guides";
import { SITE_URL } from "@/lib/store-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/shop"), changeFrequency: "daily", priority: 0.9 },
    ...categories.map((c) => ({ url: url(`/shop/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...products.map((p) => ({ url: url(`/products/${p.slug}`), changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: url("/guides"), changeFrequency: "weekly", priority: 0.6 },
    ...guides.map((g) => ({ url: url(`/guides/${g.slug}`), lastModified: g.published, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: url("/about"), changeFrequency: "yearly", priority: 0.4 },
    ...["shipping-returns", "faq", "contact", "privacy", "terms"].map((s) => ({
      url: url(`/help/${s}`),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
