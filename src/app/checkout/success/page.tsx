export default function SuccessPage({
  searchParams,
}: {
  searchParams?: { orderId?: string };
}) {
  const orderId = searchParams?.orderId || "pending";
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-brandGreen">Order Received</h1>
      <p className="mt-4 text-gray-300">
        Thanks! Your order has been placed. We’ll email you an update shortly.
      </p>
      <div className="mt-6 card p-6 inline-block">
        <p className="text-sm text-muted">Order ID</p>
        <p className="text-xl font-semibold text-white mt-1">{orderId}</p>
      </div>
      <a href="/" className="btn btn-primary mt-8 inline-block">Continue shopping</a>
    </main>
  );
}
