import type { CorridorLifecycleRecord } from "@/types/corridorDossier";

/**
 * Inert lifecycle posture for the copper-cobalt corridor dossier.
 *
 * This record does not authorize publication or alter public routes. It keeps
 * corridor phase separate from individual claim review and release decisions.
 */
export const copperCobaltCorridorLifecycle: CorridorLifecycleRecord = {
  corridorId: "CDR-CU-CO-PILOT-001",
  phase: "review",
  releaseManifestId: "REL-CC-001",
  gates: [
    {
      gate: "scope_authority",
      status: "in_progress",
      publicSummary:
        "The corridor boundary remains provisional and must not imply authority over states, communities, Indigenous peoples, firms, territories, or resources.",
      accountableRole: "Corridor steward",
    },
    {
      gate: "source_rights",
      status: "in_progress",
      publicSummary:
        "Source licensing, reuse basis, and host-first treatment remain under review for the full dossier.",
      accountableRole: "Evidence steward",
    },
    {
      gate: "evidence_provenance",
      status: "in_progress",
      publicSummary:
        "The bounded methodological claim has linked evidence, but broader corridor coverage remains incomplete.",
      accountableRole: "Evidence steward",
    },
    {
      gate: "method_review",
      status: "blocked",
      publicSummary:
        "Method review remains unresolved for extraction and public-revenue claims.",
      accountableRole: "Method reviewer",
    },
    {
      gate: "legal_posture_review",
      status: "in_progress",
      publicSummary:
        "Governance, ownership, and control language must remain non-adjudicatory and evidence-limited.",
      accountableRole: "Legal-posture reviewer",
    },
    {
      gate: "exposure_review",
      status: "blocked",
      publicSummary:
        "Exposure review remains unresolved for labour-risk material and any future actor-identifying narrative.",
      accountableRole: "Exposure reviewer",
    },
    {
      gate: "map_safety_review",
      status: "in_progress",
      publicSummary:
        "Public geography remains generalized; sensitive or high-risk location detail is not approved for release.",
      accountableRole: "Map-safety reviewer",
    },
    {
      gate: "right_of_reply",
      status: "in_progress",
      publicSummary:
        "Right-of-reply remains a required publication discipline for claims materially affecting identifiable actors.",
      accountableRole: "Reply process owner",
    },
    {
      gate: "correction_route",
      status: "satisfied",
      publicSummary:
        "A public correction pathway exists, subject to durable operational handling and governance review.",
      accountableRole: "Correction owner",
    },
    {
      gate: "manifest_completeness",
      status: "blocked",
      publicSummary:
        "The draft manifest does not yet contain an authorized disposition for every corridor claim.",
      accountableRole: "Release owner",
    },
    {
      gate: "release_authorization",
      status: "not_started",
      publicSummary:
        "No corridor-level release authorization has been granted.",
      accountableRole: "Release authority",
    },
  ],
  lastUpdated: "2026-07-29T22:54:00.000Z",
};

export function isCorridorPubliclyAuthorized(
  lifecycle: CorridorLifecycleRecord,
): boolean {
  return (
    lifecycle.phase === "public" &&
    lifecycle.gates.some(
      (gate) =>
        gate.gate === "release_authorization" && gate.status === "satisfied",
    )
  );
}
