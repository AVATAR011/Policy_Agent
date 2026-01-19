import { useState } from "react";
import { generatePolicy, refinePolicy, confirmPolicy } from "../api/chatApi";

function IntelligenceSection({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition"
      >
        <div className="font-medium text-slate-200">
          {item.title}
        </div>

        <span className="text-slate-400 text-sm">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="p-4 pt-0 space-y-2">
            <div className="text-sm text-blue-300">
                <span className="text-slate-300 font-medium">Observed:</span>{" "}
                {item.data}
            </div>

            <div className="text-sm text-slate-300 leading-relaxed">
                {item.explanation}
            </div>

        </div>
      )}
    </div>
  );
}


function explainIntelligence(intel, explanation) {
  if (!intel || !explanation) return [];

  const sections = [
    {
      key: "highRiskAreas",
      title: "⚠️ High Risk Coverages",
      data: intel.highRiskAreas?.slice(0, 6).join(", "),
      explanation: explanation.highRiskAreas
    },
    {
      key: "pricingSignals",
      title: "💰 Pricing Signals",
      data: intel.pricingSignals?.join(", "),
      explanation: explanation.pricingSignals
    },
    {
      key: "marketGaps",
      title: "🧭 Market Opportunities",
      data: intel.marketGaps?.join(", "),
      explanation: explanation.marketGaps
    },
    {
      key: "lossHeavySegments",
      title: "🚨 Loss Heavy Segments",
      data:
        typeof intel.lossHeavySegments === "number"
          ? `${intel.lossHeavySegments} segments`
          : null,
      explanation: explanation.lossHeavySegments
    },
    {
      key: "segmentMix",
      title: "📊 Portfolio Mix",
      data: intel.segmentMix
        ? Object.entries(intel.segmentMix)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | ")
        : null,
      explanation: explanation.segmentMix
    }
  ];

  // ✅ Auto-hide empty sections
  return sections.filter(
    s =>
      s.data &&
      s.explanation &&
      String(s.data).trim().length > 0 &&
      String(s.explanation).trim().length > 0
  );
}




