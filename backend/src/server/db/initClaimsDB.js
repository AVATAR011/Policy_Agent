import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./src/server/db/claims.db");
export const db = new Database(dbPath);

// Aggregated by addon / coverage
db.prepare(`
CREATE TABLE IF NOT EXISTS claims_by_coverage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  coverage_level TEXT,
  coverage_name TEXT,
  total_claims INTEGER,
  dominant_category TEXT,
  insurers TEXT,



  
  risk_score REAL
)
`).run();

// Aggregated by policy type
db.prepare(`
CREATE TABLE IF NOT EXISTS claims_by_policy (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  policy_type TEXT,
  total_claims INTEGER,
  top_coverage TEXT,
  risk_score REAL
)
`).run();

console.log("✅ Claims DB initialized");
