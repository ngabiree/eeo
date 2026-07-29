import type { Claim, ReleaseManifest } from "@/types/eeo";

export function getReleaseClaims(allClaims: Claim[], manifest: ReleaseManifest): Claim[] {
  const includedClaimIds = new Set(manifest.includedClaimIds);

  return allClaims.filter((claim) => includedClaimIds.has(claim.id));
}

export function getUnreleasedClaimCount(allClaims: Claim[], manifest: ReleaseManifest): number {
  return allClaims.length - getReleaseClaims(allClaims, manifest).length;
}
