"use client";

import { useState } from "react";

type Gap = {
  competitor_name: string;
  missing_addons: string[];
  price_advantage_notes?: string;
};

type Props = {
  value: Gap[];
  onChange: (v: Gap[]) => void;
  onBack: () => void;
  onNext: () => void;
};

export default function CompetitorStep({
  value,
  onChange,
  onBack,
  onNext,
}: Props) {
  const [name, setName] = useState("");
  const [missing, setMissing] = useState("");
  const [notes, setNotes] = useState("");

  const gaps = value ?? [];

  function add() {
    const competitor_name = name.trim();
    if (!competitor_name) return;
    const missing_addons = missing
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onChange([
      ...gaps,
      {
        competitor_name,
        missing_addons,
        price_advantage_notes: notes.trim() || undefined,
      },
    ]);
    setName("");
    setMissing("");
    setNotes("");
  }

  function remove(i: number) {
    onChange(gaps.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <h2 className="text-lg font-extrabold">Competitor gaps</h2>
      <p className="mt-1 text-sm text-slate-300">
        Add competitor bundle gaps to help differentiation.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-xs font-semibold text-slate-300">
            Competitor name
          </div>
          <input
            className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., CompetitorX"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-300">
            Missing add-ons (comma separated)
          </div>
          <input
            className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="Engine Protect, Water Damage"
            value={missing}
            onChange={(e) => setMissing(e.target.value)}
          />
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-300">
            Price advantage notes
          </div>
          <input
            className="mt-2 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., cheaper base premium"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={add}
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-bold hover:border-slate-600"
        >
          + Add competitor
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {gaps.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-300">
            No competitor gaps added (optional).
          </div>
        ) : (
          gaps.map((g, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-extrabold">
                    {g.competitor_name}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(g.missing_addons ?? []).map((a) => (
                      <span
                        key={a}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  {g.price_advantage_notes ? (
                    <div className="mt-3 text-xs text-slate-300">
                      <span className="font-semibold text-slate-200">
                        Notes:
                      </span>{" "}
                      {g.price_advantage_notes}
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold hover:border-slate-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:border-slate-600"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-950 hover:bg-slate-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
