"use client";

import { cn } from "@/lib/utils";

export interface CategoryOption {
  value: string;
  label: string;
}

export interface CategoryFilterProps {
  categories: CategoryOption[];
  /** Empty string = "All" / no filter active. */
  active: string;
  onChange: (category: string) => void;
}

/**
 * CategoryFilter — horizontal pill button row for client-side product filtering.
 *
 * No DB round-trip on click — the parent passes all products once; this
 * component only signals which category is active via the onChange prop.
 *
 * THEME_GUIDE §2: deep-pine bg / cream text for active; sand bg / ink for inactive.
 * THEME_GUIDE §3: font-body, weight 500, small.
 * THEME_GUIDE §6: radius-pill for all buttons.
 * THEME_GUIDE §8: flex-wrap so pills reflow on narrow viewports.
 */
export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const pillBase = cn(
    "rounded-pill px-4 py-1.5",
    "font-body text-sm font-medium",
    "transition-colors duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-1",
  );

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex flex-wrap justify-center gap-2"
    >

      {/* "All" pill */}
      <button
        onClick={() => onChange("")}
        aria-pressed={active === ""}
        className={cn(
          pillBase,
          active === ""
            ? "bg-deep-pine text-cream"
            : "bg-sand text-ink hover:bg-linen",
        )}
      >
        All
      </button>

      {/* Per-category pills */}
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          aria-pressed={active === cat.value}
          className={cn(
            pillBase,
            active === cat.value
              ? "bg-deep-pine text-cream"
              : "bg-sand text-ink hover:bg-linen",
          )}
        >
          {cat.label}
        </button>
      ))}

    </div>
  );
}
