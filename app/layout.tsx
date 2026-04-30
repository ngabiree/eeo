import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import ConditionalEeoFooter from "@/components/eeo/ConditionalEeoFooter";
import PublicChrome from "@/components/eeo/PublicChrome";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Public Evidence Prototype: Copper-Cobalt Corridor",
    template: "%s · Copper-Cobalt Pilot",
  },
  description:
    "Earth Endowment Observatory — public-interest evidence infrastructure for copper–cobalt corridor endowment-to-economy chains (prototype). Not a dashboard, atlas, score, or registry.",
  icons: {
    icon: [{ url: "/brand/eeo-logo-transparent.png", type: "image/png", sizes: "any" }],
  },
  robots: { index: true, follow: true },
  openGraph: {
    images: [
      {
        url: "/brand/eeo-logo-card.png",
        width: 1254,
        height: 1254,
        alt: "Earth Endowment Observatory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/brand/eeo-logo-card.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#dff3e7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /** Preserve user zoom on mobile — important for accessibility. */
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="eeo-brand-body isolate flex min-h-dvh w-full flex-col overflow-x-clip">
        <div className="eeo-atmosphere-root" aria-hidden>
          <span className="eeo-bg-sky" />
          <span className="eeo-bg-water" />
          <span className="eeo-bg-vegetation" />
          <span className="eeo-bg-shimmer" />
        </div>
        <a href="#main-content" className="eeo-skip-link">
          Skip to main content
        </a>
        <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col">
          <PublicChrome>{children}</PublicChrome>
          <ConditionalEeoFooter />
        </div>
      </body>
    </html>
  );
}
