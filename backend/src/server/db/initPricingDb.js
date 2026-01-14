import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./src/server/db/pricing.db");
export const pricingDb = new Database(dbPath);

// Segment level pricing intelligence
pricingDb.prepare(`
CREATE TABLE IF NOT EXISTS pricing_by_segment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  policy_type TEXT,
  vehicle_age_band TEXT,
  location_zone TEXT,
  avg_base_rate REAL,
  avg_multiplier REAL,
  loss_band TEXT,
  pricing_action TEXT
)
`).run();

// Addon pricing intelligence
pricingDb.prepare(`
CREATE TABLE IF NOT EXISTS pricing_by_addon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  addon_name TEXT,
  avg_addon_price REAL,
  avg_multiplier REAL,
  loss_band TEXT,
  pricing_action TEXT
)
`).run();

console.log("✅ Pricing DB initialized");
