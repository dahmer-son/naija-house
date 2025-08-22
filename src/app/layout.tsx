import "./globals.css";
import type { ReactNode } from "react";

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
        {children}
      </body>
    </html>
  );
}
