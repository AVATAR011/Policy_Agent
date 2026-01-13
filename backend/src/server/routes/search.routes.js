import express from "express";
import { embedQuery } from "../services/embedding.service.js";
import { searchVectors } from "../services/vector.service.js";


const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { question, company, product, policyType, section, topK } = req.body;

    let filters = {};
    if (company) filters.company = company;
    if (product) filters.product = product;
    if (policyType) filters.policyType = policyType;
    if (section) filters.section = section;

    const results = await searchVectors({
      query: question,
      company,
      product,
      policyType,
      section,
      topK: topK || 5
    });

    res.json({
      matches: results.map(r => ({
      score: r.score,
      text: r.text,
      metadata: r.metadata
    }))
  });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
