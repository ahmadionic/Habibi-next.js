import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Allura } from "next/font/google";
import "./globals.css";

/*
 * HABibi brand fonts — see THEME_GUIDE.md section 3
 *
 * Each font is loaded with a CSS variable so Tailwind v4's @theme inline
 * can reference it via var(--font-cormorant) etc.
 * next/font automatically includes correct fallback metrics and font-display:swap.
 *
 * Tailwind v4 equivalent of tailwind.config.ts theme.extend.fontFamily:
 *   font-heading → var(--font-cormorant)  [serif fallback]
 *   font-body    → var(--font-montserrat) [sans-serif fallback]
 *   font-script  → var(--font-allura)     [cursive fallback]
 *
 * @theme inline mapping lives in globals.css
 */
const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const allura = Allura({
  weight: ["400"],
  variable: "--font-allura",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Claire Olivier | HABibi — Art, Animals & Wellbeing",
  description:
    "Where Art, Animals and Well-being Create Connection and Healing. " +
    "HABibi offers animal-assisted therapy, fine art education programmes, " +
    "and bespoke pet portraiture — bringing heart, healing, and creativity " +
    "to families and schools in Doha, Qatar.",
  icons: {
    icon: "/assets/logo/logo-icon.png",
  },
  openGraph: {
    title: "Claire Olivier | HABibi — Art, Animals & Wellbeing",
    description:
      "Where Art, Animals and Well-being Create Connection and Healing. " +
      "HABibi offers animal-assisted therapy, fine art education programmes, " +
      "and bespoke pet portraiture.",
    url: "https://habibi-claire.com",
    siteName: "HABibi by Claire Olivier",
    images: [
      {
        url: "/assets/logo/logo-primary.png",
        width: 800,
        height: 800,
        alt: "Claire Olivier - HABibi Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${montserrat.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="font-body min-h-full flex flex-col bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
