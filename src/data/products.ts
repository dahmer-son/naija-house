// Simple in-memory catalog for fast demo.
// Later you can swap this out for MongoDB without changing the UI.

export type Product = {
  slug: string;
  name: string;
  description?: string;
  images: string[];         // paths under /public or full URLs
  priceGBP: number;         // using GBP for now; can move to pricePence later
  category?: string;        // optional text for now
  inventory?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  {
    slug: "golden-rice-5kg",
    name: "Golden Rice 5kg",
    description: "Premium long grain rice, perfect for jollof & fried rice.",
    images: ["/products/golden-rice.jpg"],
    priceGBP: 12.99,
    category: "Rice",
    inventory: 40,
    isNewArrival: true,
    isBestSeller: true,
  },
  {
    slug: "fanta",
    name: "Fanta 50cl",
    description: "The Fanta you know and love.",
    images: ["/products/fanta.jpg"],
    priceGBP: 5.5,
    category: "Drinks",
    inventory: 60,
    isBestSeller: true,
  },
  {
    slug: "suya-spice-100g",
    name: "Suya Spice 100g",
    description: "Authentic Northern-style suya pepper blend.",
    images: ["/products/suya-spice.jpg"],
    priceGBP: 3.99,
    category: "Spices",
    inventory: 150,
    isNewArrival: true,
  },
  // 👉 Add the rest of your items here.
  {
  name: "Afrimalt",
  slug: "afrimalt",
  priceGBP: 7.99,
  images: ["/images/products/afrimalt.jpg"],
  description: "Premium Non Alcholoic Malt Drink."
}

];
