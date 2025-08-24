"use client";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="chip" aria-label={`Cart, ${count} items`}>
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