export default function PolicyBuilder() {
  const [form, setForm] = useState({
    policyType: "Motor",
    targetSegment: "",
    businessGoal: "Profit",
    riskLevel: "Medium",
    notes: ""
  });

  const [policy, setPolicy] = useState(null);
  const [intelligence, setIntelligence] = useState(null);
  const [intelExplanation, setIntelExplanation] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [showIntelligence, setShowIntelligence] = useState(false);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleGenerate() {
    try {
        setLoading(true);
        const result = await generatePolicy(form);
        setShowIntelligence(false);
        setIntelligence(null);
        setPolicy(result.generatedPolicy);
        setIntelligence(result.intelligenceUsed);
        setIntelExplanation(result.intelligenceExplanation);   // ✅ NEW

        setChat([]);
        setConfirmed(false);
    } finally {
        setLoading(false);
    }
  }

  async function sendRefinement() {
    if (!message.trim() || !policy) return;

    const userMsg = { role: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    setMessage("");

    const result = await refinePolicy(policy, intelligence, message);

    setPolicy(result.updatedPolicy);
    setChat(prev => [...prev, { role: "assistant", text: result.reply }]);
  }

  async function cnfrmPolicy() {
  try {
    await confirmPolicy(policy);
    setConfirmed(true);
    alert("✅ Policy confirmed and saved.");
  } catch(err){
    alert("❌ Failed to save policy"+err);
  }
}


  return (
    <div className="h-full w-full p-6 overflow-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-100">🧾 Policy Builder</h1>
        <p className="text-slate-400 text-sm">
          Design, refine, and approve insurance policies using AI
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* INPUTS */}
        <Card title="Policy Inputs">
          <Field label="Policy Type">
            <select name="policyType" value={form.policyType} onChange={updateField} className="input">
              <option>Motor</option>
              <option>Health</option>
              <option>Travel</option>
            </select>
          </Field>

          <Field label="Target Segment">
            <input
              name="targetSegment"
              placeholder="Young Drivers, EV Owners..."
              value={form.targetSegment}
              onChange={updateField}
              className="input"
            />
          </Field>

          <Field label="Business Goal">
            <select name="businessGoal" value={form.businessGoal} onChange={updateField} className="input">
              <option>Profit</option>
              <option>Growth</option>
              <option>Retention</option>
            </select>
          </Field>

          <Field label="Risk Preference">
            <select name="riskLevel" value={form.riskLevel} onChange={updateField} className="input">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </Field>

          <Field label="Special Requirements">
            <textarea
              name="notes"
              rows={4}
              placeholder="Telematics, EV battery coverage..."
              value={form.notes}
              onChange={updateField}
              className="input resize-none"
            />
          </Field>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "🚀 Generate Policy"}
          </button>
        </Card>

        {/* POLICY PREVIEW */}
        <Card>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-200">
                Generated Policy
                </h2>

                {intelligence && (
                <button
                    onClick={() => setShowIntelligence(true)}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                    📊 View Intelligence
                </button>
                )}
            </div>
          {!policy && (
            <Empty text="Generate a policy to preview it here." />
          )}

          {policy && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-blue-400">{policy.policy_name}</h3>
                <p className="text-slate-400">{policy.target_segment}</p>
              </div>

              <Pills title="Coverages" items={policy.coverages} />
              <Pills title="Exclusions" items={policy.exclusions} />

              <Info label="Pricing Strategy" value={policy.pricing_strategy} />
              <Info label="Risk Controls" value={policy.risk_controls.join(", ")} />
              <Info label="Profitability" value={policy.profitability_rationale} />

              {!confirmed && (
                <button
                  onClick={cnfrmPolicy}
                  className="w-full py-2 rounded-lg border border-green-600 text-green-400 hover:bg-green-600 hover:text-white transition"
                >
                  ✅ Confirm Policy
                </button>
              )}

              {confirmed && (
                <div className="text-green-400 font-medium text-center">
                  ✔ Policy Confirmed
                </div>
              )}
            </div>
          )}
        </Card>

      </div>

      {/* REFINEMENT CHAT */}
      {policy && !confirmed && (
        <Card title="💬 Refine Policy with AI">
          <div className="h-48 overflow-auto space-y-2 mb-3">
            {chat.length === 0 && (
              <p className="text-slate-500 text-sm">
                Ask the AI to modify the policy (e.g., “Increase deductible”, “Add EV battery cover”)
              </p>
            )}

            {chat.map((c, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  c.role === "user"
                    ? "bg-blue-600 text-white self-end"
                    : "bg-slate-800 text-slate-200"
                }`}
              >
                {c.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type your modification request..."
              className="input flex-1"
            />
            <button
              onClick={sendRefinement}
              className="px-4 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
            >
              Send
            </button>
          </div>
        </Card>
      )}
      {/* ---------------- Intelligence Sidebar ---------------- */}
    {showIntelligence && intelligence && (
    <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowIntelligence(false)}
        />

        {/* Panel */}
        <div className="relative w-[420px] h-full bg-slate-950 border-l border-slate-800 shadow-xl overflow-y-auto p-5 animate-slideIn">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
            🧠 Intelligence Insights
            </h3>

            <button
            onClick={() => setShowIntelligence(false)}
            className="text-slate-400 hover:text-white"
            >
            ✕
            </button>
        </div>

        <div className="space-y-4">
            {explainIntelligence(intelligence, intelExplanation).map((item) => (
                <IntelligenceSection key={item.key} item={item} />
            ))}

        </div>
        </div>
    </div>
    )}

    </div>
  );
}

/* ---------------- UI Components ---------------- */

function Card({ title, children }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Pills({ title, items = [] }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-300 mb-1">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <h4 className="font-semibold text-slate-300 mb-1">{label}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="h-48 flex items-center justify-center text-slate-500 text-sm">
      {text}
    </div>
  );
}
