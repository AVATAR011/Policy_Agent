"use client";

type Props = {
  step: number;
  setStep: (n: number) => void;
};

const steps = ["Portfolio", "Strategy", "Market", "Product"];

export default function Stepper({ step, setStep }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((label, idx) => {
        const active = idx === step;
        const done = idx < step;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setStep(idx)}
            className={[
              "group flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition",
              done
                ? "border-emerald-800 bg-emerald-950/30 text-emerald-200"
                : active
                  ? "border-slate-600 bg-slate-900 text-white"
                  : "border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700",
            ].join(" ")}
          >
            <span
              className={[
                "grid h-6 w-6 place-items-center rounded-lg border text-xs font-bold",
                done
                  ? "border-emerald-700 bg-emerald-900/40 text-emerald-200"
                  : active
                    ? "border-slate-500 bg-slate-800 text-white"
                    : "border-slate-800 bg-slate-950 text-slate-300 group-hover:border-slate-700",
              ].join(" ")}
            >
              {idx + 1}
            </span>
            <span className="font-semibold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
