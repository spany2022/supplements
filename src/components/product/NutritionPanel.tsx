import type { Product } from "@/lib/catalog";
import { cx } from "@/lib/format";

/** Label-style nutrition table. Data comes straight from the product record. */
export function NutritionPanel({ product, servings, className }: { product: Product; servings?: number; className?: string }) {
  return (
    <div className={cx("rounded-2xl bg-paper p-5 text-ink sm:p-6", className)}>
      <p className="border-b-[6px] border-ink pb-2 font-[family-name:var(--font-display)] text-2xl font-bold leading-none tracking-tight">
        Nutrition information
      </p>
      <dl className="mt-2 divide-y divide-ink/20 border-b border-ink/30 text-sm">
        <div className="flex justify-between py-1.5">
          <dt>Serving size</dt>
          <dd className="font-semibold">{product.servingSize}</dd>
        </div>
        {servings !== undefined && (
          <div className="flex justify-between py-1.5">
            <dt>Servings per container</dt>
            <dd className="font-semibold">{servings}</dd>
          </div>
        )}
      </dl>
      <table className="mt-3 w-full text-sm">
        <caption className="sr-only">Nutrition per serving for {product.name}</caption>
        <thead>
          <tr className="border-b-2 border-ink">
            <th scope="col" className="py-1.5 text-left font-semibold">
              Per serving
            </th>
            <th scope="col" className="py-1.5 text-right font-semibold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {product.nutrition.map((r) => (
            <tr key={r.label} className="border-b border-ink/15">
              <th scope="row" className={cx("py-1.5 text-left font-normal", r.indent && "pl-5 text-graphite")}>
                {r.label}
              </th>
              <td className="py-1.5 text-right font-semibold tabular-nums">{r.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
