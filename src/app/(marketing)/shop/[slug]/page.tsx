import type { Metadata } from "next";
import Link             from "next/link";
import { notFound }     from "next/navigation";
import { eq }           from "drizzle-orm";
import { db }           from "@/db";
import { products }     from "@/db/schema";
import { Badge }             from "@/components/ui/Badge";
import { AddToCartButton }   from "@/components/shop/AddToCartButton";
import { ProductGallery }    from "@/components/shop/ProductGallery";

/* ── Category display labels (same map as ProductCard / ProductGrid) ──── */

const CATEGORY_LABELS: Record<string, string> = {
  "tote-bags":         "Tote Bags",
  "mugs":              "Mugs",
  "planners-journals": "Planners & Journals",
  "cards":             "Cards",
  "qatar-heritage":    "Qatar Heritage",
  "home-essentials":   "Home Essentials",
};

/* ── Types ───────────────────────────────────────────────────────────── */

interface Props {
  /** params is a Promise in this Next.js version — must be awaited. */
  params: Promise<{ slug: string }>;
}

/* ── generateMetadata ────────────────────────────────────────────────── */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) return { title: "Product Not Found | HABibi Shop" };

  return {
    title: `${product.name} | HABibi Shop | Claire Olivier`,
    description: product.description ?? undefined,
  };
}

/* ── Page ────────────────────────────────────────────────────────────── */

/**
 * Product detail page — Feature 5 (FEATURE_SRS §6).
 *
 * Server Component: fetches a single product by slug from Neon via Drizzle.
 * Calls notFound() if the slug doesn't match any product row.
 *
 * Layout (THEME_GUIDE §8):
 *   - Desktop (lg): 2-col grid — ProductGallery left, details right.
 *   - Mobile: stacked, gallery on top.
 *
 * THEME_GUIDE §2: terracotta for price; sage for "In Stock" indicator.
 * THEME_GUIDE §3: font-heading for product name; font-body for price + prose.
 * THEME_GUIDE §6: radius-lg on gallery, border-soft divider.
 */
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  /* Fetch by slug — limit(1) so Drizzle returns a 1-element or empty array */
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  /* Trigger Next.js 404 page if slug not found */
  if (!product) notFound();

  const displayPrice    = `QAR ${Math.round(product.price / 100)}`;
  const categoryLabel   = CATEGORY_LABELS[product.category] ?? product.category;
  const galleryImages   = product.imageUrl ? [product.imageUrl] : [];

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">

        {/* ── Back link ──────────────────────────────────────────────── */}
        {/*
         * THEME_GUIDE §3: font-body, small, forest color — consistent with
         * section eyebrow weight/color family. Arrow kept inline via text.
         */}
        <Link
          href="/shop"
          className="mb-10 inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:text-deep-pine transition-colors duration-200"
        >
          <span aria-hidden="true">←</span>
          Back to Shop
        </Link>

        {/* ── Two-column layout ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">

          {/* ── Left: product gallery ─────────────────────────────────── */}
          <ProductGallery
            images={galleryImages}
            productName={product.name}
          />

          {/* ── Right: product details ────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Category badge */}
            <Badge variant="sand" className="self-start">
              {categoryLabel}
            </Badge>

            {/* Product name — H1, Cormorant Garamond */}
            <h1 className="font-heading text-3xl font-medium leading-tight text-deep-pine md:text-4xl">
              {product.name}
            </h1>

            {/* Gold hairline — THEME_GUIDE §4 */}
            <div
              aria-hidden="true"
              className="w-12"
              style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.65 }}
            />

            {/* Price — terracotta, large, Montserrat */}
            <p className="font-body text-2xl font-semibold text-terracotta">
              {displayPrice}
            </p>

            {/* Description */}
            {product.description && (
              <p className="font-body text-base leading-relaxed text-ink-soft">
                {product.description}
              </p>
            )}

            {/* In Stock / Out of Stock indicator */}
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  backgroundColor: product.inStock ? "#6B8F5C" : "#B3543F",
                }}
              />
              <span
                className="font-body text-sm font-medium"
                style={{ color: product.inStock ? "#6B8F5C" : "#B3543F" }}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Thin rule */}
            <hr className="border-border-soft" />

            <AddToCartButton
              productId={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              disabled={!product.inStock}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
