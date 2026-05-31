import type { CorridorProfile, EvidenceClaim, ReleaseReadinessResult } from "./types";

const REQUIRED_CLAIM_FIELDS: Array<keyof EvidenceClaim> = [
  "id", "claimText", "claimType", "confidenceLabel", "evidenceLayer", "granularity",
  "legalPosture", "disclosureTier", "sourceTitle", "sourceLocator", "sourceDate",
  "retrievalDate", "licenseOrUseBasis", "method", "confidenceExplanation", "staleAfter",
  "reviewStatus", "correctionPath", "rightOfReplyStatus",
];

const UNSAFE_PHRASES = [
  "proves origin",
  "certifies stewardship",
  "global ranking",
  "blockchain creates trust",
  "ai decides",
];

export function validateEvidenceClaim(claim: EvidenceClaim): string[] {
  const issues: string[] = [];

  for (const field of REQUIRED_CLAIM_FIELDS) {
    const value = claim[field];
    if (value === undefined || value === null || String(value).trim() === "") {
      issues.push(`Missing required claim field: ${field}`);
    }
  }

  const lowerText = claim.claimText.toLowerCase();
  for (const phrase of UNSAFE_PHRASES) {
    if (lowerText.includes(phrase)) issues.push(`Unsafe phrase detected: "${phrase}"`);
  }

  if (claim.disclosureTier === "suppressed" && claim.reviewStatus === "published") {
    issues.push("Suppressed claims cannot have published review status.");
  }

  if (
    ["required", "requested", "unresolved"].includes(claim.rightOfReplyStatus) &&
    claim.reviewStatus === "published"
  ) {
    issues.push("Claim cannot be published while right-of-reply remains unresolved.");
  }

  if (claim.legalPosture === "requires legal review" && claim.reviewStatus === "published") {
    issues.push("Claim requiring legal review cannot be published before legal review is complete.");
  }

  return issues;
}

export function assessReleaseReadiness(profile: CorridorProfile): ReleaseReadinessResult {
  const blockers: string[] = [];
  const warnings: string[] = [];
  const passed: string[] = [];

  if (!profile.claims.length) blockers.push("No evidence claims are attached to the corridor profile.");
  else passed.push("Corridor has evidence claims.");

  for (const claim of profile.claims) {
    blockers.push(...validateEvidenceClaim(claim).map((issue) => `${claim.id}: ${issue}`));

    if (claim.reviewStatus === "draft") warnings.push(`${claim.id}: claim is still in draft status.`);
    if (claim.confidenceLabel === "unknown" || claim.confidenceLabel === "outdated") {
      warnings.push(`${claim.id}: confidence label requires attention before release.`);
    }
    if (claim.disclosureTier === "verified access" || claim.disclosureTier === "community-governed") {
      warnings.push(`${claim.id}: public page should show metadata or limitation language only.`);
    }
  }

  if (profile.claims.every((claim) => claim.correctionPath)) passed.push("Every claim has a correction path.");
  else blockers.push("At least one claim is missing a correction path.");

  if (profile.claims.every((claim) => claim.disclosureTier)) passed.push("Every claim has a disclosure tier.");
  if (profile.claims.every((claim) => claim.staleAfter)) passed.push("Every claim has a stale-after date.");

  return { ready: blockers.length === 0, blockers, warnings, passed };
}
