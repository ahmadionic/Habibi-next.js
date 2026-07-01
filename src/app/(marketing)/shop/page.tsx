import type { Metadata } from "next";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PageHero } from "@/components/layout/PageHero";
import { ProductGrid } from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "The HABibi Collection | Shop | Claire Olivier",
  description:
    "Thoughtfully made, lovingly designed — browse the HABibi shop for tote bags, " +
    "mugs, journals, cards, and more.",
};

/*
 * Feature 5 — Online Shop — /shop
 * FEATURE_SRS §6 | THEME_GUIDE §2, 3, 6, 7, 8
 *
 * Server Component: fetches all products from Neon via Drizzle once on render.
 * ProductGrid ("use client") receives the data and handles category filtering
 * entirely in the browser — no additional DB queries on filter interaction.
 *
 * Section order:
 *   1. PageHero     — hero image, eyebrow / title / script subtitle
 *   2. ProductGrid  — bg-cream — CategoryFilter + 4-col product grid
 */
export default async function ShopPage() {
  /* Fetch all in-stock products from Neon — runs on the server */
  let allProducts: typeof products.$inferSelect[] = [];
  try {
    allProducts = await db.select().from(products);
    // console.log(allProducts);
  } catch (error) {
    console.error("Failed to fetch products from database:", error);
  }

  return (
    <>

      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <PageHero
        eyebrow="SHOP"
        title="The HABibi Collection"
        subtitle="Thoughtfully made, lovingly designed."
        subtitleStyle="script"
        backgroundImage="/assets/shop/product-heritage.jpg"
      />

      {/* ── 2. Product grid + filter ─────────────────────────────────────── */}
      {/*
       * Pass the server-fetched rows as a plain serialisable prop.
       * ProductGrid is "use client" — it owns filter state and renders
       * CategoryFilter + ProductCard children.
       * The `key` prop on the grid (inside ProductGrid) re-triggers card
       * animations when the active category changes.
       */}
      <ProductGrid products={allProducts} />

    </>
  );
}
