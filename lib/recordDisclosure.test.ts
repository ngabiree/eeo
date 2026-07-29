import { describe, expect, it } from "vitest";

import { claims } from "@/data/claims";
import { copperCobaltCorridorPilotSkeleton } from "@/data/corridorDossier";
import { corridorNodes } from "@/data/corridorNodes";
import { entities } from "@/data/entities";
import { evidenceItems } from "@/data/evidence";
import { humanCapabilityProfile } from "@/data/humanCapabilityProfile";
import { releaseManifest } from "@/data/releaseManifest";
import { copperCobaltPilotSourceMap } from "@/data/sourceMap";
import { sources } from "@/data/sources";
import {
  getClaimPublicRecordStatus,
  getDefaultPublicRecordStatus,
} from "@/lib/recordDisclosure";

describe("record disclosure", () => {
  it("keeps synthetic and illustrative records under review", () => {
    expect(getDefaultPublicRecordStatus("synthetic")).toBe("under_review");
    expect(getDefaultPublicRecordStatus("illustrative")).toBe("under_review");
  });

  it("exposes released and restricted modes directly", () => {
    expect(getDefaultPublicRecordStatus("released")).toBe("released");
    expect(getDefaultPublicRecordStatus("restricted")).toBe("restricted");
  });

  it("does not present an illustrative manifest entry as released", () => {
    expect(
      getClaimPublicRecordStatus({
        governanceStatus: "stable",
        includedInRelease: true,
        recordMode: "illustrative",
      }),
    ).toBe("under_review");
  });

  it("prioritizes correction governance states", () => {
    expect(
      getClaimPublicRecordStatus({
        governanceStatus: "challenged",
        includedInRelease: true,
        recordMode: "released",
      }),
    ).toBe("challenged");
  });

  it("keeps active governance review ahead of a release marker", () => {
    expect(
      getClaimPublicRecordStatus({
        governanceStatus: "under_review",
        includedInRelease: true,
        recordMode: "released",
      }),
    ).toBe("under_review");
  });

  it("assigns a disclosure mode to every public record family", () => {
    const publicRecords = [
      ...claims,
      ...evidenceItems,
      ...sources,
      ...entities,
      releaseManifest,
      copperCobaltCorridorPilotSkeleton,
      ...copperCobaltCorridorPilotSkeleton.sections,
      ...corridorNodes,
      ...copperCobaltPilotSourceMap,
      humanCapabilityProfile,
      ...humanCapabilityProfile.capabilityIndicators,
      ...humanCapabilityProfile.bioculturalRelations,
      ...humanCapabilityProfile.liveEvidenceBoundaries,
    ];

    expect(publicRecords.length).toBeGreaterThan(0);
    expect(publicRecords.every((record) => Boolean(record.recordMode))).toBe(true);
  });
});
