"use client";

type Props = {
  value: any;
  onChange: (v: any) => void;
  onNext: () => void;
};

function Field({ label, children }: any) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-300">{label}</div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

export default function StrategyStep({ value, onChange, onNext }: Props) {
  const v = value ?? {};
  const set = (k: string, val: any) => onChange({ ...v, [k]: val });

  return (
    <div>
      <h2 className="text-lg font-extrabold">Business Strategy</h2>
      <p className="mt-1 text-sm text-slate-300">
        Define product objectives and risk posture.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Field label="Primary Goal">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.primary_goal ?? "growth"}
            onChange={(e) => set("primary_goal", e.target.value)}
          >
            <option value="growth">Growth</option>
            <option value="profit">Profit</option>
            <option value="retention">Retention</option>
          </select>
        </Field>

        <Field label="Risk Appetite">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.risk_appetite ?? "medium"}
            onChange={(e) => set("risk_appetite", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </Field>

        <Field label="Target Loss Ratio (%)">
          <input
            type="number"
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.target_loss_ratio ?? 65}
            onChange={(e) => set("target_loss_ratio", Number(e.target.value))}
          />
        </Field>

        <Field label="Innovation Focus">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.innovation_focus ?? "fast_claims"}
            onChange={(e) => set("innovation_focus", e.target.value)}
          >
            <option value="fast_claims">Fast Claims</option>
            <option value="digital_onboarding">Digital Onboarding</option>
            <option value="addon_bundling">Addon Bundling</option>
          </select>
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onNext} className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black">
          Next →
        </button>
      </div>
    </div>
  );
}
