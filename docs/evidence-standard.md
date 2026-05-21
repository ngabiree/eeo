# Evidence Standard

## Core principle

Every public claim must state: what is claimed · what evidence supports or limits it · confidence and legal posture · what it does not prove · what would revise it · review status · correction path.

Evidence is not automatically proof. Its role must be named.

---

## Claim requirements (`types/eeo.ts: Claim`)

Each public claim must carry:

| Field | Required values |
|---|---|
| `claimType` | `descriptive` · `relationship` · `risk_flag` · `gap` · `method_limit` · `public_benefit_question` |
| `legalPosture` | `factual_observation` · `methodological_limit` · `risk_indicator` · `analytical_inference` · `normative_concern` · `not_a_legal_finding` |
| `confidence` | `high` · `medium` · `low` · `insufficient` · `disputed` |
| `exposureRisk` | `low` · `medium` · `high` · `restricted` · `do_not_publish` |
| `publicationDecision` | `publish` · `publish_aggregated` · `publish_with_redactions` · `withhold` · `do_not_collect` |
| `reviewStatus` | `draft` → `method_review` → `legal_review` → `exposure_review` → `right_of_reply_pending` → `approved_for_release` |
| `rightOfReplyStatus` | `not_required` · `not_requested` · `requested` · `received` · `declined` · `overdue` |
| `whatThisDoesNotProve` | At least one item — explicit non-proofs |
| `whatWouldReviseThisClaim` | At least one item — revision conditions |
| `evidenceLinks` | At least one — each with an `EvidenceRole` |

---

## Evidence roles (`EvidenceRole`)

| Role | Meaning |
|---|---|
| `supports` | Evidence strengthens the claim |
| `limits` | Evidence constrains scope or precision |
| `contradicts` | Evidence points against the claim |
| `contextualizes` | Evidence provides background without supporting or contradicting |
| `motivates_review` | Evidence suggests the claim needs further scrutiny |

A claim backed only by `contextualizes` links is flagged as context-only, not supported (`lib/evidenceUtils.ts: isContextualOnly`).

---

## Four publication layers

These layers must be kept strictly separate in all public text:

| Layer | Allowed phrasings |
|---|---|
| **Factual** | "Public records state…" · "The cited source reports…" · "The official disclosure lists…" |
| **Analytical** | "Available data suggest…" · "This estimate is derived from…" · "This relationship is inferred from…" |
| **Normative** | "This raises a public-benefit question because…" · "This indicates an accountability gap…" |
| **Legal** | "EEO makes no legal finding." · "The cited authority found…" · "The legal status is disputed." |

---

## Publication posture

Publish only what has passed method and exposure checks, with explicit caveats and known limitations.

`lib/publicationRules.ts: canClaimBeApprovedForRelease()` enforces:
- `reviewStatus === "approved_for_release"` **and**
- `publicationDecision === "publish"` or `"publish_aggregated"` **and**
- `exposureRisk` not `"high"` or `"do_not_publish"`

Release gate checks (`lib/releaseGate.ts`) further enforce evidence completeness, source limitations, access governance, right-of-reply, map safety, and open corrections before a claim is eligible for a release manifest.

---

## Safer language guardrails

Do not say:
- "Company X violated…" — unless an authoritative legal source has found that.
- "This route proves origin…" — unless chain-of-custody evidence supports it.
- "This mine caused…" — where only proximity or correlation exists.
- "This community consented…" — unless authority and applicable protocol support it.

Prefer:
- "Available public records indicate…"
- "The evidence is insufficient to determine…"
- "This is a risk factor, not a legal finding."
- "Reported trade data does not prove physical traceability."
- "Spatial proximity does not establish causation without additional evidence."

Full checklist: `docs/language-safety.md`
