import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { categories, getCategory, type CategorySlug } from "@/lib/catalog";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopExplorer } from "@/components/shop/ShopExplorer";
import { JsonLd, breadcrumbLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} Supplements`,
    description: c.description,
    alternates: { canonical: `/shop/${c.slug}` },
    openGraph: { title: `${c.name} | Kynetic`, description: c.description },
  };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: c.name, path: `/shop/${c.slug}` },
        ])}
      />
      <ShopHeader
        title={c.name}
        intro={c.description}
        active={c.slug}
        crumbs={[{ name: "Home", href: "/" }, { name: "Shop", href: "/shop" }, { name: c.name }]}
      />
      <Suspense>
        <ShopExplorer fixedCategory={c.slug as CategorySlug} />
      </Suspense>
    </>
  );
}
