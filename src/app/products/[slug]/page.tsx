import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { defaultVariant, getCategory, getProduct, products, relatedProducts } from "@/lib/catalog";
import { store } from "@/lib/store-config";
import { formatINR } from "@/lib/format";
import { JsonLd, breadcrumbLd, productLd } from "@/lib/structured-data";
import { ProductView } from "@/components/product/ProductView";
import { NutritionPanel } from "@/components/product/NutritionPanel";
import { ProductCard } from "@/components/product/ProductCard";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const v = defaultVariant(p);
  const description = `${p.description} ${p.servingSize} per serving. From ${formatINR(v.price)}.`;
  return {
    title: `${p.name} by ${p.brand}`,
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { type: "website", title: `${p.name} — ${p.brand}`, description },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const category = getCategory(p.category)!;
  const related = relatedProducts(p);
  const servings = defaultVariant(p).servings;

  const sections = [
    { title: "Description", body: <p>{p.description}</p>, open: true },
    { title: "Ingredients", body: <p>{p.ingredients}</p>, open: true },
    {
      title: "Nutrition facts",
      body: (
        <>
          <NutritionPanel product={p} servings={servings} className="max-w-md" />
          <p className="mt-3 text-xs">Servings per container vary by pack size — see the size selector above.</p>
        </>
      ),
    },
    { title: "Directions for use", body: <p>{p.directions}</p> },
    { title: "Allergen information", body: <p>{p.allergens}</p> },
    { title: "Warnings", body: <p>{p.warnings}</p> },
    {
      title: "Shipping & returns",
      body: (
        <div className="space-y-2">
          <p>
            Standard delivery {store.shipping.standardEta}: {formatINR(store.shipping.standardFee)}, free on orders above{" "}
            {formatINR(store.shipping.freeThreshold)}. Express {store.shipping.expressEta}: {formatINR(store.shipping.expressFee)}.
          </p>
          <p>{store.returns.summary}</p>
          <Link href="/help/shipping-returns" className="text-lime underline underline-offset-4">
            Full shipping & returns policy
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={productLd(p)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: category.name, path: `/shop/${category.slug}` },
          { name: p.name, path: `/products/${p.slug}` },
        ])}
      />
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-8 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-lime">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/shop/${category.slug}`} className="hover:text-lime">{category.name}</Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-fg">{p.name}</li>
          </ol>
        </nav>

        <ProductView product={p} />

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <section aria-labelledby="details-title">
            <h2 id="details-title" className="heading text-4xl">Product details</h2>
            {store.isPrototype && (
              <PrototypeNotice className="mt-6">
                Sample product data for demonstration. Ingredients, nutrition, directions and warnings must be replaced with the manufacturer’s printed label before launch.
              </PrototypeNotice>
            )}
            <div className="mt-6 divide-y divide-line border-y border-line">
              {sections.map((s) => (
                <details key={s.title} open={s.open} className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight [&::-webkit-details-marker]:hidden">
                    {s.title}
                    <ChevronDown className="h-5 w-5 text-muted transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <div className="pb-6 leading-relaxed text-muted">{s.body}</div>
                </details>
              ))}
            </div>
          </section>
          <aside aria-label="Before you buy" className="space-y-4 lg:pt-16">
            <div className="rounded-[1.6rem] border border-line bg-card p-7">
              <p className="eyebrow text-lime">Before you buy</p>
              <p className="mt-4 leading-relaxed text-muted">
                Food supplements are not a substitute for a varied, balanced diet. If you are pregnant, breastfeeding, under 18, managing a medical condition or taking medication, talk to your doctor before use.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-line bg-card p-7">
              <p className="eyebrow text-lime">Questions about this product?</p>
              <p className="mt-4 leading-relaxed text-muted">
                We can request label details or documentation from the brand for you.
              </p>
              <a href={`mailto:${store.contact.email}?subject=${encodeURIComponent(`Question about ${p.name}`)}`} className="mt-4 inline-block text-sm text-lime underline underline-offset-4">
                {store.contact.email}
              </a>
            </div>
          </aside>
        </div>

        <section aria-labelledby="related-title" className="mt-24">
          <h2 id="related-title" className="heading text-4xl">You may also consider</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard product={r} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
