import express from "express";
import { db } from "../db/initClaimsDB.js";

const router = express.Router();

router.get("/claims/coverage", (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM claims_by_coverage
    ORDER BY total_claims DESC
  `).all();

  res.json(rows);
});

router.get("/claims/policy", (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM claims_by_policy
    ORDER BY total_claims DESC
  `).all();

  res.json(rows);
});

export default router;
