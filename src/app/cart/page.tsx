import type { Metadata } from "next";
import { CartView } from "@/components/checkout/CartView";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartView />;
}
