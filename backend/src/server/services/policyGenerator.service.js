// backend/src/server/services/policyGenerator.service.js

export function buildGeneratePolicyPrompt(intelligence = {}, userRequirement = "") {

  const commonCoverages = intelligence.commonCoverages || [];
  const highRiskAreas = intelligence.highRiskAreas || [];
  const lowRiskOpportunities = intelligence.lowRiskOpportunities || [];
  const pricingPatterns = intelligence.pricingPatterns || [];
  const marketGaps = intelligence.marketGaps || [];

  return `
You are an insurance product architect.

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


Create a NEW unique insurance policy.

IMPORTANT:
- Respond ONLY with VALID JSON.
- DO NOT use markdown.
- DO NOT add explanations.
- DO NOT add trailing text.
- Ensure all arrays and objects are properly closed.
- Escape quotes properly.

Return EXACTLY this JSON schema:
{
  "policy_name": "",
  "target_segment": "",
  "coverages": [],
  "exclusions": [],
  "deductibles": "",
  "pricing_strategy": "",
  "risk_controls": [],
  "profitability_rationale": ""
}
`;
}
