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
  title: "Earth Endowment Observatory",
  description:
    "A public-interest observatory for natural endowment, governance, stewardship, and accountability along critical mineral corridors.",
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="eeo-brand-body flex min-h-dvh flex-col">
        <div className="eeo-atmosphere-root" aria-hidden>
          <span className="eeo-bg-sky" />
          <span className="eeo-bg-water" />
          <span className="eeo-bg-vegetation" />
          <span className="eeo-bg-shimmer" />
        </div>
        <a
          href="#eeo-section-panel"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[color:var(--eeo-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--eeo-green-soft)]"
        >
          Skip to main content
        </a>
        <>
          <PublicChrome>{children}</PublicChrome>
          <ConditionalEeoFooter />
        </>
      </body>
    </html>
  );
}
