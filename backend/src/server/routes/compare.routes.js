import express from "express";
import { searchVectors } from "../services/vector.service.js";
import { buildPolicyPrompt } from "../utils/promptBuilder.js";
import { askLLM } from "../services/llm.service.js";

const router = express.Router();

const COMPANIES = ["ACKO", "HDFCERGO", "GODIGIT"];

function dedupeSources(results) {
  const map = new Map();
  for (const r of results) {
    map.set(r.metadata.file, r.metadata);
  }
  return [...map.values()];
}

export async function compareHandler(req, res){
  try {
    const { question, product, policyType } = req.body;

    if (!question || !product || !policyType) {
      return res.status(400).json({
        error: "question, product and policyType are required",
      });
    }

    const results = {};

    for (const company of COMPANIES) {
      // ---- BASE SEARCH
      let baseResults = await searchVectors({
        query: question,
        company,
        product,
        policyType,
        policyClass: "BASE",
        topK: 5,
      });

      // ---- ADDON SEARCH if needed
      if (question.toLowerCase().includes("engine")) {
        const addonResults = await searchVectors({
          query: question,
          company,
          product,
          policyType,
          policyClass: "ADDON",
          addonType: "ENGINE_PROTECT",
          topK: 5,
        });

        baseResults = [...addonResults, ...baseResults];
      }

      if (!baseResults.length) {
        results[company] = {
          answer: "No relevant policy data found.",
          sources: [],
        };
        continue;
      }

      const prompt = buildPolicyPrompt(question, baseResults);
      const answer = await askLLM(prompt);

      results[company] = {
        answer,
        sources: dedupeSources(baseResults),
      };
    }

    res.json(results);
  } catch (err) {
    console.error("COMPARE ERROR:", err);
    res.status(500).json({ error: "Comparison failed" });
  }
};

router.post("/", compareHandler);
export default router;
