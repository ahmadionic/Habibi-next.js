"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface AddToCartButtonProps {
  productId: number;
  name:      string;
  /** Price in fils. */
  price:     number;
  imageUrl:  string | null;
  disabled?: boolean;
}

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * AddToCartButton — Feature 5 (FEATURE_SRS §6).
 *
 * Adds the product to the localStorage-backed cart on click.
 * Transitions to a green "Added!" state for 1.5 s, then reverts.
 *
 * THEME_GUIDE §2: terracotta default → forest success.
 * THEME_GUIDE §7: AnimatePresence mode="wait" for icon/label swap;
 *   framer-motion scale on hover + tap.
 */
export function AddToCartButton({
  productId,
  name,
  price,
  imageUrl,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (added || disabled) return;
    addItem({ productId, name, price, imageUrl });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled  ? { scale: 0.97 } : {}}
      transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
      aria-label={added ? "Item added to cart" : "Add to cart"}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2.5",
        "rounded-pill px-8 py-3.5",
        "font-body text-sm font-semibold tracking-wide select-none",
        "transition-colors duration-300",
        added
          ? "bg-forest text-cream"
          : disabled
            ? "cursor-not-allowed bg-terracotta/40 text-cream/60"
            : "bg-terracotta text-cream hover:bg-terracotta/90",
      )}
      style={{
        boxShadow: disabled
          ? "none"
          : added
            ? "0 4px 20px rgba(107,143,92,0.25)"
            : "0 4px 20px rgba(179,115,82,0.20)",
      }}
    >
      <AnimatePresence mode="wait">
        {added ? (
          <motion.span
            key="added"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: motionTokens.ease }}
          >
            <Check size={16} aria-hidden="true" />
            Added!
          </motion.span>
        ) : (
          <motion.span
            key="default"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: motionTokens.ease }}
          >
            <ShoppingBag size={16} aria-hidden="true" />
            Add to Cart
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
