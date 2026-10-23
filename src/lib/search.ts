import { dietaryLabels, getCategory, type Product } from "./catalog";

const haystack = (p: Product) =>
  [
    p.name,
    p.brand,
    p.tagline,
    p.form,
    getCategory(p.category)?.name,
    p.ingredients,
    ...p.dietary.map((d) => dietaryLabels[d]),
    ...p.variants.map((v) => v.flavor ?? ""),
  ]
    .join(" ")
    .toLowerCase();

/** Every query word must appear somewhere; name matches rank first. */
export function searchProducts(list: Product[], query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return list;
  return list
    .filter((p) => {
      const h = haystack(p);
      return words.every((w) => h.includes(w));
    })
    .sort((a, b) => {
      const an = words.some((w) => a.name.toLowerCase().includes(w)) ? 1 : 0;
      const bn = words.some((w) => b.name.toLowerCase().includes(w)) ? 1 : 0;
      return bn - an || b.popularity - a.popularity;
    });
}
