import { askLLM } from "../services/llm.service.js";
import { buildRefinePolicyPrompt } from "../services/refinePolicy.service.js";

function cleanLLMJson(raw) {
  return raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

export async function refinePolicyHandler(req, res) {
  try {
    const { policy, intelligence, message } = req.body;

    if (!policy || !message) {
      return res.status(400).json({ error: "policy and message are required" });
    }

    const prompt = buildRefinePolicyPrompt(
      policy,
      intelligence || {},
      message
    );

    const llmResponse = await askLLM(prompt);
    const cleaned = cleanLLMJson(llmResponse);

    let updatedPolicy;
    try {
      updatedPolicy = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid JSON from refine LLM:", llmResponse);
      return res.status(500).json({ error: "Invalid refinement JSON" });
    }

    res.json({
      updatedPolicy,
      reply: "Policy updated successfully"
    });

  } catch (error) {
    console.error("Refine policy failed:", error);
    res.status(500).json({ error: "Refine failed" });
  }
}
