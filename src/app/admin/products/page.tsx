import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function AdminProductsPage() {
  const products: any[] = await getProducts();
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin • Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary">New Product</Link>
      </div>

      {!products.length ? (
        <p className="text-gray-400">No products yet.</p>
      ) : (
        <div className="card p-4 overflow-x-auto">
          <table>
            <thead><tr><th>Name</th><th>Price (GBP)</th><th>Slug</th><th>Flags</th></tr></thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{(p.pricePence / 100).toFixed(2)}</td>
                  <td>{p.slug}</td>
                  <td>{p.isBestSeller ? "Best " : ""}{p.isNewArrival ? "New" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
