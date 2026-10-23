import { categories, type Product } from "./catalog";
import { SITE_URL, store } from "./store-config";
import type { Guide } from "./guides";

/**
 * Structured data is emitted only when the store is out of prototype mode —
 * sample products, prices and placeholder business details must never reach
 * search engines as if they were real.
 */
export function JsonLd({ data }: { data: object | null }) {
  if (!data || store.isPrototype) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: store.name,
  url: SITE_URL,
  description: store.description,
  email: store.contact.email,
  telephone: store.contact.phone,
  sameAs: store.social.map((s) => s.href),
});

export const productLd = (p: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  brand: { "@type": "Brand", name: p.brand },
  category: categories.find((c) => c.slug === p.category)?.name,
  url: `${SITE_URL}/products/${p.slug}`,
  offers: p.variants.map((v) => ({
    "@type": "Offer",
    sku: v.id,
    name: [p.name, v.flavor, v.size].filter(Boolean).join(" — "),
    price: v.price,
    priceCurrency: "INR",
    availability: v.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    url: `${SITE_URL}/products/${p.slug}`,
  })),
  // Only real, verified review data may populate this.
  ...(p.rating && {
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating.value, reviewCount: p.rating.count },
  }),
});

export const articleLd = (g: Guide) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: g.title,
  description: g.excerpt,
  datePublished: g.published,
  image: `https://images.unsplash.com/photo-${g.image}?w=1200`,
  publisher: { "@type": "Organization", name: store.name },
  mainEntityOfPage: `${SITE_URL}/guides/${g.slug}`,
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});
