import type {
  ClaimGovernanceStatus,
  PublicRecordStatus,
  RecordMode,
} from "@/types/eeo";

export function getDefaultPublicRecordStatus(recordMode: RecordMode): PublicRecordStatus {
  if (recordMode === "released") {
    return "released";
  }
  if (recordMode === "restricted") {
    return "restricted";
  }
  return "under_review";
}

export function getClaimPublicRecordStatus({
  governanceStatus,
  includedInRelease,
  recordMode,
}: {
  governanceStatus: ClaimGovernanceStatus;
  includedInRelease: boolean;
  recordMode: RecordMode;
}): PublicRecordStatus {
  if (governanceStatus === "challenged") {
    return "challenged";
  }
  if (governanceStatus === "corrected") {
    return "corrected";
  }
  if (governanceStatus === "withdrawn") {
    return "withdrawn";
  }
  if (governanceStatus === "restricted") {
    return "restricted";
  }
  if (governanceStatus === "under_review") {
    return "under_review";
  }
  if (includedInRelease && recordMode !== "synthetic" && recordMode !== "illustrative") {
    return "released";
  }
  return getDefaultPublicRecordStatus(recordMode);
}
