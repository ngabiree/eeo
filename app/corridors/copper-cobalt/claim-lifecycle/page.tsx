import ClaimLifecyclePanel from "@/components/eeo/ClaimLifecyclePanel";
import PilotRouteNav from "@/components/eeo/PilotRouteNav";

export default function PilotClaimLifecyclePage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--eeo-ink)]">
            Claim lifecycle (mock data)
          </h1>
          <p className="max-w-3xl leading-relaxed text-[color:var(--eeo-text)]">
            A single-thread illustration of the governed publication chain: how stewarded sources and evidence rows connect to
            one reviewed public claim, then to the release bundle and public surfaces. All identifiers and statuses are
            synthetic examples.
          </p>
        </header>
        <ClaimLifecyclePanel />
      </div>
    </main>
  );
}
