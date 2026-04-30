"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import EeoSiteHeader from "@/components/eeo/EeoSiteHeader";

export default function PublicChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/review") || pathname.startsWith("/workspace");
  if (hideChrome)
    return (
      <div
        id="main-content"
        tabIndex={-1}
        className="outline-none flex min-h-0 w-full min-w-0 flex-1 flex-col [&:focus-visible]:ring-2 [&:focus-visible]:ring-[color:var(--eeo-primary)] [&:focus-visible]:ring-offset-2"
      >
        {children}
      </div>
    );
  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
      <EeoSiteHeader />
      <div id="main-content" tabIndex={-1} className="outline-none flex min-h-0 w-full min-w-0 flex-1 flex-col [&:focus-visible]:ring-2 [&:focus-visible]:ring-[color:var(--eeo-primary)] [&:focus-visible]:ring-offset-2">
        {children}
      </div>
    </div>
  );
}
