"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string | null;
  /** Shade/option label, or null for products without variants. */
  variant?: string | null;
  quantity: number;
};

type AddInput = Omit<CartItem, "quantity"> & { quantity?: number };

type LineKey = { slug: string; variant?: string | null };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: AddInput) => void;
  remove: (slug: string, variant?: string | null) => void;
  setQty: (slug: string, variant: string | null | undefined, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  /** True once localStorage has hydrated — guard count badges against SSR mismatch. */
  mounted: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "harav.cart";

/** A line is keyed by slug + variant, so the same product in two shades is two lines. */
function sameLine(a: LineKey, b: LineKey) {
  return a.slug === b.slug && (a.variant ?? null) === (b.variant ?? null);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount (avoids an SSR/client mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore malformed storage
    }
    setMounted(true);
  }, []);

  // Persist on change, but only after the initial hydrate has run.
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / private-mode errors
    }
  }, [items, mounted]);

  const add = useCallback((item: AddInput) => {
    const qty = Math.max(1, item.quantity ?? 1);
    setItems((prev) => {
      const i = prev.findIndex((p) => sameLine(p, item));
      if (i === -1) {
        return [...prev, { ...item, variant: item.variant ?? null, quantity: qty }];
      }
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + qty };
      return next;
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string, variant?: string | null) => {
    setItems((prev) => prev.filter((p) => !sameLine(p, { slug, variant })));
  }, []);

  const setQty = useCallback(
    (slug: string, variant: string | null | undefined, qty: number) => {
      setItems((prev) => {
        if (qty <= 0) return prev.filter((p) => !sameLine(p, { slug, variant }));
        return prev.map((p) =>
          sameLine(p, { slug, variant }) ? { ...p, quantity: qty } : p,
        );
      });
    },
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, p) => n + p.quantity, 0);
    const subtotal = items.reduce((n, p) => n + p.price * p.quantity, 0);
    return { items, count, subtotal, add, remove, setQty, clear, open, setOpen, mounted };
  }, [items, add, remove, setQty, clear, open, mounted]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
