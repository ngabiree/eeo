#!/usr/bin/env node

const requiredFields = [
  "id", "claimText", "claimType", "confidenceLabel", "evidenceLayer", "granularity",
  "legalPosture", "disclosureTier", "sourceTitle", "sourceLocator", "sourceDate",
  "retrievalDate", "licenseOrUseBasis", "method", "confidenceExplanation", "staleAfter",
  "reviewStatus", "correctionPath", "rightOfReplyStatus",
];

export function validateClaim(claim) {
  const issues = [];
  for (const field of requiredFields) {
    if (!claim[field]) issues.push(`Missing required field: ${field}`);
  }
  if (claim.disclosureTier === "suppressed" && claim.reviewStatus === "published") {
    issues.push("Suppressed claim cannot be published.");
  }
  if (["required", "requested", "unresolved"].includes(claim.rightOfReplyStatus) && claim.reviewStatus === "published") {
    issues.push("Unresolved right-of-reply blocks publication.");
  }
  return issues;
}

console.log("EEO release-readiness check installed. Wire this to the real evidence-ledger export in Patch 02.");
