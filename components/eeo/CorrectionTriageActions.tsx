"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { applyCorrectionTriageUpdate } from "@/app/review/actions";
import type { CorrectionTriageStatus } from "@/lib/correctionsStore";

const STATUSES: { value: CorrectionTriageStatus; label: string }[] = [
  { value: "queued", label: "Queued" },
  { value: "in_review", label: "In review" },
  { value: "resolved", label: "Resolved" },
];

export default function CorrectionTriageActions({
  submissionId,
  currentStatus,
}: {
  submissionId: string;
  currentStatus: CorrectionTriageStatus;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<CorrectionTriageStatus>(currentStatus);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);
  const [error, setError] = useState<string | null>(null);

  async function apply(next: CorrectionTriageStatus) {
    if (next === status) return;
    setPending(true);
    setError(null);
    try {
      const result = await applyCorrectionTriageUpdate(submissionId, next);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatus(next);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-3 border-t border-stone-200 pt-3">
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
      {error ? <p className="mt-2 text-xs text-red-700">{error}</p> : null}
    </div>
  );
}
