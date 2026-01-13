import express from "express";
import { searchVectors } from "../services/vector.service.js";
import { buildPolicyCompPrompt } from "../utils/promptBuilder.js";
import { askLLM } from "../services/llm.service.js";

const router = express.Router();

const COMPANIES = ["ACKO", "HDFCERGO", "GODIGIT"];

function dedupeSources(results) {
  const map = new Map();

  for (const r of results) {
    const meta =
      typeof r.metadata === "string" ? JSON.parse(r.metadata) : r.metadata;

    map.set(meta.file, meta);
  }

  return [...map.values()];
}


export async function compareHandler(req, res){
  try {
    const { question} = req.body;

    if (!question) {
      return res.status(400).json({
        error: "question required"
      });
    }

    const extractPrompt = `
      Extract insurance companies and product type from this query.

      Query: ${question}

      Respond in JSON:
      {
        "companies": ["ACKO", "HDFCERGO"],
        "product": "PRIVATE_CAR",
        "policyType": "BUNDLED_POLICY"
      }
    `;

    const extracted = await askLLM({
      system: "You extract structured filters from user questions.",
      user: extractPrompt
    });

    let filters;

    try {
      filters = JSON.parse(extracted);
    } catch {
      return res.json({ answer: "Could not detect insurers to compare." });
    }


    const answers = {};

    for (const company of filters.companies) {
      // ---- BASE SEARCH
      let baseResults = await searchVectors({
        query: question,
        company,
        product: filters.product,
        policyType: filters.policyType,
        policyClass: "BASE",
        topK: 6,
      });

      baseResults = baseResults.map(r => ({
        ...r,
        metadata: typeof r.metadata === "string" ? JSON.parse(r.metadata) : r.metadata
      }));

      // ---- ADDON SEARCH if needed
      // if (question.toLowerCase().includes("engine")) {
      //   const addonResults = await searchVectors({
      //     query: question,
      //     company,
      //     product: filters.product,
      //     policyType: filters.policyType,
      //     policyClass: "ADDON",
      //     addonType: "ENGINE_PROTECT",
      //     topK: 5,
      //   });

      //   const parsedAddon = addonResults.map(r => ({
      //     ...r,
      //     metadata: typeof r.metadata === "string" ? JSON.parse(r.metadata) : r.metadata
      //   }));

      //   baseResults = [...parsedAddon, ...baseResults];
      // }

      if (!baseResults.length) {
        results[company] = {
          answer: "No relevant policy data found.",
          sources: [],
        };
        continue;
      }
  
      const prompt = buildPolicyCompPrompt(question, baseResults);
      const answer = await askLLM(prompt);

      answers[company] = {
        answer: answer,
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
