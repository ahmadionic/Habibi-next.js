"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Camera, Share2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandButton } from "@/components/ui/BrandButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

/* ── Static data ────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Portraits", href: "/portraits" },
  { label: "Education", href: "/education" },
  { label: "Workshops", href: "/workshops" },
  { label: "Shop",      href: "/shop" },
  { label: "About",     href: "/about" },
] as const;

/*
 * lucide-react v1.21.0 does not include brand icons (Instagram, Facebook).
 * Using thematic stand-ins: Camera (photo sharing), Share2 (social), Mail.
 * Swap these hrefs + icons when the client provides real social handles.
 */
const SOCIAL_LINKS = [
  { icon: Camera, label: "Instagram",  href: "#" },
  { icon: Share2, label: "Facebook",   href: "#" },
  { icon: Mail,   label: "Email us",   href: "mailto:hello@claireolivierart.com" },
] as const;

/* THEME_GUIDE section 4: gold used ONLY as a 1px decorative hairline — never as a fill */
const GOLD_HAIRLINE = "#C9A35A";

/* ── Component ─────────────────────────────────────────────────────────── */

/**
 * HABibi site footer.
 *
 * Background:  deep-pine (#334B3A)            — THEME_GUIDE section 2
 * Text:        cream / cream/70 for muted     — THEME_GUIDE section 2
 * Headings:    SectionEyebrow in text-sage    — THEME_GUIDE section 2 (sage on dark)
 * Tagline:     Allura script font             — THEME_GUIDE section 3 + 4
 * Divider:     1px gold (#C9A35A) hairline    — THEME_GUIDE section 4
 * Layout:      4-col desktop → 2-col tablet → 1-col mobile
 */
export function SiteFooter() {
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* TODO: wire to email provider (Nodemailer / Resend) in Feature 8 */
    console.log("Newsletter signup:", email);
    setSubscribed(true);
    setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="bg-deep-pine text-cream">

      {/* ── Four-column grid ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Col 1 — Logo + Allura tagline */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="HABibi by Claire Olivier — back to home">
              <Image
                src="/assets/logo/habibi_logo.png"
                alt="HABibi by Claire Olivier"
                width={140}
                height={140}
                className="object-contain"
                style={{ width: "auto" }}
                unoptimized
              />
            </Link>
            {/*
              Allura (font-script) — THEME_GUIDE section 3: "reserved for short
              emotional lines only". The tagline qualifies; kept small in footer context.
            */}
            <p
              className="font-script leading-relaxed text-cream/80"
              style={{ fontSize: "1.3rem" }}
            >
              Where Art, Animals and Well-being Create Connection and Healing.
            </p>
          </div>

          {/* Col 2 — Explore (same 6 links as SiteNav) */}
          <div>
            <SectionEyebrow as="h6" className="text-sage mb-5">
              Explore
            </SectionEyebrow>
            <ul className="flex flex-col gap-3" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-cream/70 transition-colors duration-150 hover:text-sage"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Get in Touch */}
          <div>
            <SectionEyebrow as="h6" className="text-sage mb-5">
              Get in Touch
            </SectionEyebrow>
            <address className="not-italic flex flex-col gap-3">
              <a
                href="mailto:hello@claireolivierart.com"
                className="font-body text-sm text-cream/70 transition-colors duration-150 hover:text-sage break-all"
              >
                hello@claireolivierart.com
              </a>
              <a
                href="tel:+97455550000"
                className="font-body text-sm text-cream/70 transition-colors duration-150 hover:text-sage"
              >
                +974 5555 0000
              </a>
              <p className="font-body text-sm text-cream/70">
                Doha, Qatar
              </p>
            </address>
          </div>

          {/* Col 4 — Newsletter signup */}
          <div>
            <SectionEyebrow as="h6" className="text-sage mb-5">
              Stay Connected
            </SectionEyebrow>
            <p className="mb-4 font-body text-sm leading-relaxed text-cream/70">
              Updates on new portraits, workshops, and well-being stories.
            </p>

            {subscribed ? (
              <p className="font-body text-sm text-sage">
                ♡ Thank you — we&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="flex flex-col gap-3">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={cn(
                    "w-full rounded-md border border-cream/20 bg-white/5",
                    "px-4 py-2.5",
                    "font-body text-sm text-cream placeholder:text-cream/40",
                    "outline-none transition-colors duration-200",
                    "focus:border-sage focus:ring-1 focus:ring-sage/30",
                  )}
                />
                <BrandButton
                  type="submit"
                  variant="accent"
                  className="w-full"
                >
                  Subscribe
                </BrandButton>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* ── Gold hairline divider — THEME_GUIDE section 4 ───────────────── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            backgroundColor: GOLD_HAIRLINE,
            opacity: 0.45,
          }}
        />
      </div>

      {/* ── Bottom bar: copyright + social icons ────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

          <p className="font-body text-xs text-cream/50 text-center sm:text-left">
            &copy; {year} Claire Olivier. All rights reserved.
          </p>

          <nav aria-label="Social links" className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-cream/50 transition-colors duration-150 hover:text-sage"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </nav>

        </div>
      </div>

    </footer>
  );
}
