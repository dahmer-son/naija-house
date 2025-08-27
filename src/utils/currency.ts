import type { Product } from "@/types";

export function formatGBP(pence: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
    .format((pence || 0) / 100);
}

export function toPenceFromProduct(p: Product): number {
  if (typeof p.pricePence === "number") return p.pricePence;
  if (typeof p.priceGBP === "number") return Math.round(p.priceGBP * 100);
  return 0;
}
