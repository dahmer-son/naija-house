"use client";
import { useEffect, useState } from "react";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export default function AdminCategoriesPage() {
  const [cats, setCats] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    setCats(res.ok ? await res.json() : []);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name) })
    });
    if (!res.ok) { alert("Failed"); return; }
    setName(""); load();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <form onSubmit={add} className="flex gap-2 mb-6">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <button className="btn btn-primary">Add</button>
      </form>

      <div className="card p-4">
        {!cats.length ? <p className="text-gray-400">No categories yet.</p> : (
          <ul className="space-y-2">
            {cats.map(c => <li key={c._id} className="flex justify-between"><span>{c.name}</span><span className="text-muted">{c.slug}</span></li>)}
          </ul>
        )}
      </div>
    </main>
  );
}
