"use client";

import { useEffect } from "react";
import { useCart } from "@/components/shop/cart-provider";

/** Empties the bag once the order is confirmed (rendered on the success page). */
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
