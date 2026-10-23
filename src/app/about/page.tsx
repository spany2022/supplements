import type { Metadata } from "next";
import Image from "next/image";
import { store } from "@/lib/store-config";
import { unsplash } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us",
  description: "Kynetic is a performance nutrition store built on clear labels, authentic stock and honest product information.",
  alternates: { canonical: "/about" },
};

const principles = [
  { title: "Label first", body: "If it’s not on the label, we don’t claim it. Ingredients, doses and warnings are shown before you buy." },
  { title: "No miracle promises", body: "Supplements support training and diet — they don’t replace them. Our copy reflects that." },
  { title: "Authentic stock", body: "We buy from brands and authorised distributors, and check seals, batch codes and dates on every shipment." },
  { title: "Real support", body: "Questions about a product? We’ll get answers from the brand rather than guess." },
];

export default function AboutPage() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden border-b border-line">
        <Image src={unsplash("1534438327276-14e5300c3a48")} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-25 grayscale" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-24 sm:px-6 lg:px-10 lg:pt-36">
          <p className="eyebrow flex items-center gap-3 text-lime">
            <span className="h-px w-8 bg-lime" aria-hidden /> About Kynetic
          </p>
          <h1 className="display mt-6 max-w-5xl text-[clamp(4rem,11vw,10rem)]">
            Engineered for <span className="text-lime">clarity.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {store.tagline} We started Kynetic because buying supplements shouldn’t require decoding hype. Every product we list comes with its full label, a clear price and a straight answer.
          </p>
        </div>
      </section>

      <section aria-labelledby="principles" className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
        <h2 id="principles" className="heading text-[clamp(2.4rem,5vw,4.4rem)]">What we stand by</h2>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.6rem] border border-line bg-line sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="bg-ink-2 p-8 lg:p-12">
              <span className="display text-4xl text-lime">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading mt-4 text-3xl">{p.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-16 flex flex-wrap gap-3">
          <ButtonLink href="/shop">Shop the range</ButtonLink>
          <ButtonLink href="/help/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
