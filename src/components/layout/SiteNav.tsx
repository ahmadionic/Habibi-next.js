"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { useCart } from "@/hooks/useCart";

/* ── Link groups ─────────────────────────────────────────────────────────── */

const LEFT_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portraits", href: "/portraits" },
  { label: "Education", href: "/education" },
];

const RIGHT_LINKS = [
  { label: "Workshops", href: "/workshops" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
];

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];

/* ── Logo geometry ───────────────────────────────────────────────────────── */
/*
 * Logo sits almost entirely inside the nav bar.
 * PROTRUDE = how many px the circle extends below the nav edge (very minor).
 * A small cream rect at center-bottom continues the nav background behind
 * the protruding arc so the bg color matches seamlessly.
 *
 * LOGO_D  = visible image diameter
 * RING    = cream ring border (matches nav bg → visual continuity)
 * OUTER   = LOGO_D/2 + RING = outer radius of the entire circle
 * PROTRUDE = px the circle hangs below the nav
 */
const LOGO_D = 250;             /* px — visible image area */
const RING = 4;               /* px — ring border (box-shadow, no bg fill) */
const OUTER = LOGO_D / 2 + RING; /* 54px outer radius */
const PROTRUDE = 120;              /* px below nav — matches wireframe (~40% of logo) */

const SHADOW_SOFT = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

const MotionLink = motion.create(Link);

/* ── Shared link style ───────────────────────────────────────────────────── */
function NavLinkItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative font-body text-sm font-medium transition-colors duration-200",
        "after:absolute after:inset-x-0 after:bottom-[-4px] after:h-[2px]",
        "after:rounded-full after:bg-terracotta after:origin-left",
        "after:transition-transform after:duration-200",
        active
          ? "text-deep-pine after:scale-x-100"
          : "text-ink-soft hover:text-deep-pine after:scale-x-0 hover:after:scale-x-100",
      )}
    >
      {label}
    </Link>
  );
}

/* ── Component ───────────────────────────────────────────────────────────── */

