import type { MetadataRoute } from "next";
import { SITE_URL, store } from "@/lib/store-config";

export default function robots(): MetadataRoute.Robots {
  // Keep the prototype out of search results until real catalog data is live.
  if (store.isPrototype) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/account", "/wishlist"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
