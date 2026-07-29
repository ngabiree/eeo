import EvidenceLoopPanel from "@/components/eeo/EvidenceLoopPanel";
import PilotHubRouteList from "@/components/eeo/PilotHubRouteList";
import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotOverviewPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">Corridor overview</h1>
        <p className="leading-7 text-[color:var(--eeo-text)]">
          This public-interest corridor record walks a governance-first publication chain: stewarded sources through
          evidence and claims into review, release, and corrections. It is a limited corridor profile and evidence
          dossier — not a global atlas, supply-chain assurance platform, marketing comparison surface, or legal tribunal. EEO makes
          no legal finding.
        </p>
        <EvidenceLoopPanel />
        <PilotHubRouteList />
      </div>
    </main>
  );
}
