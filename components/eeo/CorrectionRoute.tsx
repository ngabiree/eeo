"use client";

import { useState } from "react";

import type { CorrectionCategory } from "@/lib/correctionsSchema";
import { CORRECTION_CATEGORIES } from "@/lib/correctionsSchema";

export default function CorrectionRoute() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    category: CorrectionCategory;
    claimId: string;
    claimReference: string;
    details: string;
  }>({
    name: "",
    email: "",
    category: CORRECTION_CATEGORIES[0],
    claimId: "",
    claimReference: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = Boolean(form.name.trim() && form.email.trim() && form.details.trim());

  if (submitted) {
    return (
      <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Correction route</h2>
        <p className="mt-3 text-stone-700">Your request has been logged for triage and review.</p>
        {receiptId ? (
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-stone-500">receipt: {receiptId}</p>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setReceiptId(null);
            setError(null);
          }}
          className="mt-5 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700"
        >
          Submit another request
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-stone-950">Correction route</h2>
      <p className="text-sm text-stone-600">
        Affected parties, researchers, agencies, companies, workers, communities, and public users may request a factual correction,
        submit counterevidence, provide right-of-reply material, request harm-risk restriction, or challenge a methodological interpretation.
      </p>

      <input
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        placeholder="Name or institution *"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
      />
      <input
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        placeholder="Contact email *"
        type="email"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <select
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        value={form.category}
        onChange={(e) =>
          setForm((f) => ({ ...f, category: e.target.value as CorrectionCategory }))
        }
      >
        {CORRECTION_CATEGORIES.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <input
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        placeholder="Claim ID (optional)"
        value={form.claimId}
        onChange={(e) => setForm((f) => ({ ...f, claimId: e.target.value }))}
      />
      <input
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        placeholder="Claim, page, or evidence item this concerns (optional)"
        value={form.claimReference}
        onChange={(e) => setForm((f) => ({ ...f, claimReference: e.target.value }))}
      />
      <textarea
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        rows={6}
        placeholder="Describe the correction request... *"
        value={form.details}
        onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
      />
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</p>
      ) : null}
      <button
        type="button"
        disabled={!valid || submitting}
        onClick={async () => {
          if (!valid) return;
          setSubmitting(true);
          setError(null);
          try {
            const res = await fetch("/api/corrections", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            });
            if (!res.ok) {
              const payload = (await res.json()) as { error?: string };
              throw new Error(payload.error ?? "Submission failed.");
            }
            const payload = (await res.json()) as { id: string };
            setReceiptId(payload.id);
            setSubmitted(true);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error while submitting.");
          } finally {
            setSubmitting(false);
          }
        }}
        className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Submitting..." : "Submit for triage"}
      </button>
    </section>
  );
}
