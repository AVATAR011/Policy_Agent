import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./src/server/db/claims.db");
const db = new Database(dbPath, { readonly: true });

/**
 * Returns aggregated claims intelligence
 */
export function getPolicyRisk(policyType = null) {
  if (policyType) {
    return db.prepare(`
      SELECT
        policy_type,
        total_claims,
        top_coverage,
        risk_score
      FROM claims_by_policy
      WHERE policy_type = ?
      ORDER BY risk_score DESC
    `).all(policyType);
  }

  return db.prepare(`
    SELECT
      policy_type,
      total_claims,
      top_coverage,
      risk_score
    FROM claims_by_policy
    ORDER BY risk_score DESC
  `).all();
}

/**
 * Get coverage-level risk analytics
 */
export function getCoverageRisk() {
  return db.prepare(`
    SELECT
      coverage_level,
      coverage_name,
      total_claims,
      dominant_category,
      insurers,
      risk_score
    FROM claims_by_coverage
    ORDER BY risk_score DESC
  `).all();
}