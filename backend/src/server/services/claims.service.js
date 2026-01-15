import Database from "better-sqlite3";
import path from "path";

/**
 * Fetch aggregated claims insights
 */
const dbPath = path.resolve("./src/server/db/claims.db");
const db = new Database(dbPath, { readonly: true });

export function getClaimsSummary() {
  const coverageStats = db.prepare(`
    SELECT coverage_name, total_claims, dominant_category, risk_score
    FROM claims_by_coverage
    ORDER BY total_claims DESC
    LIMIT 5
  `).all();

  const policyStats = db.prepare(`
    SELECT policy_type, total_claims, top_coverage, risk_score
    FROM claims_by_policy
    ORDER BY total_claims DESC
    LIMIT 5
  `).all();

  return {
    topCoverages: coverageStats,
    riskyPolicies: policyStats
  };
}
