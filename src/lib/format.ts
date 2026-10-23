const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (amount: number) => inr.format(Math.round(amount));

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const discountPercent = (price: number, compareAt?: number) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");
