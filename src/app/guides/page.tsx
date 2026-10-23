import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import { GuideCard } from "@/components/home/Guides";

export const metadata: Metadata = {
  title: "Buying Guides",
  description: "Plain-language supplement guides: reading labels, understanding protein servings, creatine FAQs and choosing what fits your needs.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="on-paper bg-paper text-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-16 sm:px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-3 text-graphite">
          <span className="h-px w-8 bg-graphite" aria-hidden /> Education
        </p>
        <h1 className="display mt-5 text-[clamp(4rem,11vw,9rem)]">Buying guides</h1>
        <p className="mt-4 max-w-xl text-lg text-graphite">
          Evidence-conscious explainers to help you read labels, compare products and decide what — if anything — belongs in your routine.
        </p>
        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <li key={g.slug}>
              <GuideCard guide={g} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
