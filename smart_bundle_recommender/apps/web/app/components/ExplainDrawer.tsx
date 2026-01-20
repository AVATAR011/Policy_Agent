"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  bundle: any; // product blueprint
};

export default function ExplainDrawer({ open, onClose, bundle }: Props) {
  if (!open || !bundle) return null;

  const product = bundle;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="h-full w-full max-w-xl overflow-y-auto bg-slate-950 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold">
            {product.product_name} — Strategic Blueprint
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-700 px-3 py-1 text-sm hover:bg-slate-800"
          >
            Close ✕
          </button>
        </div>

        {/* Strategic Rationale */}
        <Section title="Strategic Rationale">
          {product.explanation_insurer}
        </Section>

        {/* Portfolio Fit */}
        <Section title="Portfolio Fit">
          {product.portfolio_fit}
        </Section>

        {/* Growth Strategy */}
        <Section title="Growth Strategy">
          {product.growth_strategy}
        </Section>

        {/* Risk Trade-offs */}
        <Section title="Risk Trade-offs">
          <TagList items={product.risk_tradeoffs} />
        </Section>

        {/* Regulatory */}
        <Section title="Regulatory & Compliance">
          <TagList items={product.regulatory_notes} />
        </Section>
      </div>
    </div>
  );
}

/* ---------------- UI helpers ---------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h4 className="mb-2 text-sm font-bold text-slate-200">{title}</h4>
      <div className="text-sm leading-relaxed text-slate-300">{children}</div>
    </div>
  );
}

function TagList({ items = [] }: { items?: string[] }) {
  if (!items?.length) {
    return <div className="text-slate-500">None</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x, i) => (
        <span
          key={i}
          className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs"
        >
          {x}
        </span>
      ))}
    </div>
  );
}
