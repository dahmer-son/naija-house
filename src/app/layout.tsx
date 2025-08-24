import "./globals.css";
import type { ReactNode } from "react";
import { CartProvider } from "@/hooks/useCart";
import Link from "next/link";
import CartCount from "@/components/CartCount";
import CartLink from "@/components/CartLink";
//...

<Link href="/cart" aria-label="Cart"><CartCount /></Link>

export const metadata = {
  title: "Naija House | Afro-Caribbean Food Store",
  description: "Shop authentic Afro-Caribbean food items online.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-950 text-gray-100">
        <CartProvider>
          {/* Minimal navbar with cart count */}
          <header className="border-b border-gray-900">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
              <Link href="/" className="font-bold text-white">Naija House</Link>
              <nav className="flex items-center gap-4">
                <Link href="/products" className="text-gray-300 hover:text-white">Products</Link>
                <Link href="/cart" className="chip" aria-label="Cart">Cart</Link>
              </nav>
            </div>
          </header>
          <main className="min-h-[calc(100vh-56px)]">{children}</main>
          <footer className="border-t border-gray-900 py-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Naija House
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
