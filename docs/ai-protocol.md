# AI Assistant Protocol

## Scope

This document governs the use of AI assistants (including large language models, code assistants, and AI-aided summarization tools) in the Earth Endowment Observatory project.

---

## Acceptable uses

AI assistants may help with:

- schema drafts and SQL migration suggestions;
- TypeScript type drafting and Zod validator generation;
- test generation and test coverage suggestions;
- UI copy drafts for review by a human editor;
- code review suggestions and refactoring proposals;
- documentation drafts for human review and revision;
- summarizing public sources for internal review purposes;
- suggesting entity mapping candidates for human verification;
- drafting non-final methods notes for review;
- general software development tasks (debugging, tooling, build configuration).

---

## Prohibited uses

AI assistants must not:

- make final publication decisions for any claim, evidence object, or evidence dossier section;
- assign final confidence labels (`verified`, `official`, `modeled`, etc.) without human accountability;
- make final disclosure-tier decisions (Tier 0 through Tier 5);
- determine legal conclusions or assign legal posture to any claim;
- determine community consent or indigenous authority status;
- publish claims or release manifests;
- infer beneficial ownership as established fact without source-backed human review;
- classify sensitive data (geospatial coordinates, community reports, whistleblower material) for public release without human safeguards review;
- replace safeguards review, legal review, or methods review in the release workflow.

---

## Required public disclosure statement

EEO publicly states:

> "AI tools may assist with software development, data processing, summarization, and internal review. They do not make final publication, legal, confidence, or disclosure decisions. All public claims are governed by human review, source provenance, and institutional release controls."

---

## Rationale

Technology does not create legitimacy. AI assistants are capable tools for software and documentation work, but the institutional value of EEO depends on traceable human judgment at every publication decision point. An AI-assigned confidence label that is wrong, an AI-determined disclosure tier that exposes a vulnerable community, or an AI-generated claim published without review could cause harm and destroy institutional credibility. The prohibition on AI authority over publication decisions is absolute and not subject to exception for speed or convenience.

---

## Audit and review

Any workflow that uses AI assistance in claim processing, evidence triage, or disclosure review must be documented with:

- what AI tool was used;
- what the AI produced;
- who reviewed and approved the AI output before it was incorporated.

This applies to both code paths and human editorial processes.
