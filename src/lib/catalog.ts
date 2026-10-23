/**
 * SAMPLE CATALOG — fictional brands and products for the prototype.
 * Nutrition values, ingredients, directions and warnings are realistic
 * placeholders, not manufacturer data. Replace every product with the
 * manufacturer's printed label (or the commerce backend's product feed)
 * before launch. Ratings are intentionally absent: only verified review data
 * should ever populate `rating`.
 */

export type CategorySlug = "protein" | "pre-workout" | "creatine" | "vitamins-wellness" | "recovery";

export type GoalSlug =
  | "muscle-building"
  | "strength-performance"
  | "energy-endurance"
  | "recovery"
  | "daily-wellness"
  | "healthy-lifestyle";

export type Dietary = "vegetarian" | "vegan" | "gluten-free" | "no-added-sugar" | "caffeine-free";

export type PackKind = "tub" | "jar" | "pouch" | "bottle";

export type PackStyle = {
  kind: PackKind;
  /** Container colour */
  body: string;
  /** Label panel colour */
  label: string;
  /** Text colour on the label */
  ink: string;
  /** Stripe / highlight colour */
  accent: string;
};

export type Variant = {
  id: string;
  flavor?: string;
  size: string;
  servings: number;
  price: number;
  /** Only set when the item genuinely sold at this price before. */
  compareAt?: number;
  stock: number;
};

export type NutritionRow = { label: string; amount: string; indent?: boolean };

export type Product = {
  slug: string;
  name: string;
  brand: BrandName;
  category: CategorySlug;
  goals: GoalSlug[];
  form: string;
  tagline: string;
  description: string;
  highlights: string[];
  servingSize: string;
  nutrition: NutritionRow[];
  ingredients: string;
  allergens: string;
  directions: string;
  warnings: string;
  dietary: Dietary[];
  pack: PackStyle;
  variants: Variant[];
  popularity: number;
  addedOn: string;
  bestseller?: boolean;
  rating?: { value: number; count: number };
};

export const brands = ["Kynetic Labs", "Northfield Nutrition", "Purelement"] as const;
export type BrandName = (typeof brands)[number];

export const categories: {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
}[] = [
  {
    slug: "protein",
    name: "Protein",
    short: "Protein",
    description: "Whey isolate, whey blends, casein and plant proteins to help you reach your daily protein intake.",
  },
  {
    slug: "pre-workout",
    name: "Pre-Workout",
    short: "Pre-Workout",
    description: "Stimulant and stimulant-free pre-workout formulas. Check caffeine content per serving before use.",
  },
  {
    slug: "creatine",
    name: "Creatine",
    short: "Creatine",
    description: "Creatine monohydrate in powder and capsule form — one of the most researched sports supplements.",
  },
  {
    slug: "vitamins-wellness",
    name: "Vitamins & Wellness",
    short: "Vitamins",
    description: "Multivitamins, omega-3, vitamin D and minerals to complement a balanced diet.",
  },
  {
    slug: "recovery",
    name: "Hydration & Recovery",
    short: "Recovery",
    description: "Essential amino acids and electrolyte mixes for training days and long sessions.",
  },
];

export const goals: {
  slug: GoalSlug;
  name: string;
  blurb: string;
  image: string;
  alt: string;
}[] = [
  {
    slug: "muscle-building",
    name: "Muscle Building",
    blurb: "Protein options to support your daily intake alongside resistance training.",
    image: "1581009146145-b5ef050c2e1e",
    alt: "Athlete performing a barbell curl in a dimly lit gym",
  },
  {
    slug: "strength-performance",
    name: "Strength & Performance",
    blurb: "Creatine and training-day staples for heavy, focused sessions.",
    image: "1517836357463-d25dfeac3438",
    alt: "Lifter gripping a loaded barbell before a deadlift",
  },
  {
    slug: "energy-endurance",
    name: "Energy & Endurance",
    blurb: "Pre-workouts and electrolytes for long, demanding training days.",
    image: "1599058917212-d750089bc07e",
    alt: "Athlete working battle ropes under a concrete overpass",
  },
  {
    slug: "recovery",
    name: "Recovery",
    blurb: "Amino acids, casein and hydration for the hours after training.",
    image: "1544367567-0f2fcb009e0b",
    alt: "Silhouette holding a deep lunge stretch at sunset by the sea",
  },
  {
    slug: "daily-wellness",
    name: "Daily Wellness",
    blurb: "Everyday vitamins and minerals to complement a balanced diet.",
    image: "1490645935967-10de6ba17061",
    alt: "Bowl of eggs, avocado, greens and tomatoes on a wooden table",
  },
  {
    slug: "healthy-lifestyle",
    name: "Healthy Lifestyle",
    blurb: "Plant protein and clean basics for a balanced, active routine.",
    image: "1505576399279-565b52d4ac71",
    alt: "Hand sprinkling seeds over a layered salad jar",
  },
];

