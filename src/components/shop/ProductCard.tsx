import Image from "next/image";
import { BrandCard } from "@/components/ui/BrandCard";
import { Badge }     from "@/components/ui/Badge";

/* ── Category display labels ─────────────────────────────────────────────── */

const CATEGORY_LABELS: Record<string, string> = {
  "tote-bags":         "Tote Bags",
  "mugs":              "Mugs",
  "planners-journals": "Planners & Journals",
  "cards":             "Cards",
  "qatar-heritage":    "Qatar Heritage",
  "home-essentials":   "Home Essentials",
};

/* ── Props ───────────────────────────────────────────────────────────────── */

export interface ProductCardProps {
  name:     string;
  slug:     string;
  category: string;
  /** Stored in fils (smallest unit). Display = price / 100. */
  price:    number;
  imageUrl: string | null;
}

/**
 * ProductCard — Feature 5 (FEATURE_SRS §6).
 *
 * BrandCard with href wraps the card in a Link → entire card is clickable.
 * p-0 override + overflow-hidden lets the image sit flush at the card top.
 *
 * THEME_GUIDE §2: Badge "sand" variant for category label.
 * THEME_GUIDE §3: font-heading for product name; font-body for price.
 * THEME_GUIDE §6: radius-lg, shadow-card → hover via BrandCard; radius-pill on badge.
 * THEME_GUIDE §8: image aspect-square, never stretches.
 */
export function ProductCard({ name, slug, category, price, imageUrl }: ProductCardProps) {
  const displayPrice    = `QAR ${Math.round(price / 100)}`;
  const categoryLabel   = CATEGORY_LABELS[category] ?? category;
  const resolvedImage   = imageUrl ?? "/assets/shop/product-tote.jpg";

  return (
    <BrandCard
      href={`/shop/${slug}`}
      bg="white"
      padding="sm"
      className="flex h-full flex-col p-0 overflow-hidden"
    >

      {/* ── Product image — square crop ──────────────────────────────────── */}
      {/*
       * aspect-square: consistent height across all cards in the row.
       * object-cover object-center: product mockups are centred by design.
       * THEME_GUIDE §5: product mockups use cream/sage palette consistently.
       */}
      <div className="relative aspect-square w-full">
        <Image
          src={resolvedImage}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      {/* ── Card content ────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-2 p-4">

        {/* Category badge — THEME_GUIDE §2: sand variant */}
        <Badge variant="sand" className="self-start">
          {categoryLabel}
        </Badge>

        {/* Product name — THEME_GUIDE §3: Cormorant Garamond */}
        <h3 className="font-heading text-lg font-medium leading-snug text-deep-pine">
          {name}
        </h3>

        {/* Price — terracotta accent, Montserrat semibold */}
        <p className="mt-auto font-body text-sm font-semibold text-terracotta">
          {displayPrice}
        </p>

      </div>
    </BrandCard>
  );
}
