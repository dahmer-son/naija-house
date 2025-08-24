"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";

export default function AddToCartButton({
  product,
  qty = 1,
  className = "btn btn-primary mt-3",
}: {
  product: any;
  qty?: number;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const pricePence =
    typeof product?.pricePence === "number"
      ? product.pricePence
      : Math.round((product?.priceGBP || 0) * 100);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // If button is inside a Link/Card, stop the link from navigating
    e.preventDefault();
    e.stopPropagation();

    add(
      {
        slug: product.slug,
        name: product.name,
        image: product.images?.[0],
        pricePence,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-live="polite"
      aria-label={`Add ${product?.name} to cart`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
