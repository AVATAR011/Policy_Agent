import fs from "fs";
import csv from "csv-parser";
import { db } from "../db/initClaimsDB.js";

const FILE = "./backend/src/server/db/claims_dataset_motor_all_policies_all_companies.csv";

const rows = [];

fs.createReadStream(FILE)
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", () => {
    console.log("📄 Loaded rows:", rows.length);

    aggregateByCoverage(rows);
    aggregateByPolicy(rows);

    console.log("✅ Claims aggregation completed");
  });

function aggregateByCoverage(data) {
  const map = {};

  data.forEach(r => {
    const key = `${r.coverage_level}__${r.coverage_name}`;

    if (!map[key]) {
      map[key] = {
        coverage_level: r.coverage_level,
        coverage_name: r.coverage_name,
        total_claims: 0,
        categories: {},
        insurers: new Set()
      };
    }

    map[key].total_claims++;
    map[key].categories[r.claim_category] =
      (map[key].categories[r.claim_category] || 0) + 1;
    map[key].insurers.add(r.insurer);
  });

  const insert = db.prepare(`
    INSERT INTO claims_by_coverage
    (coverage_level, coverage_name, total_claims, dominant_category, insurers, risk_score)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  Object.values(map).forEach(row => {
    const dominant = Object.entries(row.categories)
      .sort((a, b) => b[1] - a[1])[0][0];

    const riskScore = row.total_claims / data.length * 100;

    insert.run(
      row.coverage_level,
      row.coverage_name,
      row.total_claims,
      dominant,
      Array.from(row.insurers).join(", "),
      riskScore.toFixed(2)
    );
  });

  console.log("✅ claims_by_coverage populated");
}

function aggregateByPolicy(data) {
  const map = {};

  data.forEach(r => {
    if (!map[r.policy_type]) {
      map[r.policy_type] = {
        policy_type: r.policy_type,
        total_claims: 0,
        coverage: {}
      };
    }

    map[r.policy_type].total_claims++;
    map[r.policy_type].coverage[r.coverage_name] =
      (map[r.policy_type].coverage[r.coverage_name] || 0) + 1;
  });

  const insert = db.prepare(`
    INSERT INTO claims_by_policy
    (policy_type, total_claims, top_coverage, risk_score)
    VALUES (?, ?, ?, ?)
  `);

  Object.values(map).forEach(row => {
    const topCoverage = Object.entries(row.coverage)
      .sort((a, b) => b[1] - a[1])[0][0];

    const riskScore = row.total_claims / data.length * 100;

    insert.run(
      row.policy_type,
      row.total_claims,
      topCoverage,
      riskScore.toFixed(2)
    );
  });

  console.log("✅ claims_by_policy populated");
}
