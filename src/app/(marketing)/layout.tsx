import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Shared layout for all public-facing (marketing) pages.
 * SiteNav + SiteFooter live here — NOT in the root layout.
 *
 * Route group (marketing) strips the folder name from URLs:
 *   (marketing)/portraits/page.tsx → /portraits
 *   (marketing)/page.tsx          → /
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
