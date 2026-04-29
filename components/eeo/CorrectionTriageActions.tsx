"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { patchCorrectionTriage } from "@/app/review/actions";
import type { CorrectionTriageStatus } from "@/lib/correctionsStore";

const STATUSES: { value: CorrectionTriageStatus; label: string }[] = [
  { value: "queued", label: "Queued" },
  { value: "in_review", label: "In review" },
  { value: "resolved", label: "Resolved" },
];

export default function CorrectionTriageActions({
  submissionId,
  currentStatus,
  initialNote,
}: {
  submissionId: string;
  currentStatus: CorrectionTriageStatus;
  initialNote?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<CorrectionTriageStatus>(currentStatus);
  const [note, setNote] = useState(initialNote ?? "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  useEffect(() => {
    setNote(initialNote ?? "");
  }, [initialNote]);

  async function apply(next: CorrectionTriageStatus) {
    if (next === status) return;
    setPending(true);
    setError(null);
    try {
      const trimmed = note.trim();
      const result = await patchCorrectionTriage(submissionId, {
        triageStatus: next,
        triageNote: trimmed.length > 0 ? trimmed : null,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatus(next);
      if (trimmed.length === 0) {
        setNote("");
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  async function saveNote() {
    setPending(true);
    setError(null);
    try {
      const trimmed = note.trim();
      const result = await patchCorrectionTriage(submissionId, {
        triageNote: trimmed.length > 0 ? trimmed : null,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-3 space-y-3 border-t border-stone-200 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Triage</span>
        {STATUSES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            disabled={pending}
            onClick={() => void apply(value)}
            className={
              status === value
                ? "rounded-full bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white"
                : "rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-stone-500 disabled:opacity-50"
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor={`triage-note-${submissionId}`} className="text-xs font-semibold text-stone-600">
          Reviewer note{" "}
          <span className="font-normal text-stone-400">(internal prototype; not visible to submitters)</span>
        </label>
        <textarea
          id={`triage-note-${submissionId}`}
          rows={3}
          value={note}
          disabled={pending}
          placeholder="Brief context for reviewers in this workspace session…"
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full resize-y rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-stone-900 disabled:opacity-60"
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => void saveNote()}
          className="mt-2 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-semibold text-stone-800 hover:border-stone-900 disabled:opacity-50"
        >
          Save note only
        </button>
      </div>

      {error ? <p className="text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
