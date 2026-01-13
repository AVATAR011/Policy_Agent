export function buildPolicyCompPrompt(question, results) {
  const grouped = {};

  for (const r of results) {
    const meta =
      typeof r.metadata === "string" ? JSON.parse(r.metadata) : r.metadata;

    if (!grouped[meta.company]) grouped[meta.company] = [];
    const label = meta.policyClass === "ADDON"
      ? `[ADDON: ${meta.addonType || "UNKNOWN"}]`
      : "[BASE POLICY]";

    grouped[meta.company].push(`${label}\n${r.content}`);
  }

  const context = Object.entries(grouped)
    .map(
      ([company, clauses]) =>
        `\n### INSURER: ${company}\n${clauses.join("\n")}`
    )
    .join("\n\n");


  return `
    You are an insurance product analyst comparing multiple insurers.

    Question:
    ${question}

    Below are policy clauses from different insurers.

    TASK:
    Create a structured comparison with these sections:

    1. Coverage Availability (per insurer)
    2. Key Conditions & Exclusions (per insurer)
    3. Risk Exposure for Insurer
    4. Product Design Differences
    5. Recommendation (which product is stronger and why)

    IMPORTANT RULES:
    - Do NOT assume coverage if not explicitly stated.
    - If not mentioned, say: "Not specified in policy wording".
    - Compare insurer by insurer.

    FORMAT STRICTLY AS:

    INSURER: <Company Name>
    - Coverage:
    - Conditions:
    - Risk Impact:
    - Notes:

    Then final recommendation.

    POLICY CLAUSES:
    ${context}
  `;
}

export function buildPolicyPrompt(question, chunks) {
  const context = chunks.map((c, i) => `(${i+1}) ${c.content}`).join("\n");

  return `
You are an insurance policy expert advising insurers.

Question:
${question}

IMPORTANT:
- Answer strictly based on the clauses provided below.
- If something is not explicitly stated in the clauses, say:
  "Not explicitly mentioned in policy wording".
- Do NOT assume standard insurance coverage unless written in clauses.

Policy Evidence:
${context}

Answer in the following format:

1. Direct Answer (Is it covered? base vs addon)
2. Conditions or exclusions
3. Risk or cost impact for insurer
4. Suggestions for policy or pricing improvement

If coverage is not in base policy but available via add-on,
clearly state that add-on name and requirement.
`;
}

export function buildPolicyImprovementPrompt(policyText) {
  return `
You are an insurance product strategist and actuarial analyst.

Analyze the policy wording and suggest:

1. Major loss drivers and high-risk claim areas
2. Coverage gaps that can cause disputes or dissatisfaction
3. Add-ons that can increase premium revenue
4. Pricing, deductible or underwriting strategies to reduce loss ratio
5. Competitive differentiation opportunities

Focus on insurer profitability and product design, not customer advice.

IMPORTANT:
- Answer strictly based on the clauses provided below.
- If something is not explicitly stated in the clauses, say:
  "Not explicitly mentioned in policy wording".
- Do NOT assume standard insurance coverage unless written in clauses.

Policy Text:
${policyText}
`;
}





