"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Animation variants (mirrors MobileNavDrawer) ────────────────────────── */

const panelVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit:    { x: "100%" },
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

/* ── Props ───────────────────────────────────────────────────────────────── */

interface CartDrawerProps {
  onClose: () => void;
}

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * CartDrawer — Feature 5 (FEATURE_SRS §6).
 *
 * Slide-in panel from the right, mounted/unmounted by SiteNav via AnimatePresence.
 * Reads cart items directly from the localStorage store via useCart().
 *
 * THEME_GUIDE §2: bg-cream panel on dark backdrop.
 * THEME_GUIDE §3: font-heading for totals; font-body for item names.
 * THEME_GUIDE §6: rounded-lg images; border-soft dividers.
 * THEME_GUIDE §7: same panel/backdrop variants as MobileNavDrawer.
 */
export function CartDrawer({ onClose }: CartDrawerProps) {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();

  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const displayTotal = `QAR ${Math.round(total / 100)}`;

  return (
    <div className="fixed inset-0 z-50">

      {/* ── Backdrop ──────────────────────────────────────────────────────── */}
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* ── Drawer panel ──────────────────────────────────────────────────── */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: motionTokens.ease }}
        className="absolute right-0 top-0 flex h-full w-[min(420px,92vw)] flex-col bg-cream"
        style={{ boxShadow: "-8px 0 40px rgba(51,75,58,0.12)" }}
      >

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-deep-pine" aria-hidden="true" />
            <h2 className="font-heading text-lg font-medium text-deep-pine">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta font-body text-xs font-semibold text-cream">
                {itemCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-linen hover:text-deep-pine"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-5 py-4">

          {items.length === 0 ? (

            /* Empty state */
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <ShoppingBag size={40} className="text-ink-soft/40" aria-hidden="true" />
              <p className="font-body text-base text-ink-soft">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="font-body text-sm font-medium text-terracotta underline-offset-2 hover:underline"
              >
                Continue shopping
              </Link>
            </div>

          ) : (

            /* Line items */
            <ul className="flex flex-col divide-y divide-border-soft" role="list">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-4">

                  {/* Thumbnail */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-linen">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag size={20} className="text-ink-soft/40" aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  {/* Name + price + stepper */}
                  <div className="flex flex-1 flex-col gap-2 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-body text-sm font-medium leading-snug text-ink line-clamp-2">
                        {item.name}
                      </p>
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="shrink-0 text-ink-soft/50 transition-colors hover:text-terracotta"
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">

                      {/* Quantity stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            "border border-border-soft bg-sand font-body text-sm text-ink",
                            "transition-colors hover:bg-linen hover:text-deep-pine",
                          )}
                        >
                          <Minus size={12} aria-hidden="true" />
                        </button>
                        <span
                          className="w-5 text-center font-body text-sm font-medium text-ink"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full",
                            "border border-border-soft bg-sand font-body text-sm text-ink",
                            "transition-colors hover:bg-linen hover:text-deep-pine",
                          )}
                        >
                          <Plus size={12} aria-hidden="true" />
                        </button>
                      </div>

                      {/* Line total */}
                      <p className="font-body text-sm font-semibold text-terracotta">
                        QAR {Math.round((item.price * item.quantity) / 100)}
                      </p>

                    </div>
                  </div>
                </li>
              ))}
            </ul>

          )}
        </div>

        {/* ── Footer (only when cart has items) ─────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-border-soft px-5 py-5">

            {/* Subtotal row */}
            <div className="mb-4 flex items-center justify-between">
              <span className="font-body text-sm text-ink-soft">Subtotal</span>
              <span className="font-heading text-xl font-medium text-deep-pine">
                {displayTotal}
              </span>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className={cn(
                "flex w-full items-center justify-center rounded-pill px-7 py-3.5",
                "font-body text-sm font-semibold tracking-wide select-none",
                "bg-deep-pine text-cream transition-colors hover:bg-forest",
              )}
              style={{ boxShadow: "0 4px 20px rgba(51,75,58,0.18)" }}
            >
              Proceed to Checkout
            </Link>

            <p className="mt-3 text-center font-body text-xs text-ink-soft">
              Shipping calculated at checkout
            </p>
          </div>
        )}

      </motion.div>
    </div>
  );
}
