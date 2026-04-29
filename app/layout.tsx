import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Public Evidence Prototype: Copper-Cobalt Corridor",
  description:
    "Evidence-first civic intelligence prototype for a copper-cobalt corridor dossier, evidence ledger, release manifest, and correction route.",
  robots: { index: true, follow: true },
  openGraph: {
    images: [
      {
        url: "/branding/eeo-logo-card.png",
        width: 1254,
        height: 1254,
        alt: "Earth Endowment Observatory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/branding/eeo-logo-card.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#11110F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#EFE8D8] text-stone-950">
        <a
          href="#eeo-section-panel"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-stone-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
