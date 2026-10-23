/**
 * Store-wide settings. Everything a customer reads as a promise — shipping
 * thresholds, return windows, trust points, contact details — lives here so it
 * can be matched to the real business before launch. Values below are
 * placeholders for a fictional store.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const store = {
  name: "Kynetic",
  legalName: "Kynetic Performance Nutrition (demo)",
  tagline: "Fuel your potential. Engineer your performance.",
  description:
    "Premium sports nutrition and everyday wellness — proteins, pre-workouts, creatine and vitamins with clear labels and honest product information.",
  currency: "INR",
  locale: "en-IN",

  /**
   * The catalog, reviews and guides in this build are sample content. While
   * true, product/organisation structured data is withheld and pages show a
   * prototype notice. Flip to false only once real, verified data is loaded.
   */
  isPrototype: true,

  /** Commerce backend status. Checkout never pretends to succeed while false. */
  paymentsConfigured: false,
  authConfigured: false,
  newsletterConfigured: false,

  contact: {
    email: "support@kynetic.example",
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    hours: "Mon – Sat, 10:00 – 18:00 IST",
    address: ["Replace with registered business address", "City, State 000000", "India"],
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "X", href: "https://x.com/" },
  ],

  announcements: [
    "Free shipping on orders above ₹1,499",
    "Every product page lists the full label — ingredients, nutrition & allergens",
    "Secure checkout · UPI, cards & net banking",
  ],

  shipping: {
    freeThreshold: 1499,
    standardFee: 79,
    expressFee: 149,
    standardEta: "3–6 business days",
    expressEta: "1–3 business days (select pin codes)",
  },

  returns: {
    windowDays: 7,
    summary:
      "Unopened, sealed products can be returned within 7 days of delivery. Opened supplements can't be returned for safety reasons unless they arrive damaged or incorrect.",
  },

  /** Prototype-only codes. Remove or replace with codes from the commerce backend. */
  discountCodes: [{ code: "DEMO10", percentOff: 10, label: "Demo code — 10% off" }],

  /** Short trust line under the hero CTAs. Keep to promises the business can keep. */
  heroTrust: ["Brand-authorised stock", "Full label on every product", "Secure checkout"],

  paymentMethods: ["UPI", "Visa", "Mastercard", "RuPay", "Net Banking"],

  /** Why-choose-us cards. Each must be something operations can actually deliver. */
  promises: [
    {
      icon: "badge",
      title: "Authentic products",
      body: "Stock comes from brand-authorised distributors, sealed and batch-coded, so you can trace what you bought.",
    },
    {
      icon: "label",
      title: "Transparent information",
      body: "Ingredients, nutrition per serving, allergens and directions — taken from the label and shown before you buy.",
    },
    {
      icon: "lock",
      title: "Secure checkout",
      body: "Payments are handled by an RBI-regulated gateway. We never see or store your card details.",
    },
    {
      icon: "truck",
      title: "Reliable delivery",
      body: "Tracked shipping across India, with free delivery on orders above ₹1,499.",
    },
  ],
} as const;

export type Store = typeof store;
