// backend/src/server/services/policyGenerator.service.js

export function buildGeneratePolicyPrompt(intelligence = {}, userRequirement = "") {

  return `
You are an insurance product architect and risk analyst.

User requirement:
"${userRequirement}"

Insights from data:
- High Risk Areas: ${intelligence.highRiskAreas?.join(", ") || "None"}
- Low Risk Opportunities: ${intelligence.lowRiskOpportunities?.join(", ") || "None"}
- Dominant Risk Categories: ${intelligence.dominantRiskCategories?.join(", ") || "None"}
- Policy Risk Score: ${intelligence.policyRiskScore || "Unknown"}
- Pricing Signals: ${intelligence.pricingSignals?.join(", ") || "None"}
- Addon Opportunities: ${
    intelligence.addonOpportunities?.map(a => `${a.addon} (₹${a.avgPrice})`).join(", ")
      || "None"
  }
- Average Base Rate: ${intelligence.averageBaseRate || "Unknown"}
- High Loss Segments: ${intelligence.highLossSegments}
- Segment Mix: ${
    intelligence.segmentMix
      ? Object.entries(intelligence.segmentMix)
          .map(([k, v]) => `${k}:${v}`)
          .join(", ")
      : "Unknown"
  }

TASK 1 — Create a NEW unique insurance policy optimized for the user requirement.

TASK 2 — Explain WHY each intelligence signal influenced the policy decisions.
Use the actual data provided above. Keep explanations concise (1–3 sentences each).

IMPORTANT RESPONSE RULES:
- Respond ONLY with VALID JSON.
- DO NOT use markdown.
- DO NOT add extra commentary text.
- DO NOT wrap in triple quotes.
- Escape all quotes properly.
- All arrays and objects must be closed correctly.

Return EXACTLY this JSON schema:

{
  "policy": {
    "policy_name": "",
    "target_segment": "",
    "coverages": [],
    "exclusions": [],
    "deductibles": "",
    "pricing_strategy": "",
    "risk_controls": [],
    "profitability_rationale": ""
  },
  "explanations": {
    "highRiskAreas": "",
    "pricingSignals": "",
    "marketGaps": "",
    "lossHeavySegments": "",
    "segmentMix": ""
  }
}
`;
}
