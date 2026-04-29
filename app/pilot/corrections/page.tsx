import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import CorrectionRoute from "@/components/eeo/CorrectionRoute";

export default function PilotCorrectionsPage() {
  return (
    <main className="relative flex min-h-full flex-1 flex-col bg-transparent text-[color:var(--eeo-text)]">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <CorrectionRoute />
      </div>
    </main>
  );
}
