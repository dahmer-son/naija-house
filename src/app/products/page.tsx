// src/app/products/page.tsx
// Server component: render the full products grid without calling fetch.
// For now we read from the local data module; you can swap to Mongo later.

import Link from "next/link";
import { products as catalog } from "@/data/products";

function formatGBP(p: any) {
  if (typeof p.pricePence === "number") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
      p.pricePence / 100
    );
  }
  if (typeof p.priceGBP === "number") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
      p.priceGBP
    );
  }
  return "£0.00";
}

export default async function ProductsPage() {
  const products = catalog; // later: replace with a Mongo query

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">All Products</h1>

      {!products?.length ? (
        <p className="text-gray-400">No products available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => {
            const img = p.images?.[0] || "/placeholder.png";
            return (
              <Link key={p.slug} href={`/products/${p.slug}`} className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-brandGreen">{p.name}</h3>
                  <p className="mt-2 font-bold text-white">{formatGBP(p)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
