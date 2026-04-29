"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { recordReleaseGovernanceReview } from "@/app/review/actions";

export default function ReviewGovernanceSignoff() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setPending(true);
    setError(null);
    try {
      const result = await recordReleaseGovernanceReview(note);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setNote("");
      router.refresh();
    } catch {
      setError("Unable to record release governance review right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <h3 className="text-sm font-semibold text-stone-900">Release governance sign-off</h3>
      <p className="mt-1 text-xs text-stone-600">
        Record an internal claim-governance review snapshot for release discipline. This is internal and does not
        adjudicate legal liability.
      </p>
      <textarea
        rows={2}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        disabled={pending}
        placeholder="Optional sign-off note for reviewers..."
        className="mt-2 w-full resize-y rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-900 disabled:opacity-60"
      />
      <button
        type="button"
        disabled={pending}
        onClick={() => void submit()}
        className="mt-2 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 hover:border-stone-900 disabled:opacity-50"
      >
        {pending ? "Recording..." : "Record governance sign-off"}
      </button>
      {error ? <p className="mt-2 text-xs text-red-700">{error}</p> : null}
    </section>
  );
}
