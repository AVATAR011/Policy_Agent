"use client";

type Props = {
  value: any;
  onChange: (v: any) => void;
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

export default function PortfolioStep({ value, onChange, onNext }: Props) {
  const v = value ?? {};

  function set(k: string, val: any) {
    onChange({ ...v, [k]: val });
  }

  return (
    <div>
      <h2 className="text-lg font-extrabold">Portfolio Context</h2>
      <p className="mt-1 text-sm text-slate-300">
        Define insurer portfolio positioning and gaps.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Field label="Insurer Name">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., DemoInsure"
            value={v.insurer_name ?? ""}
            onChange={(e) => set("insurer_name", e.target.value)}
          />
        </Field>

        <Field label="Portfolio Gap">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., No fast-claims digital motor product"
            value={v.portfolio_gap ?? ""}
            onChange={(e) => set("portfolio_gap", e.target.value)}
          />
        </Field>

        <Field label="Distribution Channel">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.distribution_channel ?? "digital"}
            onChange={(e) => set("distribution_channel", e.target.value)}
          >
            <option value="digital">Digital</option>
            <option value="agent">Agent</option>
            <option value="branch">Branch</option>
            <option value="partner">Partner</option>
          </select>
        </Field>

        <Field label="Geography Focus">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.geography_focus ?? "metro"}
            onChange={(e) => set("geography_focus", e.target.value)}
          >
            <option value="metro">Metro</option>
            <option value="tier1">Tier 1</option>
            <option value="pan_india">Pan India</option>
          </select>
        </Field>

        <Field label="Brand Positioning">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.brand_positioning ?? "value_plus"}
            onChange={(e) => set("brand_positioning", e.target.value)}
          >
            <option value="budget">Budget</option>
            <option value="value_plus">Value Plus</option>
            <option value="premium">Premium</option>
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
