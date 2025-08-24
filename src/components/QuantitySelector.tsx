"use client";
import { useState } from "react";

export default function QuantitySelector({
  initial = 1,
  onChange,
}: {
  initial?: number;
  onChange?: (q: number) => void;
}) {
  const [q, setQ] = useState(initial);
  return (
    <div className="inline-flex items-center gap-2">
      <button className="btn-ghost px-3 py-2" onClick={() => { const n = Math.max(1, q - 1); setQ(n); onChange?.(n); }}>−</button>
      <span className="w-8 text-center">{q}</span>
      <button className="btn-ghost px-3 py-2" onClick={() => { const n = q + 1; setQ(n); onChange?.(n); }}>＋</button>
    </div>
  );
}
