# Brand Asset Guidelines

This directory contains canonical EEO logo outputs and reproducibility artifacts.

## Canonical files

- `EEO_logo_fixed_transparent_master.png` - transparent master (RGBA), 2048x2048.
- `EEO_logo_fixed_cream_master.png` - cream background master (RGB), 2048x2048.
- `EEO_logo_fixed_QA_preview.png` - lightweight preview asset, 1024x1024.
- `EEO_logo_repro_manifest.json` - deterministic parameters + checksums.
- `EEO_logo_rebuild_script.py` - reproducible generation pipeline for masters.

## Brand doctrine

For public voice, design posture, language boundaries, and symbolic discipline, see [`docs/brand-identity.md`](../../docs/brand-identity.md).

## Usage policy

- Treat `*_master.png` files as source-of-truth outputs.
- Generate resized delivery assets from masters; do not edit masters by hand.
- Keep all brand changes in dedicated PRs when possible.
- Do not commit unapproved or partner-restricted brand files here.

## Validation

Run:

```bash
pnpm run check:brand-assets
```

This verifies:

- required brand files exist;
- SHA256 checksums match `EEO_logo_repro_manifest.json`;
- expected PNG dimensions are preserved.
