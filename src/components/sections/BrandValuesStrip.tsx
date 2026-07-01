import { Palette, PawPrint, Heart, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";

/* ── Brand values — THEME_GUIDE §1 (exact wording, do not alter) ────────── */

interface BrandValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: BrandValue[] = [
  {
    icon: Palette,
    title: "Fine Art & Creativity",
    /* THEME_GUIDE §1 verbatim */
    description: "Celebrating imagination, expression, and the beauty of art.",
  },
  {
    icon: PawPrint,
    title: "Animal Connection",
    /* THEME_GUIDE §1 verbatim */
    description: "Building trust, empathy, and unconditional bonds.",
  },
  {
    icon: Heart,
    title: "Well-being & Healing",
    /* THEME_GUIDE §1 verbatim */
    description: "Supporting emotional well-being, growth, and inner balance.",
  },
  {
    icon: BookOpen,
    title: "Education & Growth",
    /* THEME_GUIDE §1 verbatim */
    description: "Inspiring learning, curiosity, and personal development.",
  },
];

const STEP = motionTokens.staggerChildren; /* 0.08s — THEME_GUIDE §7 */

/* ── Component ─────────────────────────────────────────────────────────── */

/**
 * Brand values strip — Feature 1 (FEATURE_SRS §2).
 *
 * Background: bg-linen (#E7DCC8) — one step warmer than the cream (#F7F3EC)
 * PillarCards section above it, providing clear visual alternation per
 * THEME_GUIDE §6 ("section background alternation: sand/linen").
 *
 * Visual weight: intentionally lighter than PillarCards —
 *   - No card border or shadow
 *   - No BrandCard wrapper
 *   - Icon on a minimal cream/70 circle (vs sand circle in PillarCards)
 *   - Title in font-body semibold (vs font-heading in PillarCards)
 *
 * Decorative gold hairline: THEME_GUIDE §4 — "#C9A35A, 1px, never as fill".
 *
 * Copy: descriptions are THEME_GUIDE §1 verbatim — do not paraphrase.
 */
export function BrandValuesStrip() {
  return (
    <section
      aria-label="Our brand values"
      /*
       * bg-linen (#E7DCC8) alternates from bg-cream (#F7F3EC) above.
       * THEME_GUIDE §2: "linen — card backgrounds, dividers" /
       * "sand — section background alternation, badges".
       * Linen is subtler than sand here; the PillarCards already used sand
       * for icon backgrounds. Using linen keeps the alternation clear without
       * repeating the same shade.
       */
      className="bg-linen py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-14 flex flex-col items-center text-center">

          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Our Brand Values</SectionEyebrow>
          </FadeIn>

          {/* Thin gold hairline — THEME_GUIDE §4: decorative motif, never fill */}
          <div
            aria-hidden="true"
            className="mt-4 w-12"
            style={{ height: "1px", backgroundColor: "#C9A35A", opacity: 0.55 }}
          />

        </div>

        {/* ── 4-column values grid — THEME_GUIDE §8 responsive rules ─── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <FadeIn
                key={value.title}
                variant="fadeUp"
                delay={index * STEP}
              >
                <div className="flex flex-col items-center gap-4 text-center">

                  {/*
                   * Icon treatment: cream/70 circle on linen bg — lighter than
                   * PillarCards' sand circle on cream bg. No shadow, no border.
                   * Icon: sage (#8D9C7A), strokeWidth 1.5 (thin-line per THEME_GUIDE §4).
                   */}
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cream/70">
                    <Icon
                      size={26}
                      className="text-sage"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/*
                   * Title: font-body semibold — THEME_GUIDE §3: "H4–H6 font-body
                   * font-semibold". Lighter treatment than PillarCards (font-heading).
                   */}
                  <h3 className="font-body text-base font-semibold text-deep-pine">
                    {value.title}
                  </h3>

                  {/*
                   * Description: exact wording from THEME_GUIDE §1.
                   * max-w-[180px] keeps lines short for centered readability.
                   */}
                  <p className="font-body text-sm leading-relaxed text-ink-soft" style={{ maxWidth: "180px" }}>
                    {value.description}
                  </p>

                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
