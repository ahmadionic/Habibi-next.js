import { PawPrint, BookOpen, Palette, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { BrandCard } from "@/components/ui/BrandCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { motionTokens } from "@/lib/motion";

/* ── Pillar data — FEATURE_SRS §2 + §1 (routes) ────────────────────────── */

interface Pillar {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const PILLARS: Pillar[] = [
  {
    title: "HABibi for Homes",
    description:
      "Bespoke pet portraits in graphite, colour pencil, and mixed media — " +
      "celebrating the animals who are already part of your family.",
    href: "/portraits",
    icon: PawPrint,
  },
  {
    title: "HABibi for Children & Teens",
    description:
      "Animal-assisted education programmes that bring curiosity, focus, and " +
      "joy into the classroom through therapeutic quails and creative art.",
    href: "/education",
    icon: BookOpen,
  },
  {
    title: "HABibi for Health & Growth",
    description:
      "Watercolour workshops and animal-therapy sessions for adults and teens " +
      "seeking balance, self-expression, and a gentler way to heal.",
    href: "/workshops",
    icon: Palette,
  },
  {
    title: "Shop the Collection",
    description:
      "Totes, mugs, journals, and greeting cards — carry a piece of the " +
      "HABibi world wherever you go.",
    href: "/shop",
    icon: ShoppingBag,
  },
];

/* Stagger step sourced from motionTokens — THEME_GUIDE §7: 80ms per child */
const STEP = motionTokens.staggerChildren;

/* ── Component ─────────────────────────────────────────────────────────── */

/**
 * Four-pillar card grid — Feature 1 (FEATURE_SRS §2).
 *
 * id="pillars" connects the HeroSection "Begin Your Journey" anchor link.
 *
 * Layout:   1-col mobile → 2-col tablet (sm) → 4-col desktop (lg)
 *           per THEME_GUIDE §8.
 *
 * Hover:    CSS translateY(-4px) on wrapper div (lift) combined with
 *           BrandCard's existing Framer Motion shadow-hover (deepen) —
 *           two separate elements, no transform conflict.
 *
 * Cards are BrandCard with href prop → the entire card is a Next.js Link.
 * "Explore →" is a <span> (not a nested <a>), styled as a visual affordance.
 * group-hover:underline on the span activates when the wrapper div is hovered.
 *
 * FadeIn uses whileInView (scroll-triggered, once: true) — correct for a
 * section below the fold. Delays stagger at STEP (0.08s) per card index.
 */
export function PillarCards() {
  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="bg-cream py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <FadeIn variant="fadeUp">
            <SectionEyebrow showHeart>Explore HABibi</SectionEyebrow>
          </FadeIn>
          <FadeIn variant="fadeUp" delay={STEP}>
            <h2
              id="pillars-heading"
              className="mt-3 font-heading text-3xl font-medium text-deep-pine md:text-4xl"
            >
              Find Your Path
            </h2>
          </FadeIn>
        </div>

        {/* ── 4-column card grid — THEME_GUIDE §8 ─────────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              /*
               * FadeIn: scroll-triggered whileInView, stagger by card index.
               * className="h-full" propagates height through to BrandCard so
               * all cards in the same grid row stretch to equal height.
               */
              <FadeIn
                key={pillar.href}
                variant="fadeUp"
                delay={index * STEP}
                className="h-full"
              >
                {/*
                 * Lift wrapper: CSS hover:translate-Y(-4px) for the vertical
                 * lift affordance. group class allows group-hover: on children.
                 * Separate from BrandCard's Framer Motion shadow, so no
                 * transform conflict between CSS and Framer Motion.
                 */}
                <div className="group h-full transition-transform duration-200 ease-out hover:-translate-y-1">
                  {/*
                   * BrandCard with href:
                   *   - renders as <Link><motion.div>
                   *   - motion.div has whileHover shadow-hover (deepens + terracotta glow)
                   *   - h-full + flex flex-col to equalise card heights within the row
                   */}
                  <BrandCard
                    href={pillar.href}
                    padding="lg"
                    className="h-full flex flex-col gap-3"
                  >

                    {/* Icon — sage icon on sand circular background */}
                    {/* THEME_GUIDE §2: sage for icon fills, sand for card/section bg */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-sand">
                      <Icon
                        size={22}
                        className="text-sage"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    </div>

                    {/* Title — Cormorant Garamond, deep-pine — THEME_GUIDE §3 */}
                    <h3 className="font-heading text-xl font-medium leading-tight text-deep-pine md:text-2xl">
                      {pillar.title}
                    </h3>

                    {/* Description — Montserrat, ink-soft, flex-1 to push Explore down */}
                    <p className="flex-1 font-body text-sm leading-relaxed text-ink-soft">
                      {pillar.description}
                    </p>

                    {/*
                     * "Explore →" affordance — a <span>, not a nested <a>.
                     * The BrandCard Link wrapper handles navigation.
                     * group-hover:underline activates from the lift wrapper's :hover.
                     * THEME_GUIDE §2: terracotta for accent CTAs / highlights.
                     * THEME_GUIDE §9: CTA verbs — "Explore the Collection".
                     */}
                    <span className="mt-1 inline-block font-body text-sm font-semibold text-terracotta group-hover:underline">
                      Explore →
                    </span>

                  </BrandCard>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
