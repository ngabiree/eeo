import PilotRouteNav from "@/components/eeo/PilotRouteNav";
import CorrectionRoute from "@/components/eeo/CorrectionRoute";

export default function PilotCorrectionsPage() {
  return (
    <main className="min-h-screen bg-[#EFE8D8] text-stone-950">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10 md:px-6">
        <PilotRouteNav />
        <CorrectionRoute />
      </div>
    </main>
  );
}
