import express from "express";
import { searchVectors } from "../services/vector.service.js";
import { askLLM } from "../services/llm.service.js";
import { buildPolicyPrompt } from "../utils/promptBuilder.js";
import { getClaimsSummary } from "../services/claims.service.js";
import { getPricingSummary } from "../services/pricing.service.js";

const router = express.Router();

// ---------------- SMART FILTER ----------------
function inferSmartFilters(question, base) {
  const q = question.toLowerCase();
  let filters = { ...base };

  // -------- PRODUCT --------
  if (q.includes("private car") || q.includes("car")) {
    filters.product = "PRIVATE_CAR";
  }
  if (q.includes("two wheeler") || q.includes("bike")) {
    filters.product = "TWO_WHEELER";
  }

  // -------- POLICY TYPE --------
  if (q.includes("bundled")) filters.policyType = "BUNDLED_POLICY";
  if (q.includes("package")) filters.policyType = "PACKAGE_POLICY";
  if (q.includes("standalone") || q.includes("own damage")) filters.policyType = "SAOD_POLICY";

  // -------- ENGINE / MAJOR PART DAMAGE = ALWAYS ADDON --------
  if (
    q.includes("engine") ||
    q.includes("hydrostatic") ||
    q.includes("water ingress")
  ) {
    filters.policyClass = "ADDON";
    filters.addonType = "ENGINE_PROTECT";
  }

  // -------- ZERO DEP --------
  if (q.includes("zero dep") || q.includes("depreciation")) {
    filters.policyClass = "ADDON";
    filters.addonType = "ZERO_DEPRECIATION";
  }

  return filters;
}

function dedupeSources(chunks) {
  const seen = new Set();
  return chunks.filter(c => {
    const key = `${c.metadata.file}|${c.metadata.section}`;

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}


// ---------------- RAG ROUTE ----------------
export async function ragHandler(req, res){
  try {
    const question =
      req.body.question ||
      req.body.query ||
      req.body.q ||
      req.body.text;

    const {
      company,
      product,
      policyType
    } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Question is required" });
    }

    const baseFilters = { company, product, policyType };

    const smartFilters = inferSmartFilters(question, baseFilters);

    // ---- SMART SEARCH FIRST ----
    let results = await searchVectors({
      query: question,
      ...smartFilters,
      topK: 5
    });

// ---- FALLBACK TO BASE POLICY ----
    if (results.length === 0) {
      results = await searchVectors({
        query: question,
        ...baseFilters,
        policyClass: "BASE",
        topK: 5
      });
    }
    if (
      question.toLowerCase().includes("engine") &&
      results.every(r => r.metadata.policyClass === "BASE")

    ) {
    const addonResults = await searchVectors({
      query: question,
      company,
      product,
      policyType,
      policyClass: "ADDON",
      addonType: "ENGINE_PROTECT",
      topK: 5
    });

  results = [...addonResults, ...results];
}
  const uniqueResults = dedupeSources(results);


    const claimsSummary = getClaimsSummary();
    const pricingSummary = getPricingSummary();

    const prompt = buildPolicyPrompt(
      question,
      uniqueResults,
      claimsSummary,
      pricingSummary
    );
    const answer = await askLLM(prompt);

    res.json({
      answer,
      sources: uniqueResults.map(r => r.metadata)
    });

  } catch (e) {
    console.error("RAG ERROR:", e);
    res.status(500).json({ error: "RAG failed" });
  }
};

router.post("/", ragHandler);
export default router;
