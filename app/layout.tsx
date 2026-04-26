import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Earth Endowment Observatory — Corridor prototype",
  description:
    "Governed evidence prototype: controlled evidence product first, limited dashboard second. Synthetic data only. Not a court, score, or global atlas.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#11110F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-[#EFE8D8] text-stone-950">{children}</body>
    </html>
  );
}
