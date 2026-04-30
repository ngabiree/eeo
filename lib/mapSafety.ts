import type { MapSafetyClassification } from "@/types/mapSafety";

/**
 * Public map rendering gate.
 * Open/generalized/aggregated layers can be rendered publicly.
 * Blurred/restricted/do_not_publish require additional controls and are blocked by default.
 */
export function canRenderPublicMapLayer(classification: MapSafetyClassification): boolean {
  return classification === "open" || classification === "generalized" || classification === "aggregated";
}

export function assertPublicMapLayerAllowed(classification: MapSafetyClassification): void {
  if (!canRenderPublicMapLayer(classification)) {
    throw new Error("Unsafe map layer cannot be rendered publicly.");
  }
}
