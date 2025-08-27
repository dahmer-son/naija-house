"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import { toPenceFromProduct } from "@/utils/currency";

type Props = {
  product: Pick<Product, "slug" | "name" | "images" | "pricePence" | "priceGBP">;
  qty?: number;
  className?: string;
};

export default function AddToCartButton({ product, qty = 1, className = "btn btn-primary mt-3" }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const pricePence = toPenceFromProduct(product);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    add({ slug: product.slug, name: product.name, image: product.images?.[0], pricePence }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button type="button" onClick={handleClick} className={className} aria-live="polite">
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
