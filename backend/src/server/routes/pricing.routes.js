import express from "express";
import { pricingDb } from "../db/initPricingDb.js";

const router = express.Router();

router.get("/pricing/segment", (req, res) => {
  const rows = pricingDb.prepare(`
    SELECT * FROM pricing_by_segment
    ORDER BY avg_multiplier DESC
  `).all();

  res.json(rows);
});

router.get("/pricing/addon", (req, res) => {
  const rows = pricingDb.prepare(`
    SELECT * FROM pricing_by_addon
    ORDER BY avg_addon_price DESC
  `).all();

  res.json(rows);
});

export default router;
