import { embedText, insertEmbedding } from "./vector.service.js";

export async function storeGeneratedPolicy(policyJson) {
  const text = `
    Policy Name: ${policyJson.policy_name}
    Target Segment: ${policyJson.target_segment}
    Coverages: ${policyJson.coverages.join(", ")}
    Exclusions: ${policyJson.exclusions.join(", ")}
    Pricing: ${policyJson.pricing_strategy}
    Rationale: ${policyJson.profitability_rationale}
    `;

  const embedding = await embedText(text);

  await insertEmbedding({
    content: text,
    embedding,
    metadata: {
      source: "generated",
      policyType: "motor",
      policyName: policyJson.policy_name,
      createdAt: new Date().toISOString()
    }
  });
}
