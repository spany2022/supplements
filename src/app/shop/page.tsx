import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ShopExplorer } from "@/components/shop/ShopExplorer";

export const metadata: Metadata = {
  title: "Shop All Supplements",
  description:
    "Shop protein, pre-workout, creatine, vitamins and recovery supplements. Filter by goal, brand, price and dietary needs, with full label information on every product.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <ShopHeader
        title="Shop all"
        intro="Every product, every label. Filter by goal, brand, price or dietary preference."
        crumbs={[{ name: "Home", href: "/" }, { name: "Shop" }]}
      />
      <Suspense>
        <ShopExplorer />
      </Suspense>
    </>
  );
}
