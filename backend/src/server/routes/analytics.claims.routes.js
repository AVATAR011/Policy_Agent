// import express from "express";
// import { getClaimsSummary } from "../services/claimsAnalytics.service.js";

// const router = express.Router();

// /**
//  * GET /analytics/claims/summary
//  */
// router.get("/summary", (req, res) => {
//   try {
//     const summary = getClaimsSummary();
//     res.json(summary);
//   } catch (err) {
//     console.error("❌ Claims analytics error:", err);
//     res.status(500).json({ error: "Failed to load claims analytics" });
//   }
// });

// export default router;
