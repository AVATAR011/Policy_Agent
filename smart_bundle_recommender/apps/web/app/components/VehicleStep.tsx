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

export default function VehicleStep({ value, onChange, onNext }: Props) {
  const v = value ?? {};

  function set(k: string, val: any) {
    onChange({ ...v, [k]: val });
  }

  return (
    <div>
      <h2 className="text-lg font-extrabold">Vehicle details</h2>
      <p className="mt-1 text-sm text-slate-300">
        Capture vehicle attributes for eligibility + bundle fit.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Field label="Type">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.type ?? "car"}
            onChange={(e) => set("type", e.target.value)}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
          </select>
        </Field>

        <Field label="Brand">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., Hyundai"
            value={v.brand ?? ""}
            onChange={(e) => set("brand", e.target.value)}
          />
        </Field>

        <Field label="Model">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            placeholder="e.g., i20"
            value={v.model ?? ""}
            onChange={(e) => set("model", e.target.value)}
          />
        </Field>

        <Field label="Fuel Type">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.fuel_type ?? "petrol"}
            onChange={(e) => set("fuel_type", e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="ev">EV</option>
            <option value="hybrid">Hybrid</option>
            <option value="other">Other</option>
          </select>
        </Field>

        <Field label="CC">
          <input
            type="number"
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.cc ?? 1197}
            onChange={(e) => set("cc", Number(e.target.value))}
          />
        </Field>

        <Field label="Vehicle age (years)">
          <input
            type="number"
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.vehicle_age_years ?? 2}
            onChange={(e) => set("vehicle_age_years", Number(e.target.value))}
          />
        </Field>

        <Field label="IDV Band">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.idv_band ?? "medium"}
            onChange={(e) => set("idv_band", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </Field>

        <Field label="City">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.city ?? "Chennai"}
            onChange={(e) => set("city", e.target.value)}
          />
        </Field>

        <Field label="State">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.state ?? "Tamil Nadu"}
            onChange={(e) => set("state", e.target.value)}
          />
        </Field>

        <Field label="Pincode (6 digits)">
          <input
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.pincode ?? "600001"}
            onChange={(e) => set("pincode", e.target.value)}
          />
        </Field>

        <Field label="Ownership">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.ownership ?? "1st"}
            onChange={(e) => set("ownership", e.target.value)}
          >
            <option value="1st">1st Owner</option>
            <option value="2nd">2nd Owner</option>
          </select>
        </Field>

        <Field label="Usage">
          <select
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.usage ?? "private"}
            onChange={(e) => set("usage", e.target.value)}
          >
            <option value="private">Private</option>
            <option value="commercial">Commercial</option>
          </select>
        </Field>

        <Field label="Annual KM">
          <input
            type="number"
            className="w-full rounded-xl bg-slate-950 px-3 py-2 text-sm ring-1 ring-slate-800"
            value={v.annual_km ?? 12000}
            onChange={(e) => set("annual_km", Number(e.target.value))}
          />
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
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
