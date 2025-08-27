"use client";
import {
  createContext, useContext, useEffect, useMemo, useState, ReactNode,
} from "react";
import type { CartItem } from "@/types";

export interface CartContextShape {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  update: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  subtotalPence: number;
  count: number;
}

const CartContext = createContext<CartContextShape | undefined>(undefined);
const STORAGE_KEY = "naija-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {/* ignore */}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {/* ignore */}
  }, [items]);

  const add: CartContextShape["add"] = (item, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.slug === item.slug);
      if (found) {
        return prev.map(i => i.slug === item.slug
          ? { ...i, qty: Math.max(1, i.qty + qty) }
          : i
        );
      }
      return [...prev, { ...item, qty: Math.max(1, qty) }];
    });
  };

  const update: CartContextShape["update"] = (slug, qty) => {
    setItems(prev => prev.map(i => i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i));
  };

  const remove: CartContextShape["remove"] = (slug) => {
    setItems(prev => prev.filter(i => i.slug !== slug));
  };

  const clear = () => setItems([]);

  const subtotalPence = useMemo(
    () => items.reduce((sum, i) => sum + i.pricePence * i.qty, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);

  const value: CartContextShape = { items, add, update, remove, clear, subtotalPence, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
