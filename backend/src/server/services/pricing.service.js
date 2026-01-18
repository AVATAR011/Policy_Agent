import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve("./src/server/db/pricing.db");
const db = new Database(dbPath, { readonly: true });

export function getPricingSummary() {

  const addonPricing = db.prepare(`
    SELECT 
      addon_name,
      avg_addon_price,
      avg_multiplier,
      loss_band,
      pricing_action
    FROM pricing_by_addon
    ORDER BY avg_addon_price DESC
    LIMIT 5
  `).all();

  const segmentPricing = db.prepare(`
    SELECT
      policy_type,
      vehicle_age_band,
      location_zone,
      avg_base_rate,
      avg_multiplier,
      loss_band,
      pricing_action
    FROM pricing_by_segment
    ORDER BY avg_base_rate DESC
    LIMIT 5
  `).all();

  return {
    addonPricing,
    segmentPricing
  };
}
