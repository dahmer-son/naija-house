"use client";

import { useCart } from "@/hooks/useCart";
import { formatGBP } from "@/utils/currency";
import Link from "next/link";

export default function CartPage() {
  const { items, update, remove, clear, subtotalPence } = useCart();

  if (!items.length) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-4">Your Cart</h1>
        <p className="text-gray-400">Your cart is empty.</p>
        <Link href="/products" className="btn btn-primary mt-6">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.slug} className="card p-4 flex items-center gap-4">
              <img src={i.image || "/placeholder.png"} alt={i.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <p className="font-semibold text-white">{i.name}</p>
                <p className="text-muted">{formatGBP(i.pricePence)} each</p>
                <div className="mt-2 flex items-center gap-3">
                  <label className="text-sm text-muted">Qty</label>
                  <input
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => update(i.slug, Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 bg-gray-900 border border-gray-800 rounded px-2 py-1"
                  />
                  <button className="btn-ghost" onClick={() => remove(i.slug)}>Remove</button>
                </div>
              </div>
              <div className="font-bold">{formatGBP(i.pricePence * i.qty)}</div>
            </div>
          ))}
          <button className="btn-ghost" onClick={clear}>Clear Cart</button>
        </div>

        {/* Summary */}
        <aside className="card p-4 h-fit">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Subtotal</span>
            <span className="font-bold">{formatGBP(subtotalPence)}</span>
          </div>
          <p className="text-muted text-sm">Shipping & taxes calculated at checkout.</p>
          <Link href="/checkout" className="btn btn-primary w-full mt-4 text-center">Checkout</Link>
        </aside>
      </div>
    </main>
  );
}
