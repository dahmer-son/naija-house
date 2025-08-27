import { notFound } from "next/navigation";
import type { Product } from "@/types";
import { formatGBP, toPenceFromProduct } from "@/utils/currency";
import AddToCartButton from "@/components/AddToCartButton";

async function fetchOne(slug: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/products/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json() as Promise<Product>;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await fetchOne(params.slug);
  if (!product) return notFound();
  const pricePence = toPenceFromProduct(product);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-brandGreen">{product.name}</h1>
      <div className="mt-6 w-full md:w-96">
        <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="w-full h-80 object-cover rounded-lg shadow-md" />
      </div>
      <p className="mt-6 text-2xl font-bold">{formatGBP(pricePence)}</p>
      <p className="mt-4 text-gray-300 leading-relaxed">{product.description || "No description available."}</p>
      <AddToCartButton product={product} className="btn btn-primary mt-6" />
    </div>
  );
}
