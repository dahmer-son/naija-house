import { NextResponse } from "next/server";
import { products } from "@/data/products";

// GET /api/products/[slug] -> single product (optional for PDP)
export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}
