"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import EeoSiteHeader from "@/components/eeo/EeoSiteHeader";

export default function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/review") || pathname.startsWith("/workspace");
  if (hideChrome) return <>{children}</>;
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <EeoSiteHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
