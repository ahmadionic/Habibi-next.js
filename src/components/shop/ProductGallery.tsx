import Image from "next/image";

export interface ProductGalleryProps {
  /**
   * Ordered list of image URLs for this product.
   * Currently one image per product; built to accept multiple for future use
   * (e.g., alternate angles, in-use lifestyle shots).
   */
  images: string[];
  /** Product name — used as alt text for the primary image. */
  productName: string;
}

/**
 * ProductGallery — Feature 5 (FEATURE_SRS §6 product detail).
 *
 * Displays the primary product image prominently. Structured to support a
 * future image carousel or thumbnail rail when multiple images are available.
 *
 * THEME_GUIDE §6: radius-lg, shadow-card on the image frame.
 * THEME_GUIDE §5: object-cover object-center — product mockups are centred.
 * THEME_GUIDE §8: aspect-square on mobile collapses to a tall portrait on
 *   lg when height is driven by the sibling content column via items-start.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const primary = images[0] ?? "/assets/shop/product-tote.jpg";

  return (
    <div className="flex flex-col gap-4">

      {/* ── Primary image ─────────────────────────────────────────────── */}
      {/*
       * overflow-hidden clips the image to radius-lg.
       * aspect-square gives a consistent 1:1 proportion on all viewports;
       * on large screens the column height is constrained by the detail
       * panel beside it, so the image fills that height naturally.
       */}
      <div
        className="relative w-full overflow-hidden rounded-lg aspect-square"
        style={{ boxShadow: "0 8px 30px rgba(51,75,58,0.10)" }}
      >
        <Image
          src={primary}
          alt={productName}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {/* Thumbnail rail placeholder — renders only when multiple images exist */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border-soft"
            >
              <Image
                src={src}
                alt={`${productName} view ${i + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
