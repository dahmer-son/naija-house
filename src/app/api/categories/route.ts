import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const cats = await Category.find().sort({ name: 1 });
  return NextResponse.json(cats);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  if (!body?.name || !body?.slug) {
    return NextResponse.json({ error: "name and slug required" }, { status: 400 });
  }
  const exists = await Category.findOne({ slug: body.slug });
  if (exists) return NextResponse.json({ error: "slug exists" }, { status: 400 });
  const created = await Category.create({ name: body.name, slug: body.slug });
  return NextResponse.json(created, { status: 201 });
}
