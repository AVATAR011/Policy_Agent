"use client";

import { useMemo, useState } from "react";
import BundleCard from "./BundleCard";
import ExplainDrawer from "./ExplainDrawer";
import CompareView from "./CompareView";

type Props = {
  payload: any;
  onBack: () => void;
};

export default function ResultsStep({ payload, onBack }: Props) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerBundle, setDrawerBundle] = useState<any | null>(null);

  const [compare, setCompare] = useState<{ [k: string]: boolean }>({});

  const compareSelected = useMemo(() => {
    if (!data?.bundles) return [];
    const b = data.bundles;
    const items: { key: string; title: string; bundle: any }[] = [];
    if (compare.value)
      items.push({ key: "value", title: "Value Bundle", bundle: b.value });
    if (compare.protection_plus)
      items.push({
        key: "protection_plus",
        title: "Protection+ Bundle",
        bundle: b.protection_plus,
      });
    if (compare.low_premium)
      items.push({
        key: "low_premium",
        title: "Low Premium Bundle",
        bundle: b.low_premium,
      });
    return items;
  }, [compare, data]);

  async function run() {
    setLoading(true);
    setErr(null);
    setData(null);
    try {
      const res = await fetch(`${apiBase}/recommend-bundles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.message || "Request failed");
      setData(j);
    } catch (e: any) {
      setErr(e?.message || "Failed");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote_${data.request_id || "bundle"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function feedback(
    bundleKey: "value" | "protection_plus" | "low_premium",
    rating: number,
  ) {
    if (!data?.request_id) return;
    await fetch(`${apiBase}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        request_id: data.request_id,
        bundle_key: bundleKey,
        rating,
      }),
    }).catch(() => {});
  }

  function openExplain(bundle: any) {
    setDrawerBundle(bundle);
    setDrawerOpen(true);
  }

  function toggleCompare(key: string) {
    setCompare((p) => ({ ...p, [key]: !p[key] }));
  }

  function removeCompare(key: string) {
    setCompare((p) => ({ ...p, [key]: false }));
  }

  return (
    <div>
      <h2 className="text-lg font-extrabold">Results</h2>
      <p className="mt-1 text-sm text-slate-300">
        Generate 3 ranked bundles (Value, Protection+, Low Premium) with insurer
        + customer narratives.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className="rounded-xl bg-white px-5 py-2 text-sm font-extrabold text-slate-950 hover:bg-slate-200 disabled:opacity-60"
        >
          {loading ? "Running…" : "Run recommendation"}
        </button>

        <button
          type="button"
          onClick={download}
          disabled={!data}
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:border-slate-600 disabled:opacity-50"
        >
          Download quote summary
        </button>

        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-2 text-sm font-bold text-white hover:border-slate-600"
        >
          ← Back
        </button>
      </div>

      {err ? (
        <div className="mt-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-sm text-red-200">
          {err}
        </div>
      ) : null}

      {compareSelected.length ? (
        <div className="mt-6">
          <CompareView selected={compareSelected} onRemove={removeCompare} />
        </div>
      ) : null}

      {data?.bundles ? (
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <BundleCard
            title="Value Bundle"
            badge="Best Value"
            bundle={data.bundles.value}
            onExplain={() => openExplain(data.bundles.value)}
            onCompareToggle={() => toggleCompare("value")}
            compareOn={!!compare.value}
            onFeedback={(r) => feedback("value", r)}
          />
          <BundleCard
            title="Protection+ Bundle"
            badge="Max Protection"
            bundle={data.bundles.protection_plus}
            onExplain={() => openExplain(data.bundles.protection_plus)}
            onCompareToggle={() => toggleCompare("protection_plus")}
            compareOn={!!compare.protection_plus}
            onFeedback={(r) => feedback("protection_plus", r)}
          />
          <BundleCard
            title="Low Premium Bundle"
            badge="Lowest Premium"
            bundle={data.bundles.low_premium}
            onExplain={() => openExplain(data.bundles.low_premium)}
            onCompareToggle={() => toggleCompare("low_premium")}
            compareOn={!!compare.low_premium}
            onFeedback={(r) => feedback("low_premium", r)}
          />
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-sm text-slate-300">
          Run the recommendation to see bundles.
        </div>
      )}

      <ExplainDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bundle={drawerBundle}
      />
    </div>
  );
}
