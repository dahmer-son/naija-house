"use client";
import { useCart } from "@/hooks/useCart";

export default function CartCount() {
  const { count } = useCart();
  return (
    <span className="chip">
      Cart{count ? ` (${count})` : ""}
    </span>
  );
}
