import Image from "next/image";
import Link from "next/link";

const EEO_LOGO_SRC = "/brand/eeo-logo-transparent.png";

const footerColumns = [
  {
    title: "Observatory",
    links: [
      { label: "Mission", href: "/observatory" },
      { label: "Governance", href: "/governance" },
      { label: "Stewardship", href: "/stewardship" },
      { label: "Safeguards", href: "/pilot/safeguards" },
    ],
  },
  {
    title: "Evidence",
    links: [
      { label: "Evidence Ledger", href: "/evidence-ledger" },
      { label: "Source Registry", href: "/source-registry" },
      { label: "Methods", href: "/pilot/methods-and-limits" },
      { label: "Corrections", href: "/pilot/corrections" },
    ],
  },
  {
    title: "First Corridor",
    links: [
      { label: "Critical Minerals Corridor", href: "/pilot" },
      { label: "Corridor Map", href: "/pilot/map" },
      { label: "Value Chain", href: "/pilot/value-chain" },
      { label: "Public Revenue", href: "/pilot/public-revenue" },
    ],
  },
  {
    title: "Accountability",
    links: [
      { label: "Disclosure Policy", href: "/disclosure-policy" },
      { label: "Correction Process", href: "/pilot/corrections" },
      { label: "Right of Reply", href: "/right-of-reply" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

const referenceSystems = [
  "UN Comtrade",
  "USGS",
  "EITI",
  "Open Ownership",
  "ResourceContracts",
  "Global Forest Watch",
  "ILOSTAT",
  "SEEA",
  "OECD Guidance",
] as const;

export default function EeoSiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#CFE3DA] bg-gradient-to-br from-[#EAF5F0] via-[#E3F2FB] to-[#DFF3E7] text-[#13424A]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#BFE3E2]/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#2E8B57]/15 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#F3E4B8]/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
        <div className="mb-10 rounded-2xl border border-[#CFE3DA] bg-white/55 px-5 py-4 text-sm font-semibold tracking-wide text-[#144E55] backdrop-blur">
          Public record · Stewardship · Accountability · Safeguards
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <div className="flex items-center gap-4">
              <Image src={EEO_LOGO_SRC} alt="" width={1254} height={1254} className="h-20 w-20 shrink-0 object-contain" />

              <div>
                <div className="font-serif text-2xl font-semibold leading-tight text-[#0F2F33]">Earth Endowment Observatory</div>
                <div className="mt-1 text-xs font-extrabold uppercase tracking-[0.16em] text-[#B88928]">From Earth to economy, made visible.</div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-[#4F6F75]">A public observatory for natural wealth, stewardship, and accountability.</p>

            <p className="mt-5 max-w-md rounded-2xl border border-[#CFE3DA] bg-white/55 p-4 text-xs leading-6 text-[#4F6F75] backdrop-blur">
              EEO content is informational and does not constitute legal, financial, investment, certification, or traceability advice.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-sm font-extrabold text-[#0F2F33]">{column.title}</h2>

                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm leading-6 text-[#4F6F75] transition hover:text-[#1F6F78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAF5F0]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <section aria-labelledby="reference-systems">
              <h2 id="reference-systems" className="text-sm font-extrabold text-[#0F2F33]">
                Reference Standards &amp; Data Systems
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {referenceSystems.map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-[#CFE3DA] bg-white/60 px-2.5 py-1 text-xs font-semibold text-[#144E55] backdrop-blur"
                  >
                    {name}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-xs leading-6 text-[#4F6F75]">Used for citation, interoperability, or methodological alignment — not endorsement.</p>
            </section>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#CFE3DA] bg-white/45 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-xs leading-6 text-[#4F6F75] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-6 md:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            <span className="text-[#13424A]">© 2026 Earth Endowment Observatory. All rights reserved.</span>
            <nav aria-label="Trust, privacy, and accessibility" className="flex flex-wrap gap-x-4 gap-y-2 font-medium">
              <Link href="/trust" className="text-[#144E55] underline-offset-2 transition hover:text-[#1F6F78] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78] rounded">
                Trust
              </Link>
              <Link href="/privacy" className="text-[#144E55] underline-offset-2 transition hover:text-[#1F6F78] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78] rounded">
                Privacy
              </Link>
              <Link href="/accessibility" className="text-[#144E55] underline-offset-2 transition hover:text-[#1F6F78] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78] rounded">
                Accessibility
              </Link>
            </nav>
          </div>

          <div className="max-w-prose font-semibold text-[#144E55] md:text-right">
            Make the chain visible. Keep the record accountable. Protect what exposure could harm.
          </div>
        </div>
      </div>
    </footer>
  );
}
