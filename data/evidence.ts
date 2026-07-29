import type { EvidenceItem } from "@/types/eeo";

export const evidenceItems: EvidenceItem[] = [
  // ── Processing / trade (existing) ────────────────────────────────────────
  {
    id: "EVID-USGS-CO-001",
    recordMode: "illustrative",
    sourceId: "SRC-USGS-CO-001",
    title: "Cobalt production and reserve context",
    summary:
      "USGS mineral data provides production and reserve context for cobalt, but does not identify the custody chain of specific downstream products.",
    evidenceClass: "official",
    confidenceContribution: "high",
    limitations: [
      "Does not provide mine-to-product traceability.",
      "Does not identify specific downstream products.",
      "Does not establish company responsibility for individual shipments.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-001", role: "contextualizes", note: "Provides production and reserve context." },
      { claimId: "CLAIM-DRC-CO-004", role: "limits", note: "National aggregates cannot disaggregate ASM contribution precisely." },
    ],
  },
  {
    id: "EVID-UNCOMTRADE-CO-001",
    recordMode: "illustrative",
    sourceId: "SRC-UNCOMTRADE-CO-001",
    title: "Reported cobalt-related trade flows",
    summary:
      "UN Comtrade shows reported trade flows between countries, but trade data alone does not establish chain-of-custody from mine to final product.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "Trade data may be aggregated across multiple origin points.",
      "Reported flows may not reflect actual origin after processing or re-export.",
      "Does not prove product-level traceability.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-001", role: "limits", note: "Clarifies what trade data cannot prove." },
    ],
  },

  // ── Endowment ─────────────────────────────────────────────────────────────
  {
    id: "EVID-USGS-CO-002",
    recordMode: "illustrative",
    sourceId: "SRC-USGS-CO-001",
    title: "DRC cobalt reserve concentration per USGS Mineral Commodity Summaries",
    summary:
      "USGS Mineral Commodity Summaries consistently identify the Democratic Republic of Congo as holding the largest known cobalt reserves of any single country, accounting for the substantial majority of global identified reserves.",
    evidenceClass: "official",
    confidenceContribution: "high",
    limitations: [
      "Reserve estimates are subject to methodological revision as geological knowledge, pricing, and extraction technology evolve.",
      "USGS estimates reflect reported figures; they do not independently verify host-country data.",
      "Reserve concentration does not indicate rate of extraction, environmental condition, or social conditions at specific sites.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-002", role: "supports", note: "Primary source for DRC reserve concentration claim." },
    ],
  },

  // ── Jurisdiction / governance ──────────────────────────────────────────────
  {
    id: "EVID-EITI-DRC-001",
    recordMode: "illustrative",
    sourceId: "SRC-EITI-DRC-001",
    title: "EITI DRC country disclosures: governance and transparency context",
    summary:
      "EITI DRC reports document the governance framework applicable to extractive activity, including the national mining code, provincial and local authority roles, and transparency requirements. Reports also reveal gaps in disclosure coverage and completeness.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "EITI coverage is limited to member-company disclosures; non-participating operators are not captured.",
      "Reporting lags mean recent governance changes may not yet appear in published reports.",
      "Publication of governance framework does not imply effective enforcement at specific sites.",
      "EEO cannot verify DRC government figures independently.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-003", role: "supports", note: "Documents the overlapping governance structure applicable to cobalt extraction." },
    ],
  },

  // ── Extraction / production ────────────────────────────────────────────────
  {
    id: "EVID-USGS-ASM-001",
    recordMode: "illustrative",
    sourceId: "SRC-USGS-CO-001",
    title: "USGS notes on artisanal and small-scale mining contribution to DRC cobalt production",
    summary:
      "USGS Mineral Commodity Summaries note the role of artisanal and small-scale mining (ASM) in DRC cobalt production and indicate that ASM contributes materially to total output. However, reliable disaggregated figures are not consistently available, and estimates vary significantly across sources.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "USGS national aggregates cannot precisely disaggregate formal and artisanal production shares.",
      "ASM production is often unregistered and therefore systematically under-measured in official statistics.",
      "Estimates from different reporting cycles and sources diverge considerably.",
      "This evidence does not identify specific ASM sites, operators, or individuals.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-004", role: "supports", note: "Provides official context for the ASM production-share claim." },
    ],
  },

  // ── Labor risk ───────────────────────────────────────────────────────────
  {
    id: "EVID-ILOSTAT-DRC-001",
    recordMode: "illustrative",
    sourceId: "SRC-ILOSTAT-001",
    title: "ILOSTAT mining sector labour indicators for DRC context",
    summary:
      "ILOSTAT provides national and sector-level labour indicators for the DRC including employment, injury rates, and working conditions in the mining sector. Formal economy data likely understates risks in artisanal and informal mining.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "Formal economy bias: artisanal and informal workers are systematically undercounted.",
      "National aggregates cannot identify conditions at specific mines or concessions.",
      "Indicator coverage and timeliness vary by country and reporting year.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-005", role: "contextualizes", note: "Provides sector-level labour context; does not document specific incidents." },
    ],
  },
  {
    id: "EVID-UNICEF-ASM-001",
    recordMode: "illustrative",
    sourceId: "SRC-UNICEF-ASM-001",
    title: "UNICEF documentation of child labour in artisanal cobalt mining",
    summary:
      "UNICEF research documents the presence of children working in artisanal cobalt mining in the DRC, identifying this as a serious child rights concern. The research does not name specific operators and is based on field investigation and survey data.",
    evidenceClass: "reported",
    confidenceContribution: "medium",
    limitations: [
      "Research reflects conditions at time of fieldwork; conditions may have changed.",
      "Does not identify specific companies, concession holders, or downstream buyers responsible for specific incidents.",
      "Findings are not legal determinations of liability.",
      "Scale and trends in child labour in ASM are difficult to measure systematically.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-005", role: "supports", note: "Substantiates documented child labour risk in DRC artisanal cobalt mining." },
    ],
  },
  {
    id: "EVID-AMNESTY-CO-001",
    recordMode: "illustrative",
    sourceId: "SRC-AMNESTY-COBALT-001",
    title: "Amnesty International research on labour conditions in DRC artisanal cobalt mining",
    summary:
      "Amnesty International research documents labour conditions and human rights concerns associated with artisanal cobalt mining in the DRC, including hazardous working conditions, inadequate safety protections, and links to supply chains of major technology and battery manufacturers.",
    evidenceClass: "reported",
    confidenceContribution: "medium",
    limitations: [
      "Findings are allegations and documented concerns, not adjudicated legal findings.",
      "EEO uses this source for normative and risk-flag context only — not as proof of legal liability.",
      "Conditions documented at time of research may differ from current state.",
      "Supply chain linkage claims in this source rely on company disclosures, which may be incomplete.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-005", role: "supports", note: "Provides documented risk context for labour conditions in DRC cobalt ASM." },
    ],
  },

  // ── Public revenue ────────────────────────────────────────────────────────
  {
    id: "EVID-EITI-DRC-002",
    recordMode: "illustrative",
    sourceId: "SRC-EITI-DRC-001",
    title: "EITI DRC reported royalty and tax collection figures and gaps",
    summary:
      "EITI DRC reporting documents royalties, taxes, and other payments from extractive companies to the government. Reconciliation exercises in published reports have identified discrepancies between amounts reported by companies and amounts recorded by government agencies.",
    evidenceClass: "official",
    confidenceContribution: "medium",
    limitations: [
      "EITI reconciliation covers only participating companies; non-EITI operators are excluded.",
      "Disclosure gaps do not necessarily indicate evasion; they may reflect administrative inconsistencies.",
      "Revenue figures do not indicate how funds were spent or whether communities benefited.",
      "Reporting cycles create lags between extraction activity and disclosed figures.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-006", role: "supports", note: "Documents royalty and revenue reporting framework and reconciliation gaps." },
    ],
  },

  // ── Evidence gap ─────────────────────────────────────────────────────────
  {
    id: "EVID-OPENOWNERSHIP-DRC-001",
    recordMode: "illustrative",
    sourceId: "SRC-OPENOWNERSHIP-001",
    title: "Open Ownership assessment of beneficial ownership disclosure in DRC extractive sector",
    summary:
      "Open Ownership data and research indicate that beneficial ownership disclosure requirements for DRC extractive sector companies remain incomplete, with many concession holders not publicly disclosing ultimate beneficial owners in a machine-readable or publicly accessible format.",
    evidenceClass: "reported",
    confidenceContribution: "medium",
    limitations: [
      "Register coverage is incomplete globally; absence from data does not confirm non-compliance.",
      "Beneficial ownership registers vary in quality, verification, and access by jurisdiction.",
      "This evidence identifies a transparency gap, not a legal finding of improper ownership.",
      "Register data may lag actual ownership changes.",
    ],
    exposureRisk: "low",
    publicationDecision: "publish",
    claimLinks: [
      { claimId: "CLAIM-DRC-CO-007", role: "supports", note: "Provides transparency-gap evidence on beneficial ownership disclosure." },
    ],
  },
];
