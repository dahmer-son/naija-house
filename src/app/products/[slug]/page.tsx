import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/products/${params.slug}`, { cache: "no-store" });
  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Product Name */}
      <h1 className="text-3xl md:text-4xl font-bold text-brandGreen">{product.name}</h1>

      {/* Image */}
      <div className="mt-6 w-full md:w-96">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Price */}
      <p className="mt-6 text-2xl font-bold">
        ₤{Number(product.priceGBP).toFixed(2)}
      </p>

      {/* Description */}
      <p className="mt-4 text-gray-300 leading-relaxed">
        {product.description || "No description available for this product."}
      </p>

      {/* Add to cart (future placeholder) */}
      <button className="mt-6 bg-brandGreen text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
