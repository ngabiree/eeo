# Visualization evidence contract

EEO does not choose a chart from data shape alone. A visual contract records the
reader question, measurement semantics, datum-level provenance, confidence and
claim type, disclosure posture, limitations, and reproducibility versions before
the renderer is considered.

```text
Evidence ledger
  -> approved analytical query
  -> metric semantic resolver
  -> future governed visual-type resolver (deferred)
  -> visual contract compiler
  -> semantic, evidence, statistical, inference, disclosure, and accessibility lint
  -> VALID_FOR_REVIEW | DOWNGRADED_TO_TABLE | DOWNGRADED_TO_DIAGRAM | AGGREGATED | RESTRICTED | BLOCKED | INSUFFICIENT_EVIDENCE
```

The contract and linter are in `src/eeo/visualization/`. A future governed
visual-type resolver is deferred. This prototype has no quantitative chart
renderer, Sankey, or public network explorer to activate. The existing corridor
system view is a static inquiry diagram, not an evidentiary relationship graph;
it must remain labelled as such until it is backed by a compiled visual contract.

## Non-negotiable checks

- Every datum has one or more evidence references, its own confidence label,
  claim type, display state, and disclosure tier.
- Percentages/shares name a denominator; rates name numerator and denominator;
  incompatible units cannot share an axis.
- Missing values are preserved or explicitly marked unavailable, never converted
  to zero. Derived values need a documented transformation method and may cite a
  derivation reference.
- Reported trade does not become a weighted Sankey or physical chain-of-custody.
  A Sankey is permitted only for verified physical movement with compatible,
  additive, sufficiently covered flows and known losses treatment. Otherwise use
  an unweighted flow diagram.
- Public maps containing sensitive coordinates are restricted. The effective
  disclosure tier is the most restrictive underlying claim or geometry; a visual
  may become more restricted, never less restrictive. This initial contract does
  not provide an exception mechanism; any future exception would require an
  explicit exposure-review record.
- Networks are only for structural-connection questions. Public views above 25
  meaningful nodes are downgraded to a table, filtered subgraph, or search.
- Modeled, inferred, alleged, disputed, confidential, and withdrawn evidence
  cannot be displayed as observed or official.

The linter is a release guard, not evidence validation itself. A passing visual
contract does not establish source quality, legal adequacy, physical custody,
causation, or durable public benefit. `VALID_FOR_REVIEW` means only that the
contract passed these automated checks; it never authorizes publication.
