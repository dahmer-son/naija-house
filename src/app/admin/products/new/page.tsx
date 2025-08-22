"use client";
import { useEffect, useState } from "react";

type Cat = { _id: string; name: string };

export default function AdminNewProductPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [form, setForm] = useState({
    name: "", slug: "", description: "",
    pricePence: 0, category: "", inventory: 0,
    isNewArrival: false, isBestSeller: false,
    image0: ""
  });

  useEffect(() => {
    fetch("/api/categories").then(r=>r.json()).then(setCats).catch(()=>setCats([]));
  }, []);

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      description: form.description,
      images: form.image0 ? [form.image0] : [],
      pricePence: Number(form.pricePence),
      category: form.category || undefined,
      inventory: Number(form.inventory),
      isNewArrival: form.isNewArrival,
      isBestSeller: form.isBestSeller,
    };
    const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Save failed");
    alert("Product saved");
    window.location.href = "/admin/products";
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Create product</h1>
      <form onSubmit={save} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({ ...f, name:e.target.value, slug: slugify(e.target.value) }))} required />
          <input placeholder="Slug" value={form.slug} onChange={e=>setForm(f=>({ ...f, slug:e.target.value }))} />
          <input type="number" placeholder="Price (pence)" value={form.pricePence} onChange={e=>setForm(f=>({ ...f, pricePence:Number(e.target.value)||0 }))} required />
          <select value={form.category} onChange={e=>setForm(f=>({ ...f, category:e.target.value }))}>
            <option value="">Select category</option>
            {cats.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input type="number" placeholder="Inventory" value={form.inventory} onChange={e=>setForm(f=>({ ...f, inventory:Number(e.target.value)||0 }))} />
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isNewArrival} onChange={e=>setForm(f=>({ ...f, isNewArrival:e.target.checked }))}/> New Arrival</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isBestSeller} onChange={e=>setForm(f=>({ ...f, isBestSeller:e.target.checked }))}/> Best Seller</label>
        </div>
        <textarea rows={4} placeholder="Description" value={form.description} onChange={e=>setForm(f=>({ ...f, description:e.target.value }))} />
        <input placeholder="Image URL (or /products/filename.jpg)" value={form.image0} onChange={e=>setForm(f=>({ ...f, image0:e.target.value }))} />
        <button className="btn btn-primary">Save</button>
      </form>
    </main>
  );
}
