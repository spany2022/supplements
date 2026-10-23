"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { findVariant, type Product, type Variant } from "./catalog";
import { store } from "./store-config";

/**
 * Client-side cart and wishlist, persisted to localStorage. In production the
 * cart should be mirrored to the commerce backend so stock and prices are
 * re-validated server-side at checkout.
 */

export type CartLine = { variantId: string; qty: number };
export type ResolvedLine = CartLine & { product: Product; variant: Variant; lineTotal: number };

type State = { lines: CartLine[]; wishlist: string[]; hydrated: boolean };

type Action =
  | { type: "hydrate"; lines: CartLine[]; wishlist: string[] }
  | { type: "add"; variantId: string; qty: number }
  | { type: "set"; variantId: string; qty: number }
  | { type: "remove"; variantId: string }
  | { type: "clear" }
  | { type: "toggleWish"; slug: string };

const STORAGE_KEY = "kynetic:store:v1";

const clampToStock = (variantId: string, qty: number) => {
  const found = findVariant(variantId);
  if (!found) return 0;
  return Math.max(0, Math.min(qty, found.variant.stock, 10));
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, wishlist: action.wishlist, hydrated: true };
    case "add": {
      const existing = state.lines.find((l) => l.variantId === action.variantId);
      const qty = clampToStock(action.variantId, (existing?.qty ?? 0) + action.qty);
      if (!qty) return state;
      const lines = existing
        ? state.lines.map((l) => (l.variantId === action.variantId ? { ...l, qty } : l))
        : [...state.lines, { variantId: action.variantId, qty }];
      return { ...state, lines };
    }
    case "set": {
      const qty = clampToStock(action.variantId, action.qty);
      return {
        ...state,
        lines: qty
          ? state.lines.map((l) => (l.variantId === action.variantId ? { ...l, qty } : l))
          : state.lines.filter((l) => l.variantId !== action.variantId),
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.variantId !== action.variantId) };
    case "clear":
      return { ...state, lines: [] };
    case "toggleWish":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.slug)
          ? state.wishlist.filter((s) => s !== action.slug)
          : [...state.wishlist, action.slug],
      };
  }
}

export type Toast = { id: number; title: string; detail?: string };

type StoreContext = {
  hydrated: boolean;
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  wishlist: string[];
  add: (variantId: string, qty?: number) => boolean;
  setQty: (variantId: string, qty: number) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toast: Toast | null;
  bump: number;
};

const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], wishlist: [], hydrated: false });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [bump, setBump] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    let lines: CartLine[] = [];
    let wishlist: string[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<State>;
        lines = (parsed.lines ?? []).filter((l) => findVariant(l.variantId));
        wishlist = parsed.wishlist ?? [];
      }
    } catch {
      /* storage unavailable — start empty */
    }
    dispatch({ type: "hydrate", lines, wishlist });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines: state.lines, wishlist: state.wishlist }));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, [state]);

  const showToast = useCallback((title: string, detail?: string) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), title, detail });
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      state.lines.flatMap((l) => {
        const found = findVariant(l.variantId);
        return found ? [{ ...l, ...found, lineTotal: found.variant.price * l.qty }] : [];
      }),
    [state.lines],
  );

  const add = useCallback(
    (variantId: string, qty = 1) => {
      const found = findVariant(variantId);
      if (!found || found.variant.stock <= 0) return false;
      const current = state.lines.find((l) => l.variantId === variantId)?.qty ?? 0;
      if (current >= Math.min(found.variant.stock, 10)) {
        showToast("Maximum quantity reached", `Only ${found.variant.stock} available for this option.`);
        return false;
      }
      dispatch({ type: "add", variantId, qty });
      setBump((b) => b + 1);
      const detail = [found.variant.flavor, found.variant.size].filter(Boolean).join(" · ");
      showToast(`${found.product.name} added to cart`, detail);
      return true;
    },
    [state.lines, showToast],
  );

  const value: StoreContext = {
    hydrated: state.hydrated,
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    wishlist: state.wishlist,
    add,
    setQty: (variantId, qty) => dispatch({ type: "set", variantId, qty }),
    remove: (variantId) => dispatch({ type: "remove", variantId }),
    clear: () => dispatch({ type: "clear" }),
    toggleWish: (slug) => dispatch({ type: "toggleWish", slug }),
    isWished: (slug) => state.wishlist.includes(slug),
    drawerOpen,
    setDrawerOpen,
    toast,
    bump,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/* ---------- pricing ---------- */

export type ShippingMethod = "standard" | "express";

export function quote(subtotal: number, method: ShippingMethod, code?: string) {
  const discount = code ? store.discountCodes.find((d) => d.code === code.trim().toUpperCase()) : undefined;
  const discountAmount = discount ? Math.round((subtotal * discount.percentOff) / 100) : 0;
  const afterDiscount = subtotal - discountAmount;
  const shipping =
    subtotal === 0
      ? 0
      : method === "express"
        ? store.shipping.expressFee
        : afterDiscount >= store.shipping.freeThreshold
          ? 0
          : store.shipping.standardFee;
  return { discount, discountAmount, shipping, total: afterDiscount + shipping };
}
