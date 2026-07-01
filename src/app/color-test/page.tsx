"use client";

import { Heart, ArrowRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/layout/FadeIn";
import { BrandButton } from "@/components/ui/BrandButton";
import { BrandCard } from "@/components/ui/BrandCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { Badge } from "@/components/ui/Badge";

const colors = [
  // Primary
  { name: "sage",        hex: "#8D9C7A", group: "Primary",    textDark: false },
  { name: "forest",      hex: "#5E6F52", group: "Primary",    textDark: false },
  { name: "deep-pine",   hex: "#334B3A", group: "Primary",    textDark: false },
  // Secondary / backgrounds
  { name: "cream",       hex: "#F7F3EC", group: "Secondary",  textDark: true  },
  { name: "sand",        hex: "#DCC8A6", group: "Secondary",  textDark: true  },
  { name: "linen",       hex: "#E7DCC8", group: "Secondary",  textDark: true  },
  // Accents
  { name: "terracotta",  hex: "#B37352", group: "Accent",     textDark: false },
  { name: "umber",       hex: "#8C6A54", group: "Accent",     textDark: false },
  { name: "rosewood",    hex: "#B98D87", group: "Accent",     textDark: false },
  // Functional
  { name: "ink",         hex: "#2B2B26", group: "Functional", textDark: false },
  { name: "ink-soft",    hex: "#5C5C54", group: "Functional", textDark: false },
  { name: "success",     hex: "#6B8F5C", group: "Functional", textDark: false },
  { name: "error",       hex: "#B3543F", group: "Functional", textDark: false },
  { name: "border-soft", hex: "#E2D9C8", group: "Functional", textDark: true  },
];

const groups = ["Primary", "Secondary", "Accent", "Functional"];

export default function ColorTestPage() {
  return (
    <div style={{ backgroundColor: "#F7F3EC", minHeight: "100vh", padding: "48px 32px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#334B3A", fontSize: "2rem", fontWeight: 600, marginBottom: "8px" }}>
        HABibi Color Token Test
      </h1>
      <p style={{ color: "#5C5C54", marginBottom: "48px", fontSize: "0.875rem" }}>
        14 tokens from THEME_GUIDE.md — verify no blues or purples appear.
      </p>

      {groups.map((group) => (
        <div key={group} style={{ marginBottom: "40px" }}>
          <h2 style={{ color: "#5E6F52", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>
            {group}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
            {colors.filter((c) => c.group === group).map((color) => (
              <div
                key={color.name}
                style={{
                  backgroundColor: color.hex,
                  borderRadius: "12px",
                  padding: "20px 16px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 20px rgba(51,75,58,0.08)",
                }}
              >
                <p style={{
                  color: color.textDark ? "#334B3A" : "#F7F3EC",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: "4px",
                  fontFamily: "monospace",
                }}>
                  {color.name}
                </p>
                <p style={{
                  color: color.textDark ? "#5E6F52" : "rgba(247,243,236,0.75)",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                }}>
                  {color.hex}
                </p>
                <p style={{
                  color: color.textDark ? "#5E6F52" : "rgba(247,243,236,0.6)",
                  fontSize: "0.65rem",
                  marginTop: "8px",
                  fontFamily: "monospace",
                }}>
                  bg-{color.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ borderTop: "1px solid #E2D9C8", paddingTop: "32px", marginTop: "16px" }}>
        <h2 style={{ color: "#5E6F52", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>
          Border Radius Tokens
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
          {[
            { name: "sm",   px: "6px",   cls: "rounded-sm" },
            { name: "md",   px: "12px",  cls: "rounded-md" },
            { name: "lg",   px: "20px",  cls: "rounded-lg" },
            { name: "pill", px: "9999px",cls: "rounded-pill" },
          ].map((r) => (
            <div key={r.name} style={{ textAlign: "center" }}>
              <div style={{
                width: "80px", height: "80px",
                backgroundColor: "#8D9C7A",
                borderRadius: r.px,
                marginBottom: "8px",
              }} />
              <p style={{ color: "#334B3A", fontSize: "0.75rem", fontWeight: 600, fontFamily: "monospace" }}>{r.cls}</p>
              <p style={{ color: "#5C5C54", fontSize: "0.65rem", fontFamily: "monospace" }}>{r.px}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Eyebrow utility ──────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #E2D9C8", paddingTop: "32px", marginTop: "32px" }}>
        <h2 style={{ color: "#5E6F52", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "20px", fontWeight: 600 }}>
          Eyebrow Utility (.eyebrow class)
        </h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          <div style={{ padding: "20px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>BRAND VALUES</p>
            <p style={{ color: "#5C5C54", fontSize: "0.8rem" }}>forest (default)</p>
          </div>
          <div style={{ padding: "20px 24px", backgroundColor: "#334B3A", borderRadius: "12px" }}>
            <p className="eyebrow text-sage" style={{ marginBottom: "8px" }}>BRAND VALUES</p>
            <p style={{ color: "#8D9C7A", fontSize: "0.8rem" }}>text-sage override (dark bg)</p>
          </div>
          <div style={{ padding: "20px 24px", backgroundColor: "#F7F3EC", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>FINE ART &amp; CREATIVITY</p>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>ANIMAL CONNECTION</p>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>WELL-BEING &amp; HEALING</p>
            <p className="eyebrow">EDUCATION &amp; GROWTH</p>
          </div>
        </div>
      </div>

      {/* ── Shadow tokens ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #E2D9C8", paddingTop: "32px", marginTop: "32px" }}>
        <h2 style={{ color: "#5E6F52", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "20px", fontWeight: 600 }}>
          Shadow Tokens
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
          <div className="shadow-soft" style={{ padding: "28px 24px", backgroundColor: "#fff", borderRadius: "12px" }}>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>shadow-soft</p>
            <p style={{ color: "#5C5C54", fontSize: "0.8rem", fontFamily: "monospace" }}>
              0 4px 20px rgba(51,75,58,0.08)
            </p>
            <p style={{ color: "#8D9C7A", fontSize: "0.75rem", marginTop: "6px" }}>Cards at rest, subtle lift</p>
          </div>
          <div className="shadow-card" style={{ padding: "28px 24px", backgroundColor: "#fff", borderRadius: "12px" }}>
            <p className="eyebrow" style={{ marginBottom: "8px" }}>shadow-card</p>
            <p style={{ color: "#5C5C54", fontSize: "0.8rem", fontFamily: "monospace" }}>
              0 8px 30px rgba(51,75,58,0.10)
            </p>
            <p style={{ color: "#8D9C7A", fontSize: "0.75rem", marginTop: "6px" }}>Default card elevation</p>
          </div>
          <FadeIn variant="fadeUp" delay={0.15}>
            <div className="shadow-hover" style={{ padding: "28px 24px", backgroundColor: "#fff", borderRadius: "12px" }}>
              <p className="eyebrow" style={{ marginBottom: "8px" }}>shadow-hover</p>
              <p style={{ color: "#5C5C54", fontSize: "0.8rem", fontFamily: "monospace" }}>
                0 12px 40px rgba(179,115,82,0.15)
              </p>
              <p style={{ color: "#B37352", fontSize: "0.75rem", marginTop: "6px" }}>
                Terracotta-tinted, on hover
              </p>
              <p style={{ color: "#8D9C7A", fontSize: "0.7rem", marginTop: "10px", fontStyle: "italic" }}>
                ↑ This box is wrapped in &lt;FadeIn variant=&quot;fadeUp&quot;&gt;
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── Font samples ─────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid #E2D9C8", paddingTop: "32px", marginTop: "32px" }}>
        <h2 style={{ color: "#5E6F52", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "24px", fontWeight: 600 }}>
          Typography Tokens
        </h2>

        {/* Cormorant Garamond — heading */}
        <div style={{ marginBottom: "28px", padding: "20px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
          <p style={{ color: "#8D9C7A", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "monospace" }}>
            font-heading — Cormorant Garamond — weights 400 / 500 / 600
          </p>
          <p className="font-heading" style={{ color: "#334B3A", fontSize: "2.5rem", lineHeight: 1.2, fontWeight: 500 }}>
            Welcome HABibi — Where Art, Animals &amp; Well-being Create Connection
          </p>
          <p className="font-heading" style={{ color: "#5E6F52", fontSize: "1rem", marginTop: "6px", fontWeight: 400, fontStyle: "italic" }}>
            "The powerful bond between all living things." — 400 italic
          </p>
        </div>

        {/* Montserrat — body */}
        <div style={{ marginBottom: "28px", padding: "20px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
          <p style={{ color: "#8D9C7A", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "monospace" }}>
            font-body — Montserrat — weights 400 / 500 / 600 / 700
          </p>
          <p className="font-body" style={{ color: "#2B2B26", fontSize: "1rem", lineHeight: 1.7, fontWeight: 400 }}>
            HABibi packages are designed to fit each school and each student. They can be whole class or specific to particular students and learning needs. — 400 regular
          </p>
          <p className="font-body" style={{ color: "#2B2B26", fontSize: "0.875rem", marginTop: "8px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            FINE ART &amp; CREATIVITY — 600 all-caps eyebrow
          </p>
          <p className="font-body" style={{ color: "#2B2B26", fontSize: "1rem", marginTop: "8px", fontWeight: 700 }}>
            Book a Consultation — 700 button weight
          </p>
        </div>

        {/* Allura — script */}
        <div style={{ padding: "20px 24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
          <p style={{ color: "#8D9C7A", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "6px", fontFamily: "monospace" }}>
            font-script — Allura — weight 400 only — max ~8 words
          </p>
          <p className="font-script" style={{ color: "#B37352", fontSize: "2.25rem", lineHeight: 1.4 }}>
            Create Connection and Healing.
          </p>
          <p className="font-script" style={{ color: "#B98D87", fontSize: "1.75rem", lineHeight: 1.4, marginTop: "4px" }}>
            Where Art &amp; Animals Meet.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          COMPONENT SHOWCASE — Test 1.5
          ══════════════════════════════════════════════════════════════════ */}
      <div style={{ borderTop: "2px solid #DCC8A6", paddingTop: "48px", marginTop: "48px" }}>
        <h1 className="font-heading" style={{ color: "#334B3A", fontSize: "2rem", marginBottom: "8px" }}>
          Component Showcase
        </h1>
        <p style={{ color: "#5C5C54", fontSize: "0.875rem", marginBottom: "48px" }}>
          Hover over buttons and the card to see the motion / shadow transitions.
        </p>

        {/* ── BrandButton ─────────────────────────────────────────────── */}
        <section style={{ marginBottom: "48px" }}>
          <SectionEyebrow showHeart>BrandButton</SectionEyebrow>
          <div style={{ height: "16px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
            <BrandButton variant="primary">
              Book a Consultation
            </BrandButton>

            <BrandButton variant="primary" leadingIcon={Heart}>
              Meet Miss Claire
            </BrandButton>

            <BrandButton variant="primary" trailingIcon={ArrowRight}>
              Explore the Collection
            </BrandButton>

            <BrandButton variant="accent">
              Welcome HABibi
            </BrandButton>

            <BrandButton variant="accent" leadingIcon={Sparkles} trailingIcon={ArrowRight}>
              Begin Your Journey
            </BrandButton>

            <BrandButton variant="primary" disabled>
              Disabled state
            </BrandButton>
          </div>
        </section>

        {/* ── SectionEyebrow ──────────────────────────────────────────── */}
        <section style={{ marginBottom: "48px" }}>
          <SectionEyebrow showHeart>SectionEyebrow</SectionEyebrow>
          <div style={{ height: "16px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
            <SectionEyebrow showHeart>Brand Values</SectionEyebrow>
            <SectionEyebrow>Fine Art &amp; Creativity</SectionEyebrow>
            <SectionEyebrow showHeart>Animal Connection</SectionEyebrow>
            <div style={{ backgroundColor: "#334B3A", padding: "16px", borderRadius: "8px" }}>
              <SectionEyebrow className="text-sage" showHeart>
                On a dark background
              </SectionEyebrow>
            </div>
          </div>
        </section>

        {/* ── Badge ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: "48px" }}>
          <SectionEyebrow showHeart>Badge</SectionEyebrow>
          <div style={{ height: "16px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", padding: "24px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2D9C8" }}>
            <Badge>Simple Portrait</Badge>
            <Badge>Something Special</Badge>
            <Badge>Remembrance</Badge>
            <Badge variant="linen">HABibi for Homes</Badge>
            <Badge variant="linen">HABibi for Education</Badge>
            <Badge variant="sage">Active</Badge>
            <Badge>P0</Badge>
            <Badge variant="linen">P1</Badge>
          </div>
        </section>

        {/* ── BrandCard ───────────────────────────────────────────────── */}
        <section style={{ marginBottom: "48px" }}>
          <SectionEyebrow showHeart>BrandCard</SectionEyebrow>
          <div style={{ height: "16px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>

            <FadeIn variant="fadeUp" delay={0}>
              <BrandCard>
                <SectionEyebrow>Fine Art &amp; Creativity</SectionEyebrow>
                <h3 className="font-heading" style={{ color: "#334B3A", fontSize: "1.5rem", margin: "12px 0 8px" }}>
                  HABibi for Homes
                </h3>
                <p style={{ color: "#5C5C54", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Custom pet portraits celebrating the animals at the heart of your family.
                </p>
                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                  <Badge>Simple Portrait</Badge>
                  <Badge variant="linen">From QAR 750</Badge>
                </div>
              </BrandCard>
            </FadeIn>

            <FadeIn variant="fadeUp" delay={0.08}>
              <BrandCard bg="cream">
                <SectionEyebrow>Animal Connection</SectionEyebrow>
                <h3 className="font-heading" style={{ color: "#334B3A", fontSize: "1.5rem", margin: "12px 0 8px" }}>
                  HABibi for Education
                </h3>
                <p style={{ color: "#5C5C54", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Therapy quails meet the classroom — Math, Reading, Art &amp; Crafts programs.
                </p>
                <div style={{ marginTop: "16px" }}>
                  <BrandButton variant="primary" trailingIcon={ArrowRight}>
                    Learn More
                  </BrandButton>
                </div>
              </BrandCard>
            </FadeIn>

            <FadeIn variant="scaleIn" delay={0.16}>
              <BrandCard href="/workshops">
                <SectionEyebrow showHeart>Well-being &amp; Healing</SectionEyebrow>
                <h3 className="font-heading" style={{ color: "#334B3A", fontSize: "1.5rem", margin: "12px 0 8px" }}>
                  HABibi Workshops
                </h3>
                <p style={{ color: "#5C5C54", fontSize: "0.875rem", lineHeight: 1.6 }}>
                  Watercolour, animal portraits, and mindfulness — this card links to /workshops.
                </p>
                <p style={{ color: "#8D9C7A", fontSize: "0.75rem", marginTop: "12px", fontStyle: "italic" }}>
                  ↑ This card uses href="/workshops" — click to navigate.
                </p>
              </BrandCard>
            </FadeIn>

          </div>
        </section>

        {/* ── Script accent line ──────────────────────────────────────── */}
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          <p className="font-script" style={{ color: "#B37352", fontSize: "2.25rem" }}>
            Create Connection and Healing.
          </p>
        </div>
      </div>
    </div>
  );
}
