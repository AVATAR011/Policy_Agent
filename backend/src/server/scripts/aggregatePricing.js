import fs from "fs";
import csv from "csv-parser";
import { pricingDb } from "../db/initPricingDb.js";

const FILE = "src/server/db/pricing_and_rating_combined_motor.csv";
const rows = [];

fs.createReadStream(FILE)
  .pipe(csv())
  .on("data", row => rows.push(row))
  .on("end", () => {
    console.log("📄 Loaded rows:", rows.length);
    
    console.log("📄 Sample row:", rows[0]);
    console.log("📄 CSV Columns:", Object.keys(rows[0]));
    aggregateBySegment(rows);
    aggregateByAddon(rows);

    console.log("✅ Pricing aggregation completed");
  });

function aggregateBySegment(data) {
  const map = {};

  data.forEach(r => {
    const key = `${r.policy_type}|${r.vehicle_age_band}|${r.location_zone}`;

    if (!map[key]) {
      map[key] = {
        policy_type: r.policy_type,
        vehicle_age_band: r.vehicle_age_band,
        location_zone: r.location_zone,
        baseRates: [],
        multipliers: [],
        loss_band: r.expected_loss_ratio_band,
        pricing_action: r.pricing_action_hint
      };
    }

    map[key].baseRates.push(Number(r.base_rate_inr || 0));
    map[key].multipliers.push(Number(r.final_rating_multiplier || 1));
  });

  const insert = pricingDb.prepare(`
    INSERT INTO pricing_by_segment
    (policy_type, vehicle_age_band, location_zone, avg_base_rate, avg_multiplier, loss_band, pricing_action)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  Object.values(map).forEach(row => {
    const avgBase = avg(row.baseRates);
    const avgMult = avg(row.multipliers);

    insert.run(
      row.policy_type,
      row.vehicle_age_band,
      row.location_zone,
      avgBase.toFixed(2),
      avgMult.toFixed(2),
      row.loss_band,
      row.pricing_action
    );
  });

  console.log("✅ pricing_by_segment populated");
}

function aggregateByAddon(data) {
  const map = {};

  data.forEach(r => {
    if (!r.addon_name || r.addon_price_inr === "0") return;

    if (!map[r.addon_name]) {
      map[r.addon_name] = {
        addon_name: r.addon_name,
        prices: [],
        multipliers: [],
        loss_band: r.expected_loss_ratio_band,
        pricing_action: r.pricing_action_hint
      };
    }

    map[r.addon_name].prices.push(Number(r.addon_price_inr));
    map[r.addon_name].multipliers.push(Number(r.final_rating_multiplier));
  });

  const insert = pricingDb.prepare(`
    INSERT INTO pricing_by_addon
    (addon_name, avg_addon_price, avg_multiplier, loss_band, pricing_action)
    VALUES (?, ?, ?, ?, ?)
  `);

  Object.values(map).forEach(row => {
    insert.run(
      row.addon_name,
      avg(row.prices).toFixed(2),
      avg(row.multipliers).toFixed(2),
      row.loss_band,
      row.pricing_action
    );
  });

  console.log("✅ pricing_by_addon populated");
}

function avg(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
