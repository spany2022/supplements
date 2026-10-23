# Kynetic — premium supplement store (prototype)

Next.js 16 · TypeScript · Tailwind 4 · Framer Motion · GSAP ScrollTrigger · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## What's real vs sample

Everything a customer could mistake for fact is either config-driven or flagged:

| Area | Where | Status |
| --- | --- | --- |
| Store promises, shipping fees, returns, contact, payment methods | `src/lib/store-config.ts` | Placeholders — confirm with the business |
| Products, prices, stock, nutrition, ingredients | `src/lib/catalog.ts` | **Sample data** — replace with manufacturer labels / commerce feed |
| Reviews | `src/lib/community.ts` | **Placeholders**, shown with a "Sample" badge |
| Buying guides | `src/lib/guides.ts` | Draft copy — have a nutrition professional review |
| Policies | `src/app/help/[slug]/page.tsx` | Template text — legal review needed |
| Packshots | `src/components/product/Pack.tsx` | Vector renders until product photography exists |
| Lifestyle photos | Unsplash (free licence) | — |

While `store.isPrototype` is `true`: pages are `noindex`, `robots.txt` disallows all, JSON-LD is withheld, and prototype notices appear on product, review, policy and account pages.

## Commerce

Cart, wishlist, variant selection, stock limits, discount codes (`DEMO10`), shipping calculation and checkout validation all work client-side. **No order is ever created**: with `paymentsConfigured: false` the checkout says so explicitly. To go live, connect a commerce backend (e.g. Shopify Storefront API, Medusa, or a custom API + Razorpay/Cashfree), re-validate stock and prices server-side, then flip `paymentsConfigured` / `authConfigured` / `newsletterConfigured`.

Set `NEXT_PUBLIC_SITE_URL` for canonical URLs, sitemap and Open Graph.
