import Link from "next/link";
import { categories } from "@/lib/catalog";
import { store } from "@/lib/store-config";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";

const columns = [
  {
    title: "Shop",
    links: [{ label: "Shop all", href: "/shop" }, ...categories.map((c) => ({ label: c.name, href: `/shop/${c.slug}` }))],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", href: "/help/contact" },
      { label: "FAQ", href: "/help/faq" },
      { label: "Shipping & returns", href: "/help/shipping-returns" },
      { label: "Track an order", href: "/account" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Buying guides", href: "/guides" },
      { label: "Privacy policy", href: "/help/privacy" },
      { label: "Terms & conditions", href: "/help/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-20 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="space-y-8">
            <Logo />
            <p className="max-w-sm leading-relaxed text-muted">{store.description}</p>
            <Newsletter />
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="eyebrow mb-5 text-fg">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-lime">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h2 className="eyebrow mb-5 text-fg">Contact</h2>
              <address className="space-y-3 text-sm not-italic text-muted">
                <a href={`mailto:${store.contact.email}`} className="block break-all hover:text-lime">
                  {store.contact.email}
                </a>
                <a href={store.contact.phoneHref} className="block hover:text-lime">
                  {store.contact.phone}
                </a>
                <p>{store.contact.hours}</p>
              </address>
              <ul className="mt-6 flex flex-wrap gap-2">
                {store.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-xs text-muted transition-colors hover:border-lime hover:text-lime"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="display pointer-events-none mt-20 select-none text-center text-[clamp(5rem,22vw,22rem)] leading-[0.8] text-white/[0.035]">
          Kynetic
        </p>

        <div className="mt-6 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {store.legalName}. Food supplements are not a substitute for a varied diet. Not for medicinal use.
          </p>
          <div className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
            {store.paymentMethods.map((m) => (
              <span key={m} className="rounded-md border border-line bg-ink-2 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
