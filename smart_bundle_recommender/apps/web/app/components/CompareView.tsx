"use client";

type Props = {
  selected: { key: string; title: string; bundle: any }[];
  onRemove: (key: string) => void;
};

export default function CompareView({ selected, onRemove }: Props) {
  if (!selected.length) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-extrabold">Compare bundles</div>
          <div className="mt-1 text-xs text-slate-300">
            Side-by-side quick comparison of premiums, risk, and core add-ons.
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {selected.map((s) => (
          <div
            key={s.key}
            className="rounded-2xl border border-slate-800 bg-slate-900/30 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-slate-400">
                  {s.title}
                </div>
                <div className="mt-1 text-sm font-extrabold">
                  {s.bundle.bundle_name}
                </div>
                <div className="mt-2 text-xs text-slate-300">
                  Base:{" "}
                  <span className="font-semibold text-slate-100">
                    {s.bundle.base_policy_type}
                  </span>
                  {" • "}
                  Premium:{" "}
                  <span className="font-semibold text-slate-100">
                    {s.bundle.premium_estimate_band}
                  </span>
                  {" • "}
                  Risk:{" "}
                  <span className="font-semibold text-slate-100">
                    {Math.round(s.bundle.risk_score)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemove(s.key)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold hover:border-slate-600"
              >
                Remove
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs font-bold text-slate-400">
                Top add-ons
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(s.bundle.addons ?? [])
                  .slice(0, 5)
                  .map((a: any, idx: number) => (
                    <span
                      key={idx}
                      className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-200"
                    >
                      {a.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
