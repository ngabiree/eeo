import { claims } from "@/data/claims";
import { releaseManifest } from "@/data/releaseManifest";

export default function ReleaseManifestPanel() {
  const rightOfReplySummary = claims.map((c) => `${c.id}: ${c.rightOfReplyStatus}`).join("; ");

  return (
    <section className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-950">Release manifest</h2>
      <div className="grid gap-2 text-sm text-stone-700 md:grid-cols-2">
        <p><strong>Corridor:</strong> {releaseManifest.corridor}</p>
        <p><strong>Methodology version:</strong> {releaseManifest.methodologyVersion}</p>
        <p><strong>Claims included:</strong> {releaseManifest.includedClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims withheld:</strong> {releaseManifest.withheldClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims restricted:</strong> None in this public release.</p>
        <p><strong>Unresolved disputes:</strong> {releaseManifest.unresolvedDisputes.join(", ") || "None"}</p>
        <p className="md:col-span-2"><strong>Exposure review result:</strong> {releaseManifest.exposureReviewSummary}</p>
        <p className="md:col-span-2"><strong>Right-of-reply status:</strong> {rightOfReplySummary}</p>
        <p className="md:col-span-2"><strong>Known limitations:</strong> {releaseManifest.publicLimitations.join(" ")}</p>
        <p className="md:col-span-2">
          <strong>Prototype review status:</strong> This release demonstrates the review structure that a production dossier should pass through.
          Formal institutional review, named reviewer signoff, and partner validation remain required before authoritative publication.
        </p>
        <p><strong>Prototype screens shown:</strong> {releaseManifest.approvedBy.join(", ")}</p>
        <p><strong>Release date:</strong> {releaseManifest.releaseDate ?? "Not published"}</p>
        <p><strong>Correction route:</strong> /corrections</p>
      </div>
    </section>
  );
}
