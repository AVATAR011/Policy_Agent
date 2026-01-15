import express from "express";
import { getPolicyRisk, getCoverageRisk } from "../services/claimsAnalytics.service.js";

const router = express.Router();

/**
 * GET /claims/analytics
 * Optional query param: ?policyType=PRIVATE_CAR
 */
router.get("/analytics", (req, res) => {
  try {
    const { policyType } = req.query;

    const policyRisk = getPolicyRisk(policyType);
    const coverageRisk = getCoverageRisk();

    res.json({
      policyRisk,
      coverageRisk
    });
  } catch (err) {
    console.error("❌ Claims analytics error:", err);
    res.status(500).json({ error: "Failed to fetch claims analytics" });
  }
});

export default router;
