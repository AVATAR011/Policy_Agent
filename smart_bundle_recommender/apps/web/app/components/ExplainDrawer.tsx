"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  bundle: any | null;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <div className="text-sm font-extrabold">{title}</div>
      <div className="mt-2 text-sm text-slate-200 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

export default function ExplainDrawer({ open, onClose, bundle }: Props) {
  if (!open || !bundle) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-slate-800 bg-slate-900 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400">
              Explain bundle
            </div>
            <div className="mt-1 text-xl font-extrabold">
              {bundle.bundle_name}
            </div>
            <div className="mt-2 text-sm text-slate-300">
              Base:{" "}
              <span className="font-semibold text-slate-100">
                {bundle.base_policy_type}
              </span>{" "}
              • Premium:{" "}
              <span className="font-semibold text-slate-100">
                {bundle.premium_estimate_band}
              </span>{" "}
              • Risk:{" "}
              <span className="font-semibold text-slate-100">
                {Math.round(bundle.risk_score)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-bold hover:border-slate-600"
          >
            Close ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Section title="Customer explanation">
            {bundle.explanation_customer}
          </Section>
          <Section title="Insurer explanation">
            {bundle.explanation_insurer}
          </Section>

          <Section title="Compliance notes">
            {(bundle.compliance_notes ?? [])
              .map((n: string, i: number) => `• ${n}`)
              .join("\n")}
          </Section>

          <Section title="Follow-up questions">
            {(bundle.follow_up_questions ?? []).length
              ? (bundle.follow_up_questions ?? [])
                  .map((q: string) => `• ${q}`)
                  .join("\n")
              : "None"}
          </Section>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <div className="text-sm font-extrabold">Add-on detail</div>
            <div className="mt-3 space-y-3">
              {(bundle.addons ?? []).map((a: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/30 p-4"
                >
                  <div className="text-sm font-bold">{a.name}</div>
                  <div className="mt-2 text-xs text-slate-300 whitespace-pre-wrap">
                    {a.rationale}
                  </div>
                  <div className="mt-3 text-xs text-slate-300">
                    <span className="font-bold text-slate-200">
                      Claim impact:
                    </span>{" "}
                    {a.expected_claim_impact} •{" "}
                    <span className="font-bold text-slate-200">
                      Pricing impact:
                    </span>{" "}
                    {a.pricing_impact}
                  </div>
                  <div className="mt-3 text-xs text-slate-300">
                    <span className="font-bold text-slate-200">
                      Underwriting rules:
                    </span>
                    <div className="mt-2 space-y-1">
                      {(a.underwriting_rules ?? []).map(
                        (r: string, i: number) => (
                          <div
                            key={i}
                            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2"
                          >
                            {r}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
