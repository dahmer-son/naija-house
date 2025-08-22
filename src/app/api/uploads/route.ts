import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs"; // ensure Node runtime for streams

export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization")?.split(" ")[1];
    requireAdmin(auth); // only admins can upload

    // Read multipart/form-data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "naija-house/products";
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(buffer);
    });

    return NextResponse.json({ ok: true, url: uploaded.secure_url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 401 });
  }
}
