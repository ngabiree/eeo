import { claims } from "@/data/claims";
import { releaseManifest } from "@/data/releaseManifest";
import { getClaimCorrectionSummary } from "@/lib/claimUtils";
import { listCorrectionSubmissions } from "@/lib/correctionsStore";

export default function ReleaseManifestPanel() {
  const corrections = listCorrectionSubmissions();
  const summaries = claims.map((claim) => getClaimCorrectionSummary(claim.id, corrections));
  const challengedClaimIds = summaries
    .filter((summary) => summary.governanceStatus === "challenged" || summary.governanceStatus === "under_review")
    .map((summary) => summary.claimId);
  const correctedClaimIds = summaries
    .filter((summary) => summary.governanceStatus === "corrected")
    .map((summary) => summary.claimId);
  const restrictedClaimIds = summaries
    .filter((summary) => summary.governanceStatus === "restricted")
    .map((summary) => summary.claimId);
  const withdrawnClaimIds = summaries
    .filter((summary) => summary.governanceStatus === "withdrawn")
    .map((summary) => summary.claimId);
  const openCorrectionIds = corrections
    .filter((correction) => correction.triageStatus !== "resolved")
    .map((correction) => correction.id);
  const linkedCorrectionCount = corrections.filter((correction) => Boolean(correction.claimId)).length;
  const governanceSignalCount =
    challengedClaimIds.length + correctedClaimIds.length + restrictedClaimIds.length + withdrawnClaimIds.length;
  const lastCorrectionReviewAt = corrections
    .map((correction) => correction.triageUpdatedAt || correction.submittedAt)
    .sort((a, b) => b.localeCompare(a))[0];
  const rightOfReplySummary = claims.map((c) => `${c.id}: ${c.rightOfReplyStatus}`).join("; ");

  return (
    <section className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-950">Release manifest</h2>
      <div className="grid gap-2 text-sm text-stone-700 md:grid-cols-2">
        <p><strong>Corridor:</strong> {releaseManifest.corridor}</p>
        <p><strong>Methodology version:</strong> {releaseManifest.methodologyVersion}</p>
        <p><strong>Claims included:</strong> {releaseManifest.includedClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims withheld:</strong> {releaseManifest.withheldClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims challenged:</strong> {challengedClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims corrected:</strong> {correctedClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims restricted:</strong> {restrictedClaimIds.join(", ") || "None"}</p>
        <p><strong>Claims withdrawn:</strong> {withdrawnClaimIds.join(", ") || "None"}</p>
        <p><strong>Open correction items:</strong> {openCorrectionIds.join(", ") || "None"}</p>
        <p><strong>Last correction review date:</strong> {lastCorrectionReviewAt ? new Date(lastCorrectionReviewAt).toLocaleString() : "No correction activity yet"}</p>
        <p><strong>Unresolved disputes:</strong> {releaseManifest.unresolvedDisputes.join(", ") || "None"}</p>
        <p className="md:col-span-2"><strong>Exposure review result:</strong> {releaseManifest.exposureReviewSummary}</p>
        <p className="md:col-span-2"><strong>Right-of-reply status:</strong> {rightOfReplySummary}</p>
        <p className="md:col-span-2"><strong>Known limitations:</strong> {releaseManifest.publicLimitations.join(" ")}</p>
        <p className="md:col-span-2"><strong>Release governance note:</strong> This release manifest records publication status, known limitations, open correction items, and claim governance status. It does not adjudicate legal liability.</p>
        <p className="md:col-span-2">
          <strong>Correction/governance summary:</strong> {corrections.length} total correction submissions,{" "}
          {linkedCorrectionCount} linked to known claims, {openCorrectionIds.length} currently open, and{" "}
          {governanceSignalCount} claim governance signals recorded across challenged, corrected, restricted, and
          withdrawn states.
        </p>
        <p><strong>Approvals:</strong> {releaseManifest.approvedBy.join(", ")}</p>
        <p><strong>Release date:</strong> {releaseManifest.releaseDate ?? "Not published"}</p>
        <p><strong>Correction route:</strong> /pilot/corrections</p>
      </div>
    </section>
  );
}