/**
 * Desktop layout:
 *   [Home · Portraits · Education]   [⊙ logo]   [Workshops · Shop · About | Book →]
 *
 * The circular logo sits centred in the nav bar.
 * PROTRUDE (10 px) of the circle hangs below the nav edge.
 * A narrow cream rectangle (same colour as nav bg) sits behind the protrusion
 * so the background colour matches on both sides of the nav bottom edge.
 *
 * No CSS mask / notch — kept deliberately simple.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setCartOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Nav bg colour (same value used for the logo ring + bg-extension rect) */
  const NAV_BG = "rgb(247,243,236)"; /* --color-cream */

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{ overflow: "visible" }}  /* allow logo to peek below */
      >

        {/* ── Solid nav background ────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-all duration-300",
            scrolled
              ? "bg-cream shadow-[0_4px_20px_rgba(51,75,58,0.08)]"
              : "bg-cream/0",
          )}
        />

        {/* ── Desktop ─────────────────────────────────────────────────────── */}
        <div className="relative mx-auto hidden h-20 max-w-7xl items-center lg:flex lg:px-8">

          {/*
           * Left links: justify-end so they sit flush against the logo,
           * giving equal gap on both sides of the circle.
           */}
          <ul className="flex flex-1 items-center justify-end gap-8 pr-2" role="list" aria-label="Primary navigation">
            {LEFT_LINKS.map(({ label, href }) => (
              <li key={href}>
                <NavLinkItem href={href} label={label} active={isActive(href)} />
              </li>
            ))}
          </ul>

          {/* Centre gap — reserved for the absolute-positioned logo */}
          <div className="shrink-0" style={{ width: (OUTER + 16) * 2 }} aria-hidden="true" />

          {/*
           * Right side: links left-justified (toward logo) + CTA at far right.
           * justify-between pushes the link group left and CTA right.
           */}
          <div className="flex flex-1 items-center justify-between pl-2">
            <ul className="flex items-center gap-8" role="list">
              {RIGHT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavLinkItem href={href} label={label} active={isActive(href)} />
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {/* Cart icon trigger — desktop */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Open cart${itemCount > 0 ? ` (${itemCount} item${itemCount !== 1 ? "s" : ""})` : ""}`}
                className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-linen hover:text-deep-pine ml-6"
                suppressHydrationWarning
              >
                <ShoppingBag size={20} aria-hidden="true" />
                <span
                  aria-hidden="true"
                  suppressHydrationWarning
                  className={itemCount > 0 ? "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta font-body text-[10px] font-semibold leading-none text-cream" : "hidden"}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              </button>
              <MotionLink
                href="/book"
                initial={{ boxShadow: SHADOW_SOFT }}
                whileHover={{ scale: 1.03, boxShadow: SHADOW_HOVER }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
                className={cn(
                  "inline-flex items-center rounded-pill px-6 py-2.5",
                  "font-body text-sm font-semibold tracking-wide",
                  "bg-deep-pine text-cream select-none",
                )}
              >
                Book
              </MotionLink>
            </div>
          </div>
        </div>

        {/* ── Mobile / tablet (below lg) ──────────────────────────────────── */}
        <div className="relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:hidden">
          <Link href="/" aria-label="HABibi — home">
            <Image
              src="/assets/logo/habibi_logo.png"
              alt="HABibi by Claire Olivier"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>
          <div className="flex items-center gap-1">
            {/* Cart icon trigger — mobile */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart${itemCount > 0 ? ` (${itemCount} item${itemCount !== 1 ? "s" : ""})` : ""}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-linen hover:text-deep-pine"
              suppressHydrationWarning
            >
              <ShoppingBag size={20} aria-hidden="true" />
              <span
                aria-hidden="true"
                suppressHydrationWarning
                className={itemCount > 0 ? "absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta font-body text-[10px] font-semibold leading-none text-cream" : "hidden"}
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-linen hover:text-deep-pine"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Circular logo — desktop only ────────────────────────────────── */}
        {/*
         * Positioning:
         *   Container height = OUTER * 2 = 72px
         *   bottom = -(PROTRUDE) = -10px
         *     → container bottom = 10px below nav bottom
         *     → container top    = nav_bottom - 72 + 10 = 80 - 72 + 10 = 18px from nav top
         *     → container centre = 18 + 36 = 54px from nav top (within nav 0–80px) ✓
         *     → logo bottom      = 54 + 32 (logo radius) = 86px → 6px below nav ✓
         *
         * The cream bg-extension rect (below) fills the nav colour behind the
         * 10px arc that sits below the nav edge, matching the nav background.
         */}
        <MotionLink
          href="/"
          aria-label="HABibi — home"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center lg:flex"
          style={{
            width: OUTER * 2,   /* 72px */
            height: OUTER * 2,   /* 72px */
            bottom: -PROTRUDE,   /* -10px */
            zIndex: 50,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2, ease: motionTokens.ease }}
        >

          <Image
            src="/assets/logo/habibi_logo.png"
            alt=""
            width={LOGO_D}
            height={LOGO_D}
            className="h-full w-full object-contain"
            priority
            unoptimized
          />
        </MotionLink>

        {/*
         * Cream background extension — desktop only.
         * Fills the PROTRUDE px gap below the nav edge at centre,
         * matching the nav bg colour so the logo protrusion blends in.
         * Width slightly wider than the logo so the sides match too.
         * zIndex 49: below logo (50) but above hero content.
         */}
        {/* <div
          aria-hidden="true"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
          style={{
            width:                   OUTER * 2 + 4,
            height:                  PROTRUDE + 2,
            top:                     "100%",
            zIndex:                  490,
            borderBottomLeftRadius:  OUTER,
            borderBottomRightRadius: OUTER,
          }}
        /> */}

      </header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileNavDrawer
            id="mobile-nav-drawer"
            onClose={() => setMobileOpen(false)}
            pathname={pathname}
            links={ALL_LINKS}
          />
        )}
        {cartOpen && (
          <CartDrawer onClose={() => setCartOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
