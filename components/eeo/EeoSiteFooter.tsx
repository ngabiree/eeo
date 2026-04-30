import Link from "next/link";

import EeoLogo from "@/components/eeo/EeoLogo";

const REFERENCE_TAGS = ["UN Comtrade", "USGS", "EITI", "Open Ownership", "ResourceContracts", "Global Forest Watch", "ILOSTAT", "SEEA", "OECD", "IPBES"];
const OBSERVATORY_LINKS = [
  { href: "/", label: "Mission" },
  { href: "/pilot/methods-and-limits", label: "Governance" },
  { href: "/pilot/safeguards", label: "Stewardship" },
  { href: "/pilot/safeguards", label: "Safeguards" },
] as const;
const EVIDENCE_LINKS = [
  { href: "/pilot/evidence-ledger", label: "Evidence Ledger" },
  { href: "/pilot/evidence-dossier", label: "Source Registry" },
  { href: "/pilot/methods-and-limits", label: "Methods" },
  { href: "/pilot/corrections", label: "Corrections" },
] as const;
const CORRIDOR_LINKS = [
  { href: "/pilot/corridor", label: "Critical Minerals Corridor" },
  { href: "/pilot/corridor", label: "Corridor Map" },
  { href: "/pilot/value-chain", label: "Value Chain" },
  { href: "/pilot/labor-ecology-revenue", label: "Public Revenue" },
] as const;

export default function EeoSiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--eeo-border)] bg-[color:var(--eeo-sky)]/45 px-4 py-10 text-[color:var(--eeo-text)] md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="flex max-w-xl items-start gap-4 lg:col-span-1">
            <EeoLogo decorative size="sm" />
            <div>
              <div className="font-serif text-lg font-semibold text-[color:var(--eeo-ink)]">
                Earth Endowment Observatory
              </div>
              <p className="mt-1 text-sm text-[color:var(--eeo-muted)]">From Earth to economy, made visible.</p>
              <p className="mt-2 max-w-prose leading-7">
                A public observatory for natural wealth, stewardship, and accountability.
              </p>
            </div>
          </div>
          <FooterLinkColumn title="Observatory" links={OBSERVATORY_LINKS} />
          <FooterLinkColumn title="Evidence" links={EVIDENCE_LINKS} />
          <FooterLinkColumn title="First Corridor" links={CORRIDOR_LINKS} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.78)] px-5 py-4 shadow-sm backdrop-blur">
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--eeo-muted)]">
              Reference Standards &amp; Data Systems
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--eeo-muted)]">
              Used for citation, interoperability, or methodological alignment — not endorsement.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {REFERENCE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--eeo-border)] bg-white/70 px-2.5 py-1 text-xs text-[color:var(--eeo-text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[color:var(--eeo-border)] bg-[rgba(255,255,255,0.85)] px-5 py-4 text-sm leading-6 text-[color:var(--eeo-muted)] shadow-sm backdrop-blur">
            EEO content is informational and does not constitute legal, financial, investment, certification, or traceability advice.
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--eeo-border)] pt-6 text-sm text-[color:var(--eeo-muted)] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4">
          <p className="max-w-prose leading-relaxed">
            Make the chain visible. Keep the record accountable. Protect what exposure could harm.
          </p>
          <Link href="/pilot/evidence-ledger" className="font-medium underline decoration-[color:var(--eeo-primary)] underline-offset-2 hover:text-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] rounded">
            Evidence Ledger
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--eeo-muted)]">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="text-[color:var(--eeo-text)] hover:text-[color:var(--eeo-primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--eeo-primary)] rounded"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
