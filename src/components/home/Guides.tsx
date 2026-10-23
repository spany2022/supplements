import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { guides } from "@/lib/guides";
import { cx, formatDate, unsplash } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function GuideCard({ guide, large }: { guide: (typeof guides)[number]; large?: boolean }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group flex h-full flex-col">
      <div className={cx("relative overflow-hidden rounded-[1.4rem] bg-paper-2", large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]")}>
        <Image
          src={unsplash(guide.image)}
          alt={guide.alt}
          fill
          sizes={large ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <p className="text-xs text-graphite">
          <time dateTime={guide.published}>{formatDate(guide.published)}</time> · {guide.readMinutes} min read
        </p>
        <h3 className={cx("heading mt-2 text-ink", large ? "text-3xl lg:text-4xl" : "text-xl")}>{guide.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-graphite">{guide.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink">
          Read guide
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function Guides() {
  const [lead, ...rest] = guides;
  return (
    <section aria-labelledby="guides-title" className="on-paper relative bg-paper py-24 text-ink lg:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="guides-title"
          tone="paper"
          eyebrow="Education & buying guides"
          title="Read the label like a pro."
          intro="Plain-language guides to help you compare products and buy with confidence. No hype, no guaranteed results."
          action={
            <ButtonLink href="/guides" variant="light">
              All guides
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <Reveal className="flex">
            <GuideCard guide={lead} large />
          </Reveal>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {rest.map((g, i) => (
              <Reveal as="li" key={g.slug} delay={i * 0.06}>
                <GuideCard guide={g} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
