import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const items = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (!body?.name || !body?.slug || !body?.pricePence)
    return NextResponse.json({ error: "name, slug, pricePence required" }, { status: 400 });

  const created = await Product.create({
    name: body.name,
    slug: body.slug,
    description: body.description || "",
    images: body.images || [],
    pricePence: Number(body.pricePence),
    category: body.category || null,
    inventory: Number(body.inventory || 0),
    isNewArrival: !!body.isNewArrival,
    isBestSeller: !!body.isBestSeller,
  });

  return NextResponse.json(created, { status: 201 });
}
