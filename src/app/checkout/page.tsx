"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { formatGBP } from "@/utils/currency";

type Address = {
  fullName: string;
  email: string;
  phone?: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string; // "GB"
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalPence, clear } = useCart();

  const [addr, setAddr] = useState<Address>({
    fullName: "",
    email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "GB",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const disabled = !items.length || loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!addr.fullName || !addr.email || !addr.line1 || !addr.city || !addr.postcode) {
      setErr("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: addr,
          items: items.map(i => ({
            slug: i.slug,
            name: i.name,
            pricePence: i.pricePence,
            qty: i.qty,
          })),
          subtotalPence,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Payment failed");

      // Success: clear cart & go to success page with simple orderId
      clear();
      router.push(`/checkout/success?orderId=${encodeURIComponent(data.orderId)}`);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>

      {!items.length ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Address form */}
          <form onSubmit={onSubmit} className="md:col-span-2 card p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Full name *"
                value={addr.fullName}
                onChange={(e) => setAddr({ ...addr, fullName: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email *"
                value={addr.email}
                onChange={(e) => setAddr({ ...addr, email: e.target.value })}
                required
              />
              <input
                placeholder="Phone"
                value={addr.phone}
                onChange={(e) => setAddr({ ...addr, phone: e.target.value })}
              />
              <input
                placeholder="Address line 1 *"
                value={addr.line1}
                onChange={(e) => setAddr({ ...addr, line1: e.target.value })}
                required
              />
              <input
                placeholder="Address line 2"
                value={addr.line2}
                onChange={(e) => setAddr({ ...addr, line2: e.target.value })}
              />
              <input
                placeholder="City *"
                value={addr.city}
                onChange={(e) => setAddr({ ...addr, city: e.target.value })}
                required
              />
              <input
                placeholder="Postcode *"
                value={addr.postcode}
                onChange={(e) => setAddr({ ...addr, postcode: e.target.value })}
                required
              />
              <select
                value={addr.country}
                onChange={(e) => setAddr({ ...addr, country: e.target.value })}
              >
                <option value="GB">United Kingdom</option>
              </select>
            </div>

            {err && <p className="text-red-400">{err}</p>}

            <button className="btn btn-primary" disabled={disabled}>
              {loading ? "Processing..." : "Pay (stub)"}
            </button>
            <p className="text-xs text-muted">
              Note: This is a demo checkout. No real payment is taken.
            </p>
          </form>

          {/* Summary */}
          <aside className="card p-5 h-fit">
            <h2 className="font-semibold text-white mb-3">Order Summary</h2>
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.slug} className="flex justify-between text-gray-300">
                  <span>
                    {i.name} <span className="text-muted">× {i.qty}</span>
                  </span>
                  <span className="text-white font-medium">
                    {formatGBP(i.pricePence * i.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="divider my-4" />
            <div className="flex justify-between text-white font-semibold">
              <span>Subtotal</span>
              <span>{formatGBP(subtotalPence)}</span>
            </div>
            <p className="text-xs text-muted mt-2">
              Shipping & taxes calculated after address (stubbed).
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
