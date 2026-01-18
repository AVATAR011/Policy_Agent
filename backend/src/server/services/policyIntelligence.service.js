// backend/src/server/services/policyIntelligence.service.js

/**
 * Converts retrieved policy chunks + analytics into structured intelligence.
 * This prevents sending raw noisy text to the LLM.
 */

export function buildPolicyIntelligence({
  policyChunks = [],
  claimsInsights = {},
  pricingInsights = {}
}) {
  return {
  highRiskAreas: claimsInsights.highRiskCoverages || [],
  lowRiskOpportunities: claimsInsights.lowRiskCoverages || [],
  dominantRiskCategories: claimsInsights.dominantRiskCategories || [],
  policyRiskScore: claimsInsights.policyRiskScore,

  pricingSignals: pricingInsights.pricingActions || [],
  segmentMix: pricingInsights.segmentMix || {},
  lossHeavySegments: pricingInsights.lossHeavySegments || 0,

  marketGaps: detectCoverageGaps(policyChunks),
};


}

/* ----------------------- Helpers ----------------------- */

function extractCommonCoverages(chunks) {
  const coverageKeywords = [
    "engine",
    "battery",
    "zero depreciation",
    "own damage",
    "third party",
    "roadside",
    "personal accident",
    "accessories",
    "consumables",
    "key loss",
    "return to invoice",
    "ncb",
    "idv",
    "theft",
    "fire",
    "flood",
    "electrical",
    "non electrical"
  ];

  const frequency = {};

  chunks.forEach(c => {
    const text = c.content.toLowerCase();
    coverageKeywords.forEach(key => {
      if (text.includes(key)) {
        frequency[key] = (frequency[key] || 0) + 1;
      }
    });
  });

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key]) => key);
}

function extractExclusions(chunks) {
  const exclusions = [];

  chunks.forEach(c => {
    const text = c.content.toLowerCase();
    if (text.includes("not covered") || text.includes("excluded")) {
      exclusions.push(text.slice(0, 120));
    }
  });

  return exclusions.slice(0, 5);
}

function detectCoverageGaps(chunks) {
  const knownCovers = [
    "engine",
    "battery",
    "roadside",
    "telematics",
    "usage based",
    "deductible flexibility"
  ];

  const found = new Set();
  chunks.forEach(c => {
    const t = c.content.toLowerCase();
    knownCovers.forEach(k => {
      if (t.includes(k)) found.add(k);
    });
  });

  return knownCovers.filter(k => !found.has(k));
}
