import type { DisclosureTier } from "./types";

export const EEO_PUBLIC_IDENTITY =
  "The Earth Endowment Observatory is a federated public-interest observatory that makes visible how natural endowments become economic value, who governs and transforms them, who captures benefit, who bears risk, what evidence supports each claim, and where stewardship, rights, and public accountability are strong, weak, uncertain, or hidden.";

export const EEO_DOCTRINE =
  "Universal in analytical concern; plural in governance; careful in disclosure; humble in authority; fierce in public truth.";

export const EEO_MVP_FOCUS = [
  "one commodity",
  "one geography",
  "one complete endowment-to-economy chain",
  "synthetic demonstration data until rights, review, and release gates are satisfied",
] as const;

export const EEO_REASONING_LAYERS = [
  "endowments",
  "governance",
  "ownership",
  "labor",
  "trade",
  "ecology",
  "public revenue",
  "value capture",
] as const;

export const EEO_GOVERNANCE_SAFEGUARDS = [
  "indigenous data governance and community-governed disclosure where rights-holder authority applies",
  "sovereignty respect and jurisdiction-specific legal review before publication claims harden",
  "tiered disclosure that can aggregate, restrict, community-govern, or suppress sensitive material",
  "exposure ethics and right-of-reply review before high-impact public claims are published",
] as const;

export const EEO_MVP_SCOPE = [
  "one safe corridor pilot",
  "one flagship evidence dossier",
  "one limited corridor dashboard",
  "one evidence ledger",
  "one internal review workspace",
  "one right-of-reply and correction workflow",
  "one signed release manifest",
] as const;

export const EEO_RED_LINES = [
  "no global atlas in the MVP",
  "no global resource registry",
  "no country or company rankings",
  "no certification seals",
  "no blockchain trust claims",
  "no AI decision authority",
  "no high-impact named allegations without right-of-reply",
  "no exact sensitive geospatial downloads",
  "no claim that trade data proves physical chain-of-custody",
  "no claim that public revenue proves durable public benefit",
  "no claim that spatial proximity proves causation",
] as const;

export const DISCLOSURE_TIER_HELP: Record<DisclosureTier, string> = {
  open: "Low foreseeable harm; lawful; clear public-interest value.",
  "contextual public": "Public with caveat, uncertainty label, method note, or right-of-reply status.",
  aggregated: "Raw form may create risk; publish only at safer aggregation.",
  "verified access": "Too sensitive for public release; limited to approved users.",
  "community-governed": "Subject to rights-holder, indigenous, local, or community authority.",
  suppressed: "Do not publish; likely harm or rights violation.",
};
