import { NextResponse } from "next/server";

/**
 * Stub orders endpoint:
 *  - Validates payload
 *  - Recomputes subtotal on the server (trust-minimizing)
 *  - Returns a fake orderId
 * Later, swap to Mongo: persist Order model and return real IDs/status.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = Array.isArray(body?.items) ? body.items : [];
    const addr = body?.address || null;

    if (!items.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }
    if (!addr?.fullName || !addr?.email || !addr?.line1 || !addr?.city || !addr?.postcode) {
      return NextResponse.json({ error: "Address incomplete." }, { status: 400 });
    }

    // Recompute subtotal server-side
    const subtotalPence = items.reduce((sum: number, i: any) => {
      const price = typeof i.pricePence === "number" ? i.pricePence : 0;
      const qty = Number(i.qty) || 0;
      return sum + price * qty;
    }, 0);

    // For the stub, create a lightweight order response
    const orderId = `NH-${Date.now()}`;

    // TODO (later): save to MongoDB, status: 'pending'
    // TODO (later): create Stripe checkout session and return URL

    return NextResponse.json({ ok: true, orderId, subtotalPence });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error." }, { status: 500 });
  }
}
