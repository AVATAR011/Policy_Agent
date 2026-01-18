import { searchVectors } from "../services/vector.service.js";
import { buildPolicyIntelligence } from "../services/policyIntelligence.service.js";
import { getClaimsInsights, getPricingInsights } from "../services/analytics.service.js";
import { buildGeneratePolicyPrompt } from "../services/policyGenerator.service.js";
import { askLLM } from "../services/llm.service.js";
import { storeGeneratedPolicy } from "../services/generatedPolicy.store.js";

function cleanLLMJson(raw) {
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function tryParseJsonSafely(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    console.warn("⚠️ JSON parse failed. Attempting recovery...");

    // Attempt to extract first valid JSON block
    const match = text.match(/{[\s\S]*}/);
    if (!match) throw err;

    const repaired = match[0]
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]");

    return JSON.parse(repaired);
  }
}

export async function generatePolicyHandler(req, res) {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    // 1. Retrieve similar policy chunks
    const policyChunks = await searchVectors({
        query: question,
        topK: 6
    });

    // 2. Claims + pricing analytics
    const claimsInsights = getClaimsInsights("motor");
    const pricingInsights = getPricingInsights("motor");
    console.log("Claims:", claimsInsights);
    console.log("Pricing:", pricingInsights);


    // 3. Build intelligence
    const intelligence = buildPolicyIntelligence({
      policyChunks,
      claimsInsights,
      pricingInsights
    });

    // 4. Generate policy using LLM
    const prompt = buildGeneratePolicyPrompt(intelligence, question);
    const llmResponse = await askLLM(prompt);
    const cleaned = cleanLLMJson(llmResponse);

    let policyJson;
    try {
      policyJson = tryParseJsonSafely(cleaned);
    } catch (err) {
      console.error("Invalid JSON from LLM:", llmResponse);
      return res.status(500).json({ error: "LLM returned invalid JSON" });
    }

    // 5. Store generated policy
    await storeGeneratedPolicy(policyJson);

    res.json({
      success: true,
      generatedPolicy: policyJson,
      intelligenceUsed: intelligence
    });

  } catch (error) {
    console.error("Generate policy failed:", error);
    res.status(500).json({ error: "Policy generation failed" });
  }
}
