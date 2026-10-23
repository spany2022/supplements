import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { products } from "@/lib/catalog";
import { formatDate, unsplash } from "@/lib/format";
import { JsonLd, articleLd } from "@/lib/structured-data";
import { ProductCard } from "@/components/product/ProductCard";
import { GuideCard } from "@/components/home/Guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.excerpt,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.excerpt,
      publishedTime: g.published,
      images: [{ url: `${unsplash(g.image)}?w=1200&q=70&auto=format`, alt: g.alt }],
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const shop = g.relatedCategory ? products.filter((p) => p.category === g.relatedCategory).slice(0, 3) : [];
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <article className="on-paper bg-paper text-ink">
      <JsonLd data={articleLd(g)} />
      <header className="mx-auto max-w-4xl px-4 pt-14 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-graphite">
          <Link href="/guides" className="hover:text-ink hover:underline">
            ← All guides
          </Link>
        </nav>
        <h1 className="heading mt-6 text-[clamp(2.6rem,6vw,4.8rem)]">{g.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-graphite">{g.excerpt}</p>
        <p className="mt-6 text-sm text-graphite">
          <time dateTime={g.published}>{formatDate(g.published)}</time> · {g.readMinutes} min read
        </p>
      </header>
      <div className="relative mx-auto mt-10 aspect-[16/8] max-w-6xl overflow-hidden px-4 sm:rounded-[2rem] sm:px-0">
        <Image src={unsplash(g.image)} alt={g.alt} fill priority sizes="(min-width:1152px) 1152px, 100vw" className="object-cover sm:rounded-[2rem]" />
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-20 pt-14 text-[1.075rem] leading-[1.8] text-ink/85 sm:px-6">
        {g.body.map((b, i) =>
          b.type === "h" ? (
            <h2 key={i} className="heading mb-4 mt-12 text-3xl text-ink">
              {b.text}
            </h2>
          ) : b.type === "list" ? (
            <ul key={i} className="my-6 space-y-2.5 pl-1">
              {b.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-2" />
                  {it}
                </li>
              ))}
            </ul>
          ) : (
            <p key={i} className="my-5">
              {b.text}
            </p>
          ),
        )}
        <p className="mt-12 rounded-2xl border border-ink/15 bg-white/60 p-5 text-sm leading-relaxed text-graphite">
          This guide is general information, not medical advice. Speak to a doctor or registered dietitian about your individual needs.
        </p>
      </div>

      {shop.length > 0 && (
        <section aria-labelledby="guide-shop" className="bg-ink py-20 text-fg">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h2 id="guide-shop" className="heading text-4xl">Shop the category</h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shop.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="more-guides" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10">
        <h2 id="more-guides" className="heading text-4xl">Keep reading</h2>
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((m) => (
            <li key={m.slug}>
              <GuideCard guide={m} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
