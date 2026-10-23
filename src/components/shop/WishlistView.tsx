"use client";

import { Heart } from "lucide-react";
import { products } from "@/lib/catalog";
import { useStore } from "@/lib/cart";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";

export function WishlistView() {
  const { wishlist, hydrated } = useStore();
  const saved = products.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-12 sm:px-6 lg:px-10">
      <h1 className="display text-[clamp(3.6rem,9vw,7rem)]">Wishlist</h1>
      <p className="mt-3 text-muted">Saved on this device. Sign-in sync arrives once customer accounts are connected.</p>
      {!hydrated ? null : saved.length === 0 ? (
        <div className="mt-10 flex flex-col items-start gap-6 rounded-[1.6rem] border border-dashed border-line p-10">
          <Heart className="h-8 w-8 text-lime" aria-hidden />
          <p className="text-lg text-muted">Nothing saved yet. Tap the heart on any product to keep it here.</p>
          <ButtonLink href="/shop">Browse products</ButtonLink>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {saved.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
