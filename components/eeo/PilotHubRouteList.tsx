import Link from "next/link";

import { PILOT_HUB_ROUTES } from "@/lib/pilotHubRoutes";

/**
 * Flat index of every corridor prototype page under the pilot segment — complements compact header shortcuts.
 */
export default function PilotHubRouteList() {
  return (
    <section
      aria-labelledby="pilot-hub-routes-heading"
      className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] p-6 shadow-sm backdrop-blur-sm"
    >
      <h2 id="pilot-hub-routes-heading" className="text-lg font-semibold text-[color:var(--eeo-ink)]">
        All corridor prototype pages
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
        The site header repeats a subset of shortcuts; this list is generated from **`lib/pilotHubRoutes.ts`** alongside
        **`docs/mvp-evidence-loop.md`**.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {PILOT_HUB_ROUTES.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm font-medium text-[color:var(--eeo-primary)] underline underline-offset-2 hover:text-[color:var(--eeo-primary-dark)]"
            >
              {label}
            </Link>
            <span className="mt-0.5 block font-mono text-[10px] text-[color:var(--eeo-muted)]">{href}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
