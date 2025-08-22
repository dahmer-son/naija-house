"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Naija House Logo" width={36} height={36} />
          <span className="text-lg md:text-xl font-bold text-white">Naija House</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/products" className="hover:text-brandGreen">Products</Link>
          <Link href="/cart" className="relative hover:text-brandGreen">
            🛒 <span className="sr-only">Cart</span>
            {/* If you have a cart count, place the badge span here */}
          </Link>
          <Link href="/admin/login" className="btn btn-ghost text-sm">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
