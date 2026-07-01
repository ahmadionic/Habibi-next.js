"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/motion";

const SHADOW_SOFT  = "0 4px 20px rgba(51,75,58,0.08)";
const SHADOW_HOVER = "0 12px 40px rgba(179,115,82,0.15)";

interface NavLink {
  readonly label: string;
  readonly href: string;
}

interface MobileNavDrawerProps {
  id?: string;
  onClose: () => void;
  pathname: string;
  links: readonly NavLink[];
}

const MotionCTALink = motion.create(Link);

const panelVariants = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit:    { x: "100%" },
};

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
};

/**
 * Slide-in mobile navigation drawer — rendered only when open (AnimatePresence
 * controls mount/unmount in SiteNav). Transitions use motionTokens from
 * THEME_GUIDE section 7.
 */
export function MobileNavDrawer({ id, onClose, pathname, links }: MobileNavDrawerProps) {
  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    /* Full-viewport overlay — z-50 sits above the sticky header (z-40) */
    <div className="fixed inset-0 z-50 lg:hidden">

      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <motion.div
        variants={backdropVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* ── Drawer panel ──────────────────────────────────────────────── */}
      <motion.div
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        variants={panelVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        /* THEME_GUIDE section 7: soft easeOutExpo, 350ms */
        transition={{ duration: 0.35, ease: motionTokens.ease }}
        className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col bg-cream"
        /* Left-edge shadow (not a Tailwind class — custom box-shadow) */
        style={{ boxShadow: "-8px 0 40px rgba(51,75,58,0.12)" }}
      >

        {/* Header: logo + close */}
        <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
          <Link href="/" onClick={onClose} aria-label="HABibi — back to home">
            <Image
              src="/assets/logo/habibi_logo.png"
              alt="HABibi by Claire Olivier"
              width={110}
              height={36}
              className="object-contain"
              priority={false}
              unoptimized
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-linen hover:text-deep-pine"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links — min 44px touch targets per THEME_GUIDE section 8 */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1" role="list">
            {links.map(({ label, href }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[44px] items-center gap-3 rounded-md px-3",
                      "font-body text-base font-medium transition-colors duration-150",
                      active
                        ? "bg-linen text-deep-pine"
                        : "text-ink hover:bg-linen/60 hover:text-deep-pine",
                    )}
                  >
                    {/* Active indicator dot — THEME_GUIDE: terracotta accent */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                        active ? "bg-terracotta" : "bg-transparent",
                      )}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA: Book a Consultation */}
        <div className="border-t border-border-soft px-5 py-6">
          <MotionCTALink
            href="/book"
            onClick={onClose}
            initial={{ boxShadow: SHADOW_SOFT }}
            whileHover={{ scale: 1.02, boxShadow: SHADOW_HOVER }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease }}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-pill px-7 py-3.5",
              "font-body text-sm font-semibold tracking-wide",
              "bg-deep-pine text-cream select-none",
            )}
          >
            Book
          </MotionCTALink>

          <p className="mt-4 text-center font-body text-xs text-ink-soft">
            Art &middot; Animals &middot; Well-being &middot; Doha, Qatar
          </p>
        </div>

      </motion.div>
    </div>
  );
}
