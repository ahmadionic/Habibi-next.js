import { PageHero } from "@/components/layout/PageHero";
import { PillarCards } from "@/components/sections/PillarCards";
import { BrandValuesStrip } from "@/components/sections/BrandValuesStrip";
import { StatCallout } from "@/components/sections/StatCallout";
import { FinalCTA } from "@/components/sections/FinalCTA";
import {
  DividerCreamToLinen,
  DividerLinenToPine,
  DividerPineToCream,
  DividerCreamToPine,
} from "@/components/ui/SectionDivider";

/**
 * HABibi Landing Page — Feature 1 (FEATURE_SRS §2).
 *
 * Background rhythm (THEME_GUIDE §6 alternation):
 *   1. PageHero         — cream (image overlay)
 *   2. PillarCards      — cream
 *   ── wave: cream → linen ──
 *   3. BrandValuesStrip — linen
 *   ── wave: linen → deep-pine ──
 *   4. StatCallout      — deep-pine
 *   ── wave: deep-pine → cream ──
 *   5. FinalCTA         — cream
 *   ── wave: cream → deep-pine ──
 *      SiteFooter       — deep-pine
 */
export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="ART · ANIMALS · WELL-BEING"
        title="Welcome to HABibi"
        subtitle="Where art and animals bring healing."
        subtitleStyle="script"
        backgroundImage="/assets/home/hero_new.png"
        ctaLabel="Book a Consultation"
        ctaHref="/book"
        imagePosition="object-center"
        glowOpacityClass="bg-cream/40"
      />
      <PillarCards />
      <DividerCreamToLinen />
      <BrandValuesStrip />
      <DividerLinenToPine />
      <StatCallout />
      <DividerPineToCream />
      <FinalCTA />
      <DividerCreamToPine />
    </>
  );
}
