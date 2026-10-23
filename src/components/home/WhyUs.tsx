import { BadgeCheck, LockKeyhole, ScrollText, Truck } from "lucide-react";
import { store } from "@/lib/store-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons = { badge: BadgeCheck, label: ScrollText, lock: LockKeyhole, truck: Truck } as const;

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="relative border-t border-line bg-ink-2 py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          id="why-title"
          eyebrow="Why Kynetic"
          title={
            <>
              Promises we can <span className="text-lime">keep.</span>
            </>
          }
          intro="No miracle claims. Just the basics of a good supplement store, done properly."
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {store.promises.map((p, i) => {
            const Icon = icons[p.icon];
            return (
              <Reveal as="li" key={p.title} delay={i * 0.08}>
                <div className="spin-border group relative h-full overflow-hidden rounded-[1.6rem] border border-line bg-card p-7 transition-colors duration-500 hover:border-transparent">
                  <div aria-hidden className="hairline-grid absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink text-lime transition-transform duration-500 group-hover:-translate-y-1">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                  </span>
                  <h3 className="relative mt-10 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-fg">{p.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{p.body}</p>
                  <span aria-hidden className="display absolute right-6 top-5 text-3xl text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
