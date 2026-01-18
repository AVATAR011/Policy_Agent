import Database from "better-sqlite3";
import path from "path";

/* ---------------- DB CONNECTIONS ---------------- */

const claimsDb = new Database(
  path.resolve("./src/server/db/claims.db"),
  { readonly: true }
);

const pricingDb = new Database(
  path.resolve("./src/server/db/pricing.db"),
  { readonly: true }
);

/* =================================================
   CLAIMS ANALYTICS
================================================= */

export function getClaimsInsights(policyType) {
  try {
    /* ---------- Policy Level Risk ---------- */
    const policyRow = claimsDb.prepare(`
      SELECT 
        total_claims,
        top_coverage,
        risk_score
      FROM claims_by_policy
      WHERE policy_type = ?
      LIMIT 1
    `).get(policyType);

    /* ---------- Coverage Level Risk ---------- */
    const coverageRows = claimsDb.prepare(`
      SELECT
        coverage_name,
        total_claims,
        dominant_category,
        risk_score
      FROM claims_by_coverage
      ORDER BY risk_score DESC
      LIMIT 15
    `).all();

    const highRiskCoverages = coverageRows
      .filter(r => r.risk_score >= 0.7)
      .map(r => r.coverage_name);

    const lowRiskCoverages = coverageRows
      .filter(r => r.risk_score <= 0.3)
      .map(r => r.coverage_name);

    return {
      policyType,
      totalClaims: policyRow?.total_claims || 0,
      topCoverage: policyRow?.top_coverage || null,
      policyRiskScore: policyRow?.risk_score || null,
      highRiskCoverages,
      lowRiskCoverages,
      dominantRiskCategories: coverageRows
        .map(r => r.dominant_category)
        .filter(Boolean)
    };

  } catch (err) {
    console.error("❌ Claims analytics failed:", err);
    return {
      policyType,
      totalClaims: 0,
      topCoverage: null,
      policyRiskScore: null,
      highRiskCoverages: [],
      lowRiskCoverages: [],
      dominantRiskCategories: []
    };
  }
}

/* =================================================
   PRICING ANALYTICS
================================================= */

export function getPricingInsights() {
  try {
    const rows = pricingDb.prepare(`
      SELECT
        policy_type,
        avg_base_rate,
        avg_multiplier,
        loss_band,
        pricing_action
      FROM pricing_by_segment
      WHERE avg_base_rate > 0
    `).all();

    if (!rows.length) {
      return emptyPricingFallback();
    }

    const avgBaseRate =
      rows.reduce((sum, r) => sum + r.avg_base_rate, 0) / rows.length;

    const highRiskSegments = rows.filter(r => r.loss_band === "High Risk").length;
    const lossHeavySegments = rows.filter(r => r.loss_band === "Loss Heavy").length;

    const pricingActions = [
      ...new Set(rows.map(r => r.pricing_action).filter(Boolean))
    ];

    const segmentMix = {};
    rows.forEach(r => {
      segmentMix[r.policy_type] = (segmentMix[r.policy_type] || 0) + 1;
    });

    return {
      averageBaseRate: Math.round(avgBaseRate),
      totalSegments: rows.length,
      highRiskSegments,
      lossHeavySegments,
      pricingActions,
      segmentMix
    };

  } catch (err) {
    console.error("❌ Pricing analytics failed:", err);
    return emptyPricingFallback();
  }
}

function emptyPricingFallback() {
  return {
    averageBaseRate: null,
    totalSegments: 0,
    highRiskSegments: 0,
    lossHeavySegments: 0,
    pricingActions: [],
    segmentMix: {}
  };
}
