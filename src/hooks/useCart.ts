"use client";

/**
 * useCart — client-side cart store backed by localStorage.
 *
 * PERSISTENCE CHOICE: localStorage
 *   Cart state survives page refreshes and navigation. It clears only
 *   when the user explicitly clears browser data, or when clearCart() is
 *   called (e.g., after a completed checkout). An in-memory alternative
 *   would reset on every full-page reload — unsuitable for a shop flow
 *   where users may browse multiple products across navigation.
 *
 * ARCHITECTURE: no React Context / Provider required.
 *   Uses React 18's useSyncExternalStore to subscribe every component
 *   that calls useCart() to the same localStorage-backed external store.
 *   Any write (addItem, removeItem, etc.) dispatches a CustomEvent so
 *   all mounted subscribers re-render instantly. The 'storage' event
 *   provides cross-tab synchronisation for free.
 */

import { useSyncExternalStore } from "react";

/* ── Types ───────────────────────────────────────────────────────────────── */

export interface CartItem {
  productId: number;
  name:      string;
  /** Stored in fils (smallest QAR unit). Display = price / 100. */
  price:     number;
  imageUrl:  string | null;
  quantity:  number;
}

/* ── Storage helpers ─────────────────────────────────────────────────────── */

const STORAGE_KEY  = "habibi-cart";
const UPDATE_EVENT = "habibi-cart-update";

let cachedItems: CartItem[] | null = null;
let lastRawValue: string | null = null;

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === lastRawValue && cachedItems !== null) {
      return cachedItems;
    }
    lastRawValue = raw;
    cachedItems = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return cachedItems;
  } catch {
    cachedItems = [];
    lastRawValue = null;
    return cachedItems;
  }
}

function writeCart(items: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  /* Notify all useCart() subscribers in this tab */
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

/* ── useSyncExternalStore wiring ─────────────────────────────────────────── */

function subscribe(callback: () => void): () => void {
  window.addEventListener(UPDATE_EVENT, callback);
  /* 'storage' fires in OTHER tabs when localStorage changes — cross-tab sync */
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/* Server snapshot — always empty; cart is a purely client-side concern */
const EMPTY_ARRAY: CartItem[] = [];
const getServerSnapshot = (): CartItem[] => EMPTY_ARRAY;

/* ── Hook ────────────────────────────────────────────────────────────────── */

export function useCart() {
  const items = useSyncExternalStore(subscribe, readCart, getServerSnapshot);

  /* ── Derived values ────────────────────────────────────────────────────── */

  /** Total number of individual units across all line items. */
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  /** Grand total in fils. Display = total / 100. */
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  /* ── Actions ───────────────────────────────────────────────────────────── */

  /**
   * Add a product to the cart. If already present, increments quantity by 1.
   * Reads directly from localStorage so concurrent calls don't race.
   */
  function addItem(item: Omit<CartItem, "quantity">): void {
    const current = readCart();
    const idx = current.findIndex((i) => i.productId === item.productId);
    if (idx >= 0) {
      const updated = [...current];
      updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
      writeCart(updated);
    } else {
      writeCart([...current, { ...item, quantity: 1 }]);
    }
  }

  /** Remove a line item entirely. */
  function removeItem(productId: number): void {
    writeCart(readCart().filter((i) => i.productId !== productId));
  }

  /**
   * Set a specific quantity. Calls removeItem when quantity reaches 0
   * so the line item disappears automatically.
   */
  function updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) { removeItem(productId); return; }
    writeCart(
      readCart().map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    );
  }

  /** Empty the entire cart. */
  function clearCart(): void {
    writeCart([]);
  }

  return { items, itemCount, total, addItem, removeItem, updateQuantity, clearCart };
}
