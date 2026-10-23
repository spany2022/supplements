/**
 * PLACEHOLDER REVIEWS — written to show layout only. They are not real
 * customers and must be replaced with verified reviews from the store's review
 * platform (with consent) before launch. Every card renders a visible
 * "Sample" label while `store.isPrototype` is true.
 */

export type CommunityReview = {
  id: string;
  name: string;
  city: string;
  product: string;
  productSlug: string;
  quote: string;
  verified: boolean;
};

export const communityReviews: CommunityReview[] = [
  {
    id: "r1",
    name: "Sample customer",
    city: "Pune",
    product: "Whey Isolate Pro",
    productSlug: "whey-isolate-pro",
    quote: "Mixes clean in a shaker with no clumps, and the label is easy to read. Chocolate isn’t too sweet.",
    verified: false,
  },
  {
    id: "r2",
    name: "Sample customer",
    city: "Bengaluru",
    product: "Creatine Monohydrate",
    productSlug: "creatine-monohydrate",
    quote: "Single ingredient, unflavoured, dissolves into my morning water. Exactly what I wanted.",
    verified: false,
  },
  {
    id: "r3",
    name: "Sample customer",
    city: "Delhi",
    product: "Ignite Pre-Workout",
    productSlug: "ignite-pre-workout",
    quote: "Appreciate that caffeine per scoop is printed clearly. Half a scoop is plenty for me.",
    verified: false,
  },
  {
    id: "r4",
    name: "Sample customer",
    city: "Mumbai",
    product: "Plant Protein Complete",
    productSlug: "plant-protein-complete",
    quote: "Finally a plant protein that isn’t gritty. Good with oat milk after evening runs.",
    verified: false,
  },
  {
    id: "r5",
    name: "Sample customer",
    city: "Hyderabad",
    product: "Electrolyte Hydration",
    productSlug: "electrolyte-hydration",
    quote: "Lemon lime is light and not syrupy. The pouch reseals properly, which matters in humid weather.",
    verified: false,
  },
];

export const communityPhotos = [
  { id: "1541534741688-6078c6bfb5c5", alt: "Athlete pressing a barbell overhead in a brick-walled gym" },
  { id: "1574680096145-d05b474e2155", alt: "Lifter setting up a back squat in black and white" },
  { id: "1526506118085-60ce8714f8c5", alt: "Athlete doing a pull-up in a dark gym, black and white" },
  { id: "1476480862126-209bfaa8edc8", alt: "Runner climbing outdoor stone steps" },
];
