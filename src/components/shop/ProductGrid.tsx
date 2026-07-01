"use client";

import { useState, useMemo } from "react";
import { FadeIn }          from "@/components/layout/FadeIn";
import { CategoryFilter }  from "./CategoryFilter";
import { ProductCard }     from "./ProductCard";
import { motionTokens }    from "@/lib/motion";

/* ── Types ───────────────────────────────────────────────────────────────── */

/** Minimal shape needed from the products DB row. */
export interface ProductRow {
  id:       number;
  name:     string;
  slug:     string;
  category: string;
  price:    number;
  imageUrl: string | null;
  inStock:  boolean | null;
}

/* ── Category label map (duplicated here to keep the client bundle self-contained) */

const CATEGORY_LABELS: Record<string, string> = {
  "tote-bags":         "Tote Bags",
  "mugs":              "Mugs",
  "planners-journals": "Planners & Journals",
  "cards":             "Cards",
  "qatar-heritage":    "Qatar Heritage",
  "home-essentials":   "Home Essentials",
};

const STEP = motionTokens.staggerChildren;

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * ProductGrid — Feature 5 (FEATURE_SRS §6).
 *
 * "use client" — owns the activeCategory filter state so CategoryFilter can
 * signal changes and the visible cards re-render without a DB round-trip.
 *
 * Architecture: page.tsx (Server) fetches all products once and passes them
 * here as a plain prop. Filtering is O(n) in the browser — no network cost.
 *
 * Grid: 4-col xl / 2-col md / 1-col mobile      — THEME_GUIDE §8
 * Animation: FadeIn fadeUp stagger on cards      — THEME_GUIDE §7
 * Background: bg-cream                           — THEME_GUIDE §2
 */
export function ProductGrid({ products }: { products: ProductRow[] }) {

  const [activeCategory, setActiveCategory] = useState("");

  /* Derive unique ordered category list from actual product data */
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<{ value: string; label: string }> = [];
    for (const p of products) {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        result.push({
          value: p.category,
          label: CATEGORY_LABELS[p.category] ?? p.category,
        });
      }
    }
    return result;
  }, [products]);

  /* Filter in browser — no extra DB query */
  const visible = useMemo(
    () =>
      activeCategory === ""
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  return (
    <section aria-label="Product catalogue" className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Category filter row ───────────────────────────────────────── */}
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* ── Product cards grid ────────────────────────────────────────── */}
        {/*
         * THEME_GUIDE §8: 4-col xl / 2-col md / 1-col mobile.
         * key on the grid forces React to remount cards when filter changes,
         * retriggering FadeIn whileInView animations for the new visible set.
         */}
        {visible.length === 0 ? (
          <p className="py-20 text-center font-body text-base text-ink-soft">
            No products in this category yet.
          </p>
        ) : (
          <div
            key={activeCategory}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {visible.map((product, i) => (
              <FadeIn
                key={product.id}
                variant="fadeUp"
                delay={STEP * i}
                className="h-full"
              >
                <ProductCard
                  name={product.name}
                  slug={product.slug}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              </FadeIn>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