const wheyAllergens = "Contains milk. Manufactured in a facility that also processes soy, nuts and gluten.";

export const products: Product[] = [
  {
    slug: "whey-isolate-pro",
    name: "Whey Isolate Pro",
    brand: "Kynetic Labs",
    category: "protein",
    goals: ["muscle-building", "recovery"],
    form: "Powder",
    tagline: "Cold-filtered whey protein isolate",
    description:
      "A cold-filtered whey protein isolate with a short ingredient list. Mixes smoothly with water or milk and is low in fat and carbohydrate per serving.",
    highlights: ["27 g protein per serving", "Under 2 g carbohydrate per serving", "Mixes in a shaker"],
    servingSize: "1 scoop (32 g)",
    nutrition: [
      { label: "Energy", amount: "118 kcal" },
      { label: "Protein", amount: "27 g" },
      { label: "Carbohydrate", amount: "1.6 g" },
      { label: "of which sugars", amount: "1.1 g", indent: true },
      { label: "Fat", amount: "0.4 g" },
      { label: "Sodium", amount: "62 mg" },
    ],
    ingredients:
      "Whey protein isolate (milk), cocoa powder (chocolate variant), natural and artificial flavours, emulsifier (soy lecithin), sweetener (sucralose).",
    allergens: wheyAllergens,
    directions:
      "Mix 1 scoop with 200–250 ml of cold water or milk. Use as part of a balanced diet to help meet daily protein needs.",
    warnings:
      "Not for medicinal use. Not recommended for children, pregnant or lactating women. Do not exceed the recommended daily intake. Store in a cool, dry place.",
    dietary: ["vegetarian", "gluten-free"],
    pack: { kind: "tub", body: "#111418", label: "#B6F23A", ink: "#0B0D10", accent: "#F5F7F2" },
    variants: [
      { id: "wip-choc-1", flavor: "Double Chocolate", size: "1 kg", servings: 31, price: 3499, compareAt: 3899, stock: 24 },
      { id: "wip-choc-2", flavor: "Double Chocolate", size: "2 kg", servings: 62, price: 6299, stock: 12 },
      { id: "wip-van-1", flavor: "Vanilla Bean", size: "1 kg", servings: 31, price: 3499, stock: 18 },
      { id: "wip-van-2", flavor: "Vanilla Bean", size: "2 kg", servings: 62, price: 6299, stock: 0 },
      { id: "wip-unf-1", flavor: "Unflavoured", size: "1 kg", servings: 31, price: 3299, stock: 9 },
    ],
    popularity: 98,
    addedOn: "2026-03-14",
    bestseller: true,
  },
  {
    slug: "everyday-whey-blend",
    name: "Everyday Whey Blend",
    brand: "Kynetic Labs",
    category: "protein",
    goals: ["muscle-building", "healthy-lifestyle"],
    form: "Powder",
    tagline: "Whey concentrate and isolate blend",
    description:
      "A whey concentrate and isolate blend for everyday protein shakes. Flavoured for drinking straight with milk or blending into smoothies.",
    highlights: ["24 g protein per serving", "Includes a kesar-pista flavour", "Measured 33 g scoop"],
    servingSize: "1 scoop (33 g)",
    nutrition: [
      { label: "Energy", amount: "131 kcal" },
      { label: "Protein", amount: "24 g" },
      { label: "Carbohydrate", amount: "3.9 g" },
      { label: "of which sugars", amount: "2.4 g", indent: true },
      { label: "Fat", amount: "1.9 g" },
      { label: "Sodium", amount: "74 mg" },
    ],
    ingredients:
      "Whey protein concentrate (milk), whey protein isolate (milk), flavours, thickener (xanthan gum), emulsifier (soy lecithin), sweetener (sucralose), colour (as per variant).",
    allergens: wheyAllergens,
    directions: "Mix 1 scoop with 200–250 ml of water or milk. Consume 1–2 servings a day as part of a balanced diet.",
    warnings:
      "Not for medicinal use. Not recommended for children, pregnant or lactating women. Do not exceed the recommended daily intake.",
    dietary: ["vegetarian"],
    pack: { kind: "tub", body: "#F2F4EE", label: "#14181D", ink: "#F5F7F2", accent: "#B6F23A" },
    variants: [
      { id: "ewb-moc-1", flavor: "Café Mocha", size: "1 kg", servings: 30, price: 2599, stock: 30 },
      { id: "ewb-moc-2", flavor: "Café Mocha", size: "2 kg", servings: 60, price: 4799, compareAt: 5199, stock: 14 },
      { id: "ewb-kp-1", flavor: "Kesar Pista", size: "1 kg", servings: 30, price: 2599, stock: 21 },
      { id: "ewb-choc-1", flavor: "Rich Chocolate", size: "1 kg", servings: 30, price: 2599, stock: 4 },
      { id: "ewb-choc-2", flavor: "Rich Chocolate", size: "2 kg", servings: 60, price: 4799, stock: 16 },
    ],
    popularity: 94,
    addedOn: "2026-01-20",
    bestseller: true,
  },
  {
    slug: "plant-protein-complete",
    name: "Plant Protein Complete",
    brand: "Northfield Nutrition",
    category: "protein",
    goals: ["healthy-lifestyle", "muscle-building"],
    form: "Powder",
    tagline: "Pea and brown rice protein",
    description:
      "A dairy-free protein made from pea and brown rice protein. A good fit if you avoid milk-based products or follow a plant-based diet.",
    highlights: ["22 g protein per serving", "Dairy-free and vegan", "Pea + brown rice blend"],
    servingSize: "1 scoop (35 g)",
    nutrition: [
      { label: "Energy", amount: "132 kcal" },
      { label: "Protein", amount: "22 g" },
      { label: "Carbohydrate", amount: "4.8 g" },
      { label: "of which sugars", amount: "0.9 g", indent: true },
      { label: "Fat", amount: "2.6 g" },
      { label: "Dietary fibre", amount: "1.8 g" },
      { label: "Sodium", amount: "290 mg" },
    ],
    ingredients:
      "Pea protein isolate, brown rice protein, cocoa powder (chocolate variant), natural flavours, thickener (guar gum), sweetener (stevia).",
    allergens: "Free from milk. Manufactured in a facility that also processes milk, soy and tree nuts.",
    directions: "Mix 1 scoop with 250–300 ml of water or plant milk. Shake well and consume immediately.",
    warnings: "Not for medicinal use. Not recommended for children, pregnant or lactating women.",
    dietary: ["vegan", "vegetarian", "gluten-free", "no-added-sugar"],
    pack: { kind: "pouch", body: "#5E6B4E", label: "#E8EBDD", ink: "#1E2419", accent: "#B6F23A" },
    variants: [
      { id: "ppc-choc-1", flavor: "Chocolate", size: "1 kg", servings: 28, price: 2899, stock: 15 },
      { id: "ppc-van-1", flavor: "Madagascar Vanilla", size: "1 kg", servings: 28, price: 2899, stock: 11 },
    ],
    popularity: 76,
    addedOn: "2026-06-02",
  },
  {
    slug: "micellar-casein-night",
    name: "Micellar Casein",
    brand: "Kynetic Labs",
    category: "protein",
    goals: ["recovery", "muscle-building"],
    form: "Powder",
    tagline: "Slow-digesting milk protein",
    description:
      "Micellar casein is a slower-digesting milk protein. Many people use it as an evening shake or a thicker, pudding-style snack.",
    highlights: ["24 g protein per serving", "Thick, creamy texture", "Mix as a shake or pudding"],
    servingSize: "1 scoop (34 g)",
    nutrition: [
      { label: "Energy", amount: "125 kcal" },
      { label: "Protein", amount: "24 g" },
      { label: "Carbohydrate", amount: "3.1 g" },
      { label: "of which sugars", amount: "1.2 g", indent: true },
      { label: "Fat", amount: "1.1 g" },
      { label: "Calcium", amount: "480 mg" },
    ],
    ingredients: "Micellar casein (milk), cocoa powder, flavours, thickener (xanthan gum), sweetener (sucralose).",
    allergens: wheyAllergens,
    directions: "Mix 1 scoop with 250–300 ml of water or milk. For a pudding texture, mix with 100 ml and chill.",
    warnings: "Not for medicinal use. Not recommended for children, pregnant or lactating women.",
    dietary: ["vegetarian", "gluten-free"],
    pack: { kind: "tub", body: "#2A2F37", label: "#F5F7F2", ink: "#0B0D10", accent: "#8BCF32" },
    variants: [{ id: "mc-choc-1", flavor: "Chocolate Fudge", size: "1 kg", servings: 29, price: 3299, stock: 8 }],
    popularity: 61,
    addedOn: "2026-08-11",
  },
  {
    slug: "ignite-pre-workout",
    name: "Ignite Pre-Workout",
    brand: "Kynetic Labs",
    category: "pre-workout",
    goals: ["energy-endurance", "strength-performance"],
    form: "Powder",
    tagline: "Caffeine, citrulline and beta-alanine",
    description:
      "A stimulant pre-workout with clearly listed doses of caffeine, L-citrulline and beta-alanine. Beta-alanine can cause a harmless tingling sensation.",
    highlights: ["200 mg caffeine per serving", "6 g L-citrulline", "Fully disclosed formula"],
    servingSize: "1 scoop (15 g)",
    nutrition: [
      { label: "Energy", amount: "9 kcal" },
      { label: "Carbohydrate", amount: "1.8 g" },
      { label: "L-Citrulline", amount: "6 g" },
      { label: "Beta-alanine", amount: "3.2 g" },
      { label: "Betaine anhydrous", amount: "2.5 g" },
      { label: "Caffeine", amount: "200 mg" },
    ],
    ingredients:
      "L-citrulline, beta-alanine, betaine anhydrous, acidity regulator (citric acid), flavours, caffeine anhydrous, sweetener (sucralose), colour (as per variant).",
    allergens: "No major allergens listed. Manufactured in a facility that processes milk and soy.",
    directions:
      "Mix 1 scoop with 300 ml of water 20–30 minutes before training. Start with half a scoop to assess tolerance. Do not use within 6 hours of sleep.",
    warnings:
      "Contains caffeine (200 mg per serving). Not recommended for children, pregnant or lactating women, or people sensitive to caffeine. Do not combine with other caffeine sources. Consult a doctor if you have a medical condition.",
    dietary: ["vegan", "vegetarian", "gluten-free", "no-added-sugar"],
    pack: { kind: "jar", body: "#0E1013", label: "#14181D", ink: "#B6F23A", accent: "#B6F23A" },
    variants: [
      { id: "ign-apl-30", flavor: "Sour Green Apple", size: "450 g", servings: 30, price: 2199, compareAt: 2499, stock: 19 },
      { id: "ign-blu-30", flavor: "Blue Raspberry", size: "450 g", servings: 30, price: 2199, stock: 22 },
      { id: "ign-mng-30", flavor: "Alphonso Mango", size: "450 g", servings: 30, price: 2199, stock: 3 },
    ],
    popularity: 91,
    addedOn: "2026-02-08",
    bestseller: true,
  },
  {
    slug: "pump-stim-free",
    name: "Pump Stim-Free",
    brand: "Northfield Nutrition",
    category: "pre-workout",
    goals: ["energy-endurance", "strength-performance"],
    form: "Powder",
    tagline: "Caffeine-free pre-training formula",
    description:
      "A caffeine-free pre-training drink built around L-citrulline and glycerol. An option for evening sessions or if you avoid stimulants.",
    highlights: ["Zero caffeine", "8 g L-citrulline", "Suitable for late sessions"],
    servingSize: "1 scoop (16 g)",
    nutrition: [
      { label: "Energy", amount: "14 kcal" },
      { label: "Carbohydrate", amount: "2.2 g" },
      { label: "L-Citrulline", amount: "8 g" },
      { label: "Glycerol powder", amount: "3 g" },
      { label: "Sodium", amount: "180 mg" },
    ],
    ingredients:
      "L-citrulline, glycerol powder (glycerol, silicon dioxide), acidity regulator (malic acid), sodium chloride, flavours, sweetener (sucralose).",
    allergens: "No major allergens listed.",
    directions: "Mix 1 scoop with 300–400 ml of water 20–30 minutes before training.",
    warnings: "Not recommended for children, pregnant or lactating women. Consult a doctor if you have a medical condition.",
    dietary: ["vegan", "vegetarian", "gluten-free", "caffeine-free"],
    pack: { kind: "jar", body: "#E8EBDD", label: "#0B0D10", ink: "#F5F7F2", accent: "#5FC7E8" },
    variants: [{ id: "psf-wtm-25", flavor: "Watermelon", size: "400 g", servings: 25, price: 1999, stock: 13 }],
    popularity: 58,
    addedOn: "2026-09-01",
  },
  {
    slug: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    brand: "Kynetic Labs",
    category: "creatine",
    goals: ["strength-performance", "muscle-building"],
    form: "Powder",
    tagline: "Micronised, single ingredient",
    description:
      "Micronised creatine monohydrate with nothing else added. Unflavoured, so it can go into water, juice or your protein shake.",
    highlights: ["3 g creatine per serving", "Single ingredient", "Unflavoured, micronised"],
    servingSize: "1 level scoop (3 g)",
    nutrition: [
      { label: "Energy", amount: "0 kcal" },
      { label: "Creatine monohydrate", amount: "3 g" },
    ],
    ingredients: "Creatine monohydrate (micronised).",
    allergens: "No major allergens listed. Manufactured in a facility that processes milk and soy.",
    directions:
      "Mix 1 level scoop (3 g) into 200 ml of water or any beverage once a day. Drink adequate water through the day.",
    warnings:
      "Not for medicinal use. Not recommended for children, pregnant or lactating women. People with kidney conditions should consult a doctor before use.",
    dietary: ["vegan", "vegetarian", "gluten-free", "no-added-sugar", "caffeine-free"],
    pack: { kind: "jar", body: "#F5F7F2", label: "#B6F23A", ink: "#0B0D10", accent: "#0B0D10" },
    variants: [
      { id: "cm-250", flavor: "Unflavoured", size: "250 g", servings: 83, price: 1199, stock: 40 },
      { id: "cm-500", flavor: "Unflavoured", size: "500 g", servings: 166, price: 1999, compareAt: 2398, stock: 27 },
    ],
    popularity: 96,
    addedOn: "2025-12-02",
    bestseller: true,
  },
  {
    slug: "creatine-capsules",
    name: "Creatine Capsules",
    brand: "Purelement",
    category: "creatine",
    goals: ["strength-performance"],
    form: "Capsules",
    tagline: "Creatine monohydrate in capsules",
    description:
      "Creatine monohydrate in vegetarian capsules — for anyone who prefers not to mix powders, or wants something easy to carry.",
    highlights: ["3 g creatine per 4 capsules", "Vegetarian capsule shell", "No scoop, no mixing"],
    servingSize: "4 capsules",
    nutrition: [{ label: "Creatine monohydrate", amount: "3 g" }],
    ingredients: "Creatine monohydrate, capsule shell (hydroxypropyl methylcellulose), anti-caking agent (magnesium stearate).",
    allergens: "No major allergens listed.",
    directions: "Take 4 capsules a day with water, with or without food.",
    warnings: "Not for medicinal use. Not recommended for children, pregnant or lactating women. Keep out of reach of children.",
    dietary: ["vegan", "vegetarian", "gluten-free", "caffeine-free"],
    pack: { kind: "bottle", body: "#14181D", label: "#F2F4EE", ink: "#0B0D10", accent: "#B6F23A" },
    variants: [{ id: "cc-120", size: "120 capsules", servings: 30, price: 1149, stock: 17 }],
    popularity: 54,
    addedOn: "2026-07-19",
  },
  {
    slug: "daily-multivitamin",
    name: "Daily Multivitamin",
    brand: "Purelement",
    category: "vitamins-wellness",
    goals: ["daily-wellness", "healthy-lifestyle"],
    form: "Tablets",
    tagline: "One-a-day vitamins and minerals",
    description:
      "A once-daily multivitamin and mineral tablet designed to complement — not replace — a varied diet.",
    highlights: ["One tablet a day", "24 vitamins and minerals", "Take with breakfast"],
    servingSize: "1 tablet",
    nutrition: [
      { label: "Vitamin A", amount: "600 µg" },
      { label: "Vitamin C", amount: "80 mg" },
      { label: "Vitamin D3", amount: "15 µg" },
      { label: "Vitamin B12", amount: "2.2 µg" },
      { label: "Zinc", amount: "10 mg" },
      { label: "Iron", amount: "8 mg" },
    ],
    ingredients:
      "Bulking agent (microcrystalline cellulose), minerals and vitamins (as listed in the full nutrition panel), coating agents, anti-caking agent (magnesium stearate).",
    allergens: "No major allergens listed.",
    directions: "Take 1 tablet daily with a meal and water.",
    warnings:
      "Not for medicinal use. Do not exceed the recommended daily intake. Keep out of reach of children. Consult a doctor if you are pregnant, lactating or taking medication.",
    dietary: ["vegetarian", "gluten-free"],
    pack: { kind: "bottle", body: "#F5F7F2", label: "#F2F4EE", ink: "#0B0D10", accent: "#F2A93B" },
    variants: [
      { id: "dm-60", size: "60 tablets", servings: 60, price: 899, stock: 33 },
      { id: "dm-120", size: "120 tablets", servings: 120, price: 1599, stock: 12 },
    ],
    popularity: 83,
    addedOn: "2026-04-05",
    bestseller: true,
  },
  {
    slug: "omega-3-fish-oil",
    name: "Omega-3 Fish Oil",
    brand: "Purelement",
    category: "vitamins-wellness",
    goals: ["daily-wellness", "recovery"],
    form: "Softgels",
    tagline: "EPA and DHA softgels",
    description: "Fish oil softgels providing EPA and DHA omega-3 fatty acids, with a lemon-flavoured coating.",
    highlights: ["600 mg EPA + DHA per serving", "Lemon-flavoured softgels", "Two softgels a day"],
    servingSize: "2 softgels",
    nutrition: [
      { label: "Fish oil", amount: "2,000 mg" },
      { label: "EPA", amount: "360 mg", indent: true },
      { label: "DHA", amount: "240 mg", indent: true },
    ],
    ingredients: "Fish oil (from anchovy, sardine), softgel shell (gelatin, glycerin, water), natural lemon flavour, antioxidant (mixed tocopherols).",
    allergens: "Contains fish.",
    directions: "Take 2 softgels daily with a meal.",
    warnings:
      "Not for medicinal use. Consult a doctor if you take blood-thinning medication, are pregnant or lactating.",
    dietary: ["gluten-free"],
    pack: { kind: "bottle", body: "#3B2A12", label: "#F2F4EE", ink: "#0B0D10", accent: "#F2A93B" },
    variants: [{ id: "o3-60", size: "60 softgels", servings: 30, price: 1099, stock: 26 }],
    popularity: 72,
    addedOn: "2026-05-22",
  },
  {
    slug: "vitamin-d3-k2",
    name: "Vitamin D3 + K2",
    brand: "Purelement",
    category: "vitamins-wellness",
    goals: ["daily-wellness"],
    form: "Capsules",
    tagline: "D3 with K2 (MK-7)",
    description: "Vitamin D3 paired with vitamin K2 as MK-7, in a small vegetarian capsule.",
    highlights: ["15 µg (600 IU) vitamin D3", "55 µg vitamin K2 (MK-7)", "One capsule a day"],
    servingSize: "1 capsule",
    nutrition: [
      { label: "Vitamin D3 (cholecalciferol)", amount: "15 µg" },
      { label: "Vitamin K2 (menaquinone-7)", amount: "55 µg" },
    ],
    ingredients: "Bulking agent (microcrystalline cellulose), capsule shell (HPMC), cholecalciferol, menaquinone-7.",
    allergens: "No major allergens listed.",
    directions: "Take 1 capsule daily with a meal.",
    warnings:
      "Not for medicinal use. Consult a doctor before use if you take anticoagulant medication. Keep out of reach of children.",
    dietary: ["vegetarian", "gluten-free"],
    pack: { kind: "bottle", body: "#F5F7F2", label: "#FFE07A", ink: "#0B0D10", accent: "#0B0D10" },
    variants: [{ id: "dk-60", size: "60 capsules", servings: 60, price: 749, stock: 0 }],
    popularity: 66,
    addedOn: "2026-09-12",
  },
  {
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    brand: "Purelement",
    category: "vitamins-wellness",
    goals: ["daily-wellness", "recovery"],
    form: "Capsules",
    tagline: "Chelated magnesium",
    description: "Magnesium bisglycinate in vegetarian capsules — a chelated form often chosen for being gentle on the stomach.",
    highlights: ["200 mg elemental magnesium", "Bisglycinate form", "Vegetarian capsules"],
    servingSize: "2 capsules",
    nutrition: [{ label: "Magnesium (as bisglycinate)", amount: "200 mg" }],
    ingredients: "Magnesium bisglycinate, capsule shell (HPMC), anti-caking agent (magnesium stearate).",
    allergens: "No major allergens listed.",
    directions: "Take 2 capsules daily with water, preferably in the evening.",
    warnings: "Not for medicinal use. Consult a doctor if you have a kidney condition or take medication.",
    dietary: ["vegan", "vegetarian", "gluten-free"],
    pack: { kind: "bottle", body: "#1B2026", label: "#C9D6F0", ink: "#0B0D10", accent: "#7FA2E8" },
    variants: [{ id: "mg-120", size: "120 capsules", servings: 60, price: 899, stock: 20 }],
    popularity: 69,
    addedOn: "2026-10-01",
  },
  {
    slug: "eaa-recovery",
    name: "EAA Recovery",
    brand: "Kynetic Labs",
    category: "recovery",
    goals: ["recovery", "energy-endurance"],
    form: "Powder",
    tagline: "All nine essential amino acids",
    description:
      "An essential amino acid drink with added electrolytes. Easy to sip during or after training.",
    highlights: ["8 g essential amino acids", "Added electrolytes", "Light, fruity flavours"],
    servingSize: "1 scoop (12 g)",
    nutrition: [
      { label: "Energy", amount: "34 kcal" },
      { label: "Essential amino acids", amount: "8 g" },
      { label: "of which leucine", amount: "2.4 g", indent: true },
      { label: "Sodium", amount: "120 mg" },
      { label: "Potassium", amount: "90 mg" },
    ],
    ingredients:
      "Essential amino acid blend (L-leucine, L-lysine, L-valine, L-isoleucine, L-threonine, L-phenylalanine, L-methionine, L-histidine, L-tryptophan), acidity regulator (citric acid), electrolyte blend, flavours, sweetener (sucralose).",
    allergens: "Contains soy (lecithin).",
    directions: "Mix 1 scoop with 400 ml of water. Sip during or after training.",
    warnings: "Not for medicinal use. Not recommended for children, pregnant or lactating women.",
    dietary: ["vegan", "vegetarian", "gluten-free", "caffeine-free"],
    pack: { kind: "tub", body: "#F2A93B", label: "#0B0D10", ink: "#F5F7F2", accent: "#F5F7F2" },
    variants: [
      { id: "eaa-mng-30", flavor: "Mango Lime", size: "360 g", servings: 30, price: 1899, stock: 18 },
      { id: "eaa-lch-30", flavor: "Litchi", size: "360 g", servings: 30, price: 1899, stock: 7 },
    ],
    popularity: 79,
    addedOn: "2026-06-18",
    bestseller: true,
  },
  {
    slug: "electrolyte-hydration",
    name: "Electrolyte Hydration",
    brand: "Northfield Nutrition",
    category: "recovery",
    goals: ["energy-endurance", "healthy-lifestyle"],
    form: "Powder",
    tagline: "Sodium, potassium and magnesium",
    description:
      "A low-sugar electrolyte mix for long sessions, hot days and outdoor training. Comes in a resealable pouch.",
    highlights: ["500 mg sodium per serving", "Low sugar", "Resealable pouch"],
    servingSize: "1 scoop (7 g)",
    nutrition: [
      { label: "Energy", amount: "12 kcal" },
      { label: "Carbohydrate", amount: "2.9 g" },
      { label: "Sodium", amount: "500 mg" },
      { label: "Potassium", amount: "200 mg" },
      { label: "Magnesium", amount: "60 mg" },
    ],
    ingredients:
      "Sodium citrate, potassium chloride, dextrose, acidity regulator (citric acid), magnesium citrate, flavours, sweetener (stevia).",
    allergens: "No major allergens listed.",
    directions: "Mix 1 scoop with 500 ml of water. Use before, during or after exercise.",
    warnings: "Not for medicinal use. People on a sodium-restricted diet should consult a doctor.",
    dietary: ["vegan", "vegetarian", "gluten-free", "caffeine-free"],
    pack: { kind: "pouch", body: "#5FC7E8", label: "#0B0D10", ink: "#F5F7F2", accent: "#F5F7F2" },
    variants: [
      { id: "eh-lime-40", flavor: "Lemon Lime", size: "280 g", servings: 40, price: 899, stock: 35 },
      { id: "eh-orng-40", flavor: "Orange", size: "280 g", servings: 40, price: 899, stock: 14 },
    ],
    popularity: 74,
    addedOn: "2026-07-30",
  },
];

