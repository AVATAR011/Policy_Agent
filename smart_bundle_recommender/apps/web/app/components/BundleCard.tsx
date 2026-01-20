"use client";

type Props = {
  title: string;
  badge: string;
  bundle: any;
  onExplain: () => void;
  onCompareToggle: () => void;
  compareOn: boolean;
  onFeedback: (rating: number) => void;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

export default function BundleCard({
  title,
  badge,
  bundle,
  onExplain,
  onCompareToggle,
  compareOn,
  onFeedback,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-slate-400">{title}</div>
          <div className="mt-1 text-lg font-extrabold">
            {bundle.bundle_name}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Pill>{badge}</Pill>
            <Pill>Base: {bundle.base_policy_type}</Pill>
            <Pill>Premium: {bundle.premium_estimate_band}</Pill>
            <Pill>Risk: {Math.round(bundle.risk_score)}</Pill>
          </div>
        </div>

        <button
          type="button"
          onClick={onCompareToggle}
          className={[
            "rounded-xl border px-3 py-2 text-xs font-bold transition",
            compareOn
              ? "border-emerald-700 bg-emerald-900/20 text-emerald-200"
              : "border-slate-700 bg-slate-950 text-slate-200 hover:border-slate-600",
          ].join(" ")}
        >
          {compareOn ? "✓ Comparing" : "Compare"}
        </button>
      </div>

      <div className="mt-5">
        <div className="text-xs font-bold text-slate-400">Add-ons</div>
        <ul className="mt-2 space-y-2">
          {(bundle.addons ?? []).map((a: any, idx: number) => (
            <li
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/40 px-3 py-2"
            >
              <div className="text-sm font-bold">{a.name}</div>
              <div className="mt-1 text-xs text-slate-300 line-clamp-2">
                {a.rationale}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
        <div className="text-xs font-bold text-slate-400">Key strategy</div>
        <div className="mt-2 text-sm text-slate-200">
          {bundle.deductible_strategy}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExplain}
          className="rounded-xl bg-white px-4 py-2 text-sm font-extrabold text-slate-950 hover:bg-slate-200"
        >
          Explain →
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Rate</span>
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onFeedback(r)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs font-bold hover:border-slate-600"
              title={`Rate ${r}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
