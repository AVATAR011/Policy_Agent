"use client";

type Props = {
  value: { risk: any; telematics: any; constraints: any };
  onChange: (v: { risk: any; telematics: any; constraints: any }) => void;
  onBack: () => void;
  onNext: () => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-300">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function TagInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const v = value ?? [];
  return (
    <div>
      <div className="text-xs font-semibold text-slate-300">{label}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {v.map((t, idx) => (
          <button
            type="button"
            key={t + idx}
            onClick={() => onChange(v.filter((_, i) => i !== idx))}
            className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-200 hover:border-slate-600"
            title="Click to remove"
          >
            {t} ✕
          </button>
        ))}
      </div>
      <input
        className="mt-3 w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
        placeholder={placeholder ?? "Type and press Enter"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const val = (e.currentTarget.value || "").trim();
            if (!val) return;
            if (!v.includes(val)) onChange([...v, val]);
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="mt-2 text-xs text-slate-400">
        Press Enter to add. Click a tag to remove.
      </div>
    </div>
  );
}

export default function RiskStep({ value, onChange, onBack, onNext }: Props) {
  const risk = value.risk ?? {};
  const tel = value.telematics ?? {};
  const c = value.constraints ?? {
    budget_band: "medium",
    must_have_addons: [],
    excluded_addons: [],
  };

  const setRisk = (k: string, v: any) =>
    onChange({ ...value, risk: { ...risk, [k]: v } });
  const setTel = (k: string, v: any) =>
    onChange({ ...value, telematics: { ...tel, [k]: v } });
  const setC = (k: string, v: any) =>
    onChange({ ...value, constraints: { ...c, [k]: v } });

  return (
    <div>
      <h2 className="text-lg font-extrabold">Driver/Risk & Constraints</h2>
      <p className="mt-1 text-sm text-slate-300">
        Claims + behavior + pricing constraints drive add-on fit and adverse
        selection control.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-sm font-extrabold">Customer Risk Summary</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Claim count (last 3 years)">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={risk.claim_count_3y ?? 0}
                onChange={(e) =>
                  setRisk("claim_count_3y", Number(e.target.value))
                }
              />
            </Field>
            <Field label="NCB %">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={risk.ncb_percent ?? 20}
                onChange={(e) => setRisk("ncb_percent", Number(e.target.value))}
              />
            </Field>
            <Field label="Violations (last 12 months)">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={risk.violations_count_12m ?? 0}
                onChange={(e) =>
                  setRisk("violations_count_12m", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Last claim (months ago)">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={risk.last_claim_months_ago ?? 999}
                onChange={(e) =>
                  setRisk("last_claim_months_ago", Number(e.target.value))
                }
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Claim Types (select)">
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "own_damage",
                  "theft",
                  "third_party",
                  "water",
                  "engine",
                  "fire",
                  "other",
                ].map((t) => {
                  const arr: string[] = risk.claim_types ?? [];
                  const on = arr.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() =>
                        setRisk(
                          "claim_types",
                          on ? arr.filter((x) => x !== t) : [...arr, t],
                        )
                      }
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        on
                          ? "border-emerald-700 bg-emerald-900/30 text-emerald-200"
                          : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-sm font-extrabold">Telematics Summary</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Harsh braking score (0 best)">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={tel.harsh_braking_score ?? 40}
                onChange={(e) =>
                  setTel("harsh_braking_score", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Overspeed score (0 best)">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={tel.overspeed_score ?? 55}
                onChange={(e) =>
                  setTel("overspeed_score", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Night driving %">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={tel.night_driving_pct ?? 10}
                onChange={(e) =>
                  setTel("night_driving_pct", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Highway %">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={tel.highway_pct ?? 45}
                onChange={(e) => setTel("highway_pct", Number(e.target.value))}
              />
            </Field>
            <Field label="Avg daily km">
              <input
                type="number"
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={tel.avg_daily_km ?? 22}
                onChange={(e) => setTel("avg_daily_km", Number(e.target.value))}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 lg:col-span-2">
          <div className="text-sm font-extrabold">Constraints</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Field label="Budget band">
              <select
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={c.budget_band ?? "medium"}
                onChange={(e) => setC("budget_band", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
            <Field label="Preferred deductible">
              <select
                className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm ring-1 ring-slate-800"
                value={c.preferred_deductible_band ?? "medium"}
                onChange={(e) =>
                  setC("preferred_deductible_band", e.target.value)
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TagInput
              label="Must-have add-ons"
              value={c.must_have_addons ?? []}
              onChange={(arr) => setC("must_have_addons", arr)}
              placeholder="e.g., Roadside Assistance"
            />
            <TagInput
              label="Excluded add-ons"
              value={c.excluded_addons ?? []}
              onChange={(arr) => setC("excluded_addons", arr)}
              placeholder="e.g., Engine Protect"
            />
          </div>
        </div>
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
