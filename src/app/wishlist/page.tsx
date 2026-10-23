import type { Metadata } from "next";
import { WishlistView } from "@/components/shop/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
  alternates: { canonical: "/wishlist" },
};

export default function WishlistPage() {
  return <WishlistView />;
}
