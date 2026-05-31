import type { DisclosureTier } from "./types";

export const EEO_PUBLIC_IDENTITY =
  "The Earth Endowment Observatory makes visible how natural endowments become economic value, who governs and transforms them, who captures benefit, who bears risk, what evidence supports each claim, and where stewardship, rights, and public accountability are strong, weak, uncertain, or hidden.";

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
