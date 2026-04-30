export interface CorridorNodeData {
  id:
    | "endowment"
    | "jurisdiction"
    | "concession_permit"
    | "operator"
    | "ownership_control"
    | "extraction_production"
    | "processing_trade"
    | "labor_risk"
    | "ecological_signal"
    | "public_revenue"
    | "public_benefit"
    | "evidence_gap";
  label: string;
  known: string;
  unknown: string;
  evidence: string;
  risk: string;
}

const DEFAULT_DETAIL = {
  known: "No public record released yet.",
  unknown: "Pending reviewed source integration.",
  evidence: "Evidence not yet released.",
  risk: "Not available in this pilot release.",
};

export const corridorNodes: CorridorNodeData[] = [
  { id: "endowment", label: "Endowment", ...DEFAULT_DETAIL },
  { id: "jurisdiction", label: "Jurisdiction", ...DEFAULT_DETAIL },
  { id: "concession_permit", label: "Concession / Permit", ...DEFAULT_DETAIL },
  { id: "operator", label: "Operator", ...DEFAULT_DETAIL },
  { id: "ownership_control", label: "Ownership / Control", ...DEFAULT_DETAIL },
  { id: "extraction_production", label: "Extraction / Production", ...DEFAULT_DETAIL },
  {
    id: "processing_trade",
    label: "Processing / Trade",
    known: "Public production and trade datasets can show cobalt flow context at national and corridor scales.",
    unknown: "Product-level chain-of-custody linkage from mine to downstream goods.",
    evidence: "EVID-USGS-CO-001 and EVID-UNCOMTRADE-CO-001.",
    risk: "Overclaiming traceability beyond available evidence.",
  },
  { id: "labor_risk", label: "Labor Risk", ...DEFAULT_DETAIL },
  { id: "ecological_signal", label: "Ecological Signal", ...DEFAULT_DETAIL },
  { id: "public_revenue", label: "Public Revenue", ...DEFAULT_DETAIL },
  { id: "public_benefit", label: "Public Benefit Question", ...DEFAULT_DETAIL },
  { id: "evidence_gap", label: "Evidence Gap", ...DEFAULT_DETAIL },
];
