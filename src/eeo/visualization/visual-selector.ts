import type { EEOVisualContract, VisualType } from "./visual-contract";

export interface VisualSelection {
  visualType: VisualType;
  rationale: string;
}

/**
 * A conservative intent resolver. It never selects from data shape alone: the
 * contract must first carry a question, metric semantics, evidence, and disclosure.
 */
export function selectVisual(contract: EEOVisualContract): VisualSelection {
  if (!contract.question.trim() || !contract.dataRefs.length) {
    return { visualType: "none", rationale: "A question and datum-level evidence are required." };
  }
  if (contract.audience === "public" && contract.disclosureTier !== "open" && contract.disclosureTier !== "contextual public") {
    return { visualType: "table", rationale: "Public disclosure posture requires a restrained fallback." };
  }
  if (contract.visualType === "network" && !contract.networkTopology?.answersStructuralConnectionQuestion) {
    return { visualType: "table", rationale: "Relationships alone do not justify a network graph." };
  }
  return { visualType: contract.visualType, rationale: "The authored contract remains subject to linting." };
}
