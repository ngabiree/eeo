"use client";

import { useState } from "react";

const categories = [
  "Factual correction",
  "Source update",
  "Right of reply",
  "Harm-risk restriction request",
  "Indigenous or community-sensitive review",
  "Defamation or legal concern",
  "Methodological dispute",
  "Data freshness concern",
  "Withdrawal request",
] as const;

export default function CorrectionRoute() {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    category: (typeof categories)[number];
    claimId: string;
    details: string;
  }>({
    name: "",
    email: "",
    category: categories[0],
    claimId: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const valid = Boolean(form.name.trim() && form.email.trim() && form.details.trim());

  if (submitted) {
    return (
      <section className="rounded-3xl border border-stone-200 bg-white/80 p-6 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-stone-950">Correction route</h2>
        <p className="mt-3 text-stone-700">Your request has been logged for triage and review.</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
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
        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as (typeof categories)[number] }))}
      >
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <input
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        placeholder="Claim ID (optional)"
        value={form.claimId}
        onChange={(e) => setForm((f) => ({ ...f, claimId: e.target.value }))}
      />
      <textarea
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-stone-900"
        rows={6}
        placeholder="Describe the correction request... *"
        value={form.details}
        onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
      />
      <button
        type="button"
        disabled={!valid}
        onClick={() => setSubmitted(true)}
        className="rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit for triage
      </button>
    </section>
  );
}