/* ---------- lookups ---------- */

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getGoal = (slug: string) => goals.find((g) => g.slug === slug);

export const findVariant = (variantId: string) => {
  for (const product of products) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return undefined;
};

export const bestsellers = () =>
  products.filter((p) => p.bestseller).sort((a, b) => b.popularity - a.popularity);

/** Lowest-priced in-stock variant, falling back to the first variant. */
export const defaultVariant = (p: Product) => {
  const inStock = p.variants.filter((v) => v.stock > 0);
  const pool = inStock.length ? inStock : p.variants;
  return pool.reduce((min, v) => (v.price < min.price ? v : min), pool[0]);
};

/** First listed variant that is in stock — the merchandised default on cards and product pages. */
export const firstAvailable = (p: Product) => p.variants.find((v) => v.stock > 0) ?? p.variants[0];

export const priceRange = (p: Product) => {
  const prices = p.variants.map((v) => v.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export const inStock = (p: Product) => p.variants.some((v) => v.stock > 0);

export const relatedProducts = (p: Product, limit = 4) =>
  products
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({
      o,
      score: (o.category === p.category ? 2 : 0) + o.goals.filter((g) => p.goals.includes(g)).length,
    }))
    .sort((a, b) => b.score - a.score || b.o.popularity - a.o.popularity)
    .slice(0, limit)
    .map(({ o }) => o);

export const dietaryLabels: Record<Dietary, string> = {
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  "gluten-free": "Gluten-free",
  "no-added-sugar": "No added sugar",
  "caffeine-free": "Caffeine-free",
};
