import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { store } from "@/lib/store-config";
import { formatINR } from "@/lib/format";
import { PrototypeNotice } from "@/components/ui/PrototypeNotice";

/**
 * Policy and support pages. Text is a template for a fictional store — have
 * the business and its legal adviser replace it before launch.
 */

type Page = { title: string; description: string; sections: { h?: string; p: string[] }[] };

const s = store.shipping;

const pages: Record<string, Page> = {
  "shipping-returns": {
    title: "Shipping & Returns",
    description: "Delivery times, shipping fees and our returns policy for supplements.",
    sections: [
      {
        h: "Shipping",
        p: [
          `Standard delivery: ${s.standardEta}. ${formatINR(s.standardFee)}, or free on orders above ${formatINR(s.freeThreshold)}.`,
          `Express delivery: ${s.expressEta}. ${formatINR(s.expressFee)}.`,
          "Orders placed before 2 pm IST on business days are usually dispatched the same day. You’ll receive tracking details by SMS and email.",
        ],
      },
      {
        h: "Returns",
        p: [
          store.returns.summary,
          "If an item arrives damaged, tampered with or incorrect, contact us within 48 hours of delivery with photos of the product and packaging, and we’ll arrange a replacement or refund.",
          "Refunds are issued to the original payment method within 5–7 business days of the return being approved.",
        ],
      },
    ],
  },
  faq: {
    title: "FAQ",
    description: "Answers to common questions about orders, products and delivery.",
    sections: [
      { h: "Are your products authentic?", p: ["We buy from brands and their authorised distributors. Every product is sealed and carries a batch number, manufacturing date and best-before date."] },
      { h: "Can you recommend a supplement for me?", p: ["We can explain what’s on a label, but we can’t give personal medical or nutrition advice. If you have a health condition, are pregnant or take medication, please speak to a doctor first."] },
      { h: "Do you ship across India?", p: ["Yes — we ship to most serviceable PIN codes. Delivery estimates are shown at checkout."] },
      { h: "Which payment methods do you accept?", p: [`${store.paymentMethods.join(", ")}. Payments are processed by a regulated payment gateway.`] },
      { h: "Where can I find the FSSAI licence number?", p: ["On the product label, along with the manufacturer or marketer’s details. Product pages will list it once verified label data is loaded."] },
    ],
  },
  contact: {
    title: "Contact Us",
    description: "Reach Kynetic customer support by email or phone.",
    sections: [
      { p: [`Email: ${store.contact.email}`, `Phone: ${store.contact.phone}`, `Hours: ${store.contact.hours}`, `Address: ${store.contact.address.join(", ")}`] },
      { h: "Order help", p: ["Please include your order number so we can help faster."] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Kynetic collects, uses and protects your personal data.",
    sections: [
      { h: "What we collect", p: ["Contact and delivery details you give us at checkout, order history, and basic analytics about how the site is used."] },
      { h: "How we use it", p: ["To fulfil and deliver orders, provide support, prevent fraud and — only with your consent — send marketing emails."] },
      { h: "Payments", p: ["Card and UPI details are handled by our payment gateway. We never see or store full card numbers."] },
      { h: "Your rights", p: ["You can request access to, correction of, or deletion of your personal data by contacting us."] },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description: "Terms that apply to purchases from Kynetic.",
    sections: [
      { h: "Products", p: ["Food supplements are not intended to diagnose, treat, cure or prevent any disease. Product information is taken from manufacturer labels; always read the label before use."] },
      { h: "Pricing", p: ["Prices are in Indian Rupees and include GST unless stated otherwise. We may correct pricing errors before an order ships."] },
      { h: "Orders", p: ["An order is confirmed only after successful payment and a confirmation email. We may cancel orders affected by stock errors and issue a full refund."] },
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/help/${slug}` } };
}

export default async function HelpPage({ params }: PageProps<"/help/[slug]">) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-10">
      <nav aria-label="Help topics" className="lg:pt-4">
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {Object.entries(pages).map(([key, p]) => (
            <li key={key}>
              <Link
                href={`/help/${key}`}
                aria-current={key === slug ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-sm transition-colors lg:rounded-lg ${key === slug ? "bg-lime text-ink" : "text-muted hover:bg-card hover:text-fg"}`}
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="max-w-3xl">
        <h1 className="display text-[clamp(3.4rem,8vw,6.5rem)]">{page.title}</h1>
        {store.isPrototype && (
          <PrototypeNotice className="mt-6">
            Template text for a demo store. Replace with the business’s actual policies (reviewed by a legal adviser) and real contact details before launch.
          </PrototypeNotice>
        )}
        <div className="mt-10 space-y-10">
          {page.sections.map((sec, i) => (
            <section key={i}>
              {sec.h && <h2 className="heading text-2xl">{sec.h}</h2>}
              {sec.p.map((t) => (
                <p key={t} className="mt-3 leading-relaxed text-muted">
                  {t}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
