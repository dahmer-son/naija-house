import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    // Simple account call to verify creds; falls back to upload of a demo image url if needed
    const res = await cloudinary.api.ping(); // should return { status: "ok" }
    return NextResponse.json({ ok: true, res });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
