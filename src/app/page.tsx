import Link from "next/link";
import type { Product } from "@/types";
import { formatGBP, toPenceFromProduct } from "@/utils/currency";

async function fetchAll(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json() as Promise<Product[]>;
}

export default async function Home() {
  const products = await fetchAll();
  const newArrivals = (products.filter(p => p.isNewArrival) || products).slice(0, 8);
  const bestSellers = (products.filter(p => p.isBestSeller) || products).slice(0, 8);

  return (
    <main className="p-0">
      {/* ...hero... */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
          <Link href="/products" className="hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((p) => {
            const img = p.images?.[0] || "/placeholder.png";
            return (
              <Link key={p.slug} href={`/products/${p.slug}`} className="card overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-brandGreen">{p.name}</h3>
                  <p className="mt-2 font-bold text-white">{formatGBP(toPenceFromProduct(p))}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* Best Sellers (same pattern) */}
    </main>
  );
}
