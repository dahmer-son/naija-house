// src/app/page.tsx
// Server component: query MongoDB directly (no fetch), render hero + two grids.

import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// Format price from either pricePence (int) or priceGBP (number) for older data
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

async function getProducts() {
  try {
    await connectDB();
    // Pull recent products; flags drive sections; fallback to recent if flags missing
    const products = await Product.find().sort({ createdAt: -1 }).limit(40).lean();
    return products.map((p: any) => ({
      _id: String(p._id),
      slug: p.slug,
      name: p.name,
      images: p.images || [],
      pricePence: p.pricePence,
      priceGBP: p.priceGBP,
      isNewArrival: !!p.isNewArrival,
      isBestSeller: !!p.isBestSeller,
    }));
  } catch {
    // If DB isn’t wired yet, just show empty sections gracefully
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  // Prefer flags; fallback to slices if flags aren’t set
  const newArrivals =
    products.filter((p) => p.isNewArrival).slice(0, 8).length > 0
      ? products.filter((p) => p.isNewArrival).slice(0, 8)
      : products.slice(0, 8);

  const bestSellers =
    products.filter((p) => p.isBestSeller).slice(0, 8).length > 0
      ? products.filter((p) => p.isBestSeller).slice(0, 8)
      : products.slice(2, 10);

  return (
    <main className="p-0">
      {/* Hero */}
      <section className="relative w-full">
        <div className="relative overflow-hidden">
          <div className="h-[260px] md:h-[380px] bg-gradient-to-b from-gray-900 to-gray-950 flex items-center">
            <div className="max-w-7xl mx-auto px-6">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Authentic Afro-Caribbean Groceries
              </h1>
              <p className="mt-3 md:mt-4 text-gray-300 max-w-xl">
                Fresh, trusted, and delivered across the UK. Stock up your kitchen with the
                flavors you love.
              </p>
              <Link href="/products" className="btn btn-primary mt-6">
                Shop All Products
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_400px_at_0%_0%,rgba(47,143,78,0.12),transparent)]" />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
          <Link href="/products" className="hover:underline">
            View all
          </Link>
        </div>
        {newArrivals.length === 0 ? (
          <p className="text-gray-400">No products yet. Add some in /admin.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p) => {
              const img = p.images?.[0] || "/placeholder.png";
              return (
                <Link key={p.slug ?? p._id} href={`/products/${p.slug}`} className="card overflow-hidden">
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
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Best Sellers</h2>
          <Link href="/products" className="hover:underline">
            View all
          </Link>
        </div>
        {bestSellers.length === 0 ? (
          <p className="text-gray-400">No products yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p) => {
              const img = p.images?.[0] || "/placeholder.png";
              return (
                <Link key={p.slug ?? p._id} href={`/products/${p.slug}`} className="card overflow-hidden">
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
      </section>
    </main>
  );
}
