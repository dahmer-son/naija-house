import { NextResponse } from "next/server";

// Stub route for demo. Logs the payload and returns a fake orderId.
// Later: validate, create Order in DB, and kick off Stripe Checkout.
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Very light validation for the demo
    if (!Array.isArray(body?.items) || !body?.address?.fullName) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Pretend we created an order
    const orderId = `demo_${Date.now()}`;

    // Optional: log to server console (visible in logs)
    console.log("Checkout payload:", JSON.stringify(body, null, 2));

    return NextResponse.json({ ok: true, orderId });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
