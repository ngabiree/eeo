"use client";

import { usePathname } from "next/navigation";

import { EeoFooter } from "@/components/EeoFooter";

/** Hides public institutional footer on restricted internal surfaces (header is hidden in PublicChrome for the same paths). */
export default function ConditionalEeoFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/review") || pathname.startsWith("/workspace")) return null;
  return <EeoFooter />;
}
