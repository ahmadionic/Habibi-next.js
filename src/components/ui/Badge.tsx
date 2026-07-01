import { cn } from "@/lib/utils";

const variantClasses = {
  /** Warm sand — default. Use for category tags, package names. */
  sand:  "bg-sand text-ink",
  /** Slightly softer linen. Use for secondary/neutral tags. */
  linen: "bg-linen text-ink",
  /** Sage-tinted — for positive / active states. */
  sage:  "bg-sage/20 text-deep-pine",
} as const;

export interface BadgeProps {
  children: React.ReactNode;
  variant?: keyof typeof variantClasses;
  className?: string;
}

/**
 * Compact pill label for package names, category tags, priority markers, etc.
 *
 * Shape:   radius-pill                     — THEME_GUIDE section 6
 * Colors:  sand / linen / sage backgrounds — THEME_GUIDE section 2
 * Font:    font-body, small, weight 500    — THEME_GUIDE section 3
 */
export function Badge({
  children,
  variant = "sand",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        // shape
        "inline-flex items-center rounded-pill",
        // spacing
        "px-3 py-0.5",
        // typography — small, medium weight, font-body
        "font-body text-xs font-medium",
        // variant
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
