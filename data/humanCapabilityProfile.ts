import type { HumanCapabilityProfile } from "@/types/humanLayer";

export const humanCapabilityProfile: HumanCapabilityProfile = {
  id: "HCP-CM-0001",
  recordMode: "synthetic",
  title: "Human Capability, Labor, Stewardship, and Relationship Layer",
  corridor: "Critical minerals corridor",
  doctrine:
    "Human beings are not Earth endowments. They are rights-bearing, knowledge-bearing, laboring, creative, governing, ecological, cultural, and intergenerational agents within endowment systems.",
  publicSummary:
    "This corridor profile shows how EEO can describe human capability, labor, ingenuity, ecological relationship, harm exposure, public benefit, and stewardship without reducing people to resources or publishing sensitive community data.",
  operatingPrinciple:
    "EEO should be live where evidence is governed, and restrained where evidence is exposed.",
  redLines: [
    "No classification of human beings as natural resources.",
    "No individual talent scores.",
    "No public labor-availability maps that enable exploitation.",
    "No race, ethnicity, caste, tribe, religion, disability, or migration-status proxy for talent.",
    "No publication of sensitive community knowledge without authority and consent.",
    "No public mapping of vulnerable groups at actionable resolution.",
    "No use of capability data for coercive recruitment, surveillance, policing, union avoidance, displacement, or targeting.",
    "No reduction of human flourishing to wages, GDP, productivity, or fiscal revenue.",
  ],
  capabilityIndicators: [
    {
      id: "CAP-001",
      recordMode: "synthetic",
      family: "technical",
      label: "Technical capability",
      valueStatement:
        "Synthetic placeholder for local technical skills relevant to extraction, repair, monitoring, logistics, and processing.",
      geography: "corridor-level",
      temporalScope: "demonstration period",
      sourceSummary: "Synthetic demonstration data.",
      confidence: "insufficient",
      exposureRisk: "low",
      publicationDecision: "publish",
      limitation:
        "Does not identify individuals, employers, communities, ethnicity, migration status, or exact labor locations.",
    },
    {
      id: "CAP-002",
      recordMode: "synthetic",
      family: "ecological_knowledge",
      label: "Ecological knowledge",
      valueStatement:
        "Synthetic placeholder for seasonal, land, water, and place-based knowledge that may sustain or warn about endowment condition.",
      geography: "aggregated corridor context",
      temporalScope: "demonstration period",
      sourceSummary: "Synthetic demonstration data.",
      confidence: "insufficient",
      exposureRisk: "restricted",
      publicationDecision: "publish_aggregated",
      limitation:
        "Actual indigenous, sacred, community, or place-based knowledge would require authority, consent, and disclosure review.",
    },
    {
      id: "CAP-003",
      recordMode: "synthetic",
      family: "civic",
      label: "Worker and community voice",
      valueStatement:
        "Synthetic placeholder for whether workers and nearby communities have safe channels to contest harm, correct claims, and influence outcomes.",
      geography: "corridor-level",
      temporalScope: "demonstration period",
      sourceSummary: "Synthetic demonstration data.",
      confidence: "insufficient",
      exposureRisk: "medium",
      publicationDecision: "publish_aggregated",
      limitation:
        "Does not name worker groups, community representatives, grievance submitters, or vulnerable actors.",
    },
  ],
  bioculturalRelations: [
    {
      id: "REL-001",
      recordMode: "synthetic",
      relationType: "labor",
      publicLabel: "Labor relation",
      publicSummary:
        "People transform endowments through extraction, transport, processing, monitoring, repair, administration, and care work.",
      disclosureRule: "contextual_public",
      authorityOrConsentStatus: "Not applicable to this illustrative record.",
      limitation:
        "Labor claims require wage, safety, informality, coercion-risk, and worker-voice evidence before public use.",
    },
    {
      id: "REL-002",
      recordMode: "synthetic",
      relationType: "stewardship",
      publicLabel: "Stewardship relation",
      publicSummary:
        "People may maintain, restore, monitor, or govern endowments through scientific, customary, public, cooperative, or community practice.",
      disclosureRule: "community_governed",
      authorityOrConsentStatus:
        "Real community-governed knowledge requires consent and authority-specific protocol.",
      limitation:
        "Do not publish sensitive stewardship practices, sacred relations, or exact places without approval.",
    },
    {
      id: "REL-003",
      recordMode: "synthetic",
      relationType: "harm_exposure",
      publicLabel: "Harm exposure relation",
      publicSummary:
        "People may bear pollution, injury, displacement, livelihood disruption, retaliation risk, cultural loss, or future liability.",
      disclosureRule: "public_aggregated",
      authorityOrConsentStatus: "Requires exposure review for real data.",
      limitation:
        "No actionable public mapping of vulnerable people, households, settlements, grievance locations, or worker identities.",
    },
    {
      id: "REL-004",
      recordMode: "synthetic",
      relationType: "future_inheritance",
      publicLabel: "Future inheritance relation",
      publicSummary:
        "Children and future generations inherit either strengthened capability, restored ecosystems, depleted endowments, or unresolved liabilities.",
      disclosureRule: "contextual_public",
      authorityOrConsentStatus: "Not applicable to this illustrative record.",
      limitation:
        "Future-generation claims should remain normative and analytical, not legal adjudications.",
    },
  ],
  liveEvidenceBoundaries: [
    {
      id: "LIVE-001",
      recordMode: "synthetic",
      workType: "Raw evidence files",
      liveSupported: true,
      belongsIn: "Private evidence-vault bucket with audit logging",
      publicByDefault: false,
      rule: "Preserve raw source material in governed storage; publish only reviewed claims, citations, and approved excerpts.",
    },
    {
      id: "LIVE-002",
      recordMode: "synthetic",
      workType: "Restricted files and reviewer notes",
      liveSupported: true,
      belongsIn: "Restricted review workspace and private schema",
      publicByDefault: false,
      rule: "Support live review work without exposing pre-publication analysis, legal notes, or sensitive reviewer context.",
    },
    {
      id: "LIVE-003",
      recordMode: "synthetic",
      workType: "Sensitive geospatial data",
      liveSupported: true,
      belongsIn: "Restricted PostGIS layers and map-safety review workflow",
      publicByDefault: false,
      rule: "Use internally only when justified; public geography must be generalized, masked, aggregated, delayed, metadata-only, or withheld.",
    },
    {
      id: "LIVE-004",
      recordMode: "synthetic",
      workType: "Released public claims",
      liveSupported: true,
      belongsIn: "Public released views",
      publicByDefault: true,
      rule: "Expose only claims that pass source, license, method, disclosure, review, right-of-reply, and release checks.",
    },
  ],
  reviewStatus: "draft",
  lastUpdated: "2026-04-29",
};
