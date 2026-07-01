import { cn } from "@/lib/utils";

export interface SectionEyebrowProps {
  children: React.ReactNode;
  /**
   * Append the decorative heart glyph "♡" after the label.
   * THEME_GUIDE section 4: "small heart glyph (♡) as a section separator".
   * Use sparingly — only on marketing/section headers.
   */
  showHeart?: boolean;
  /** Override the default forest color. Use "text-sage" on dark backgrounds. */
  className?: string;
  as?: "p" | "span" | "div" | "h6";
}

/**
 * Section eyebrow label.
 *
 * Applies the global `.eyebrow` utility class defined in globals.css:
 *   font-body, weight 600, 0.75rem, letter-spacing 0.18em, ALL CAPS, forest color.
 *
 * The optional heart glyph (♡) is an aria-hidden decorative element per
 * THEME_GUIDE section 4 — it is never read by screen readers.
 */
export function SectionEyebrow({
  children,
  showHeart = false,
  className,
  as: Tag = "p",
}: SectionEyebrowProps) {
  return (
    <Tag className={cn("eyebrow", className)}>
      {children}
      {showHeart && (
        <span
          aria-hidden="true"
          className="ml-2 text-rosewood not-uppercase normal-case tracking-normal"
          style={{ fontSize: "0.85em" }}
        >
          ♡
        </span>
      )}
    </Tag>
  );
}
