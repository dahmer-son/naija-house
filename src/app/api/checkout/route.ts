import { NextResponse } from "next/server";
import type { CartItem } from "@/types";

type Payload = {
  address: { fullName: string; email: string; phone?: string; line1: string; line2?: string; city: string; postcode: string; country: string; };
  items: CartItem[];
  subtotalPence: number;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;
    if (!Array.isArray(body.items) || !body.address?.fullName) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const orderId = `demo_${Date.now()}`;
    return NextResponse.json({ ok: true, orderId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
