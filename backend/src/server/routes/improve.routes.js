import express from "express";
import { searchVectors } from "../services/vector.service.js";
import { askLLM } from "../services/llm.service.js";
import { buildPolicyImprovementPrompt } from "../utils/promptBuilder.js";
import { getClaimsSummary } from "../services/claims.service.js";

const router = express.Router();

export async function improveHandler(req, res){
  try {
    const { company, product, policyType } = req.body;

    if (!company || !product || !policyType) {
      return res.status(400).json({
        error: "company, product, policyType required"
      });
    }

    const results = await searchVectors({
      query: "exclusions deductibles claims conditions add-ons coverage limits",
      company,
      product,
      policyType,
      topK: 20
    });

    if (!results.length) {
      return res.json({ answer: "No policy data found" });
    }

    // --- SPLIT BASE vs ADDON ---
    const base = [];
    const addons = [];

    for (const r of results) {
      const meta = r.metadata;

      if (meta.policyClass === "BASE") base.push(r);
      else if (meta.policyClass === "ADDON") addons.push(r);
    }

    // --- BUILD STRUCTURED CONTEXT ---
    const baseText = base
      .map(b => `FILE: ${b.metadata.file}\n${b.content}`)
      .join("\n---\n");

    const addonText = addons
      .map(a => `FILE: ${a.metadata.file}\n${a.content}`)
      .join("\n---\n");

    const context = `
    BASE POLICY CLAUSES:
    ${baseText || "No base policy clauses found."}

    ADD-ON CLAUSES:
    ${addonText || "No add-on clauses found."}
    `;

    const claimsSummary = getClaimsSummary();

    const claimsContext = claimsSummary
      ? `
        CLAIMS INSIGHTS:
        Top Risky Coverages:
        ${claimsSummary.topCoverages.map(c =>
          `- ${c.coverage_name}: ${c.total_claims} claims | Risk Score: ${c.risk_score}`
        ).join("\n")}

        Risky Policy Types:
        ${claimsSummary.riskyPolicies.map(p =>
          `- ${p.policy_type}: ${p.total_claims} claims | Risk Score: ${p.risk_score}`
        ).join("\n")}
        `
      : "";
    // --- LLM PROMPT ---
    const prompt = `
      You are an insurance product analyst helping insurers improve policies.

      Analyze the following motor insurance product.

      Company: ${company}
      Product: ${product}
      Policy Type: ${policyType}

      ${claimsContext}

      Answer in this format:

      1. Direct answer to typical customer coverage expectations
      2. Conditions and exclusions affecting claims
      3. Risk and cost impact to insurer
      4. Suggestions to improve product profitability or coverage design

      IMPORTANT:
      - Answer strictly based on the clauses provided below.
      - If something is not explicitly stated in the clauses, say:
        "Not explicitly mentioned in policy wording".
      - Do NOT assume standard insurance coverage unless written in clauses.

      ${context}
    `;

    const answer = await askLLM(prompt);


    const uniqueSources = [];
    const seen = new Set();

    for (const r of results) {
      const key = `${r.metadata.file}::${r.metadata.section}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueSources.push(r.metadata);
      }
    }

    res.json({
      answer,
      sources: uniqueSources
    });

  } catch (err) {
    console.error("IMPROVEMENT ERROR:", err);
    res.status(500).json({ error: "Policy improvement analysis failed" });
  }
};

router.post("/", improveHandler);
export default router;
