export function buildPolicyCompPrompt(question, results, claimsSummary = null, pricingSummary = null) {
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

  const claimsContext = claimsSummary
    ? `
  CLAIMS INSIGHTS (USE FOR RISK ANALYSIS ONLY):

  Top Risky Coverages:
  ${claimsSummary.topCoverages.map(c =>
    `- ${c.coverage_name}: ${c.total_claims} claims | Risk Score: ${c.risk_score}`
  ).join("\n")}

  Risky Policy Types:
  ${claimsSummary.riskyPolicies.map(p =>
    `- ${p.policy_type}: ${p.total_claims} claims | Risk Score: ${p.risk_score}`
  ).join("\n")}

  IMPORTANT:
  - Use this data only when discussing "Risk Impact".
  - Do NOT invent numerical values.
  `
    : "";

  const pricingContext = pricingSummary ? `
    PRICING INSIGHTS:

    Top Addon Pricing:
    ${pricingSummary.addonPricing.map(a =>
      `- ${a.addon_name}: Avg Price ₹${a.avg_addon_price}, Risk ${a.loss_band}, Action: ${a.pricing_action}`
    ).join("\n")}

    High Cost Segments:
    ${pricingSummary.segmentPricing.map(s =>
      `- ${s.policy_type} | ${s.vehicle_age_band} | ${s.location_zone}: 
        Avg Base ₹${s.avg_base_rate}, Risk ${s.loss_band}, Action: ${s.pricing_action}`
    ).join("\n")}
    ` : "";





  return `
    You are an insurance product analyst comparing multiple insurers.

    Question:
    ${question}

    Below are policy clauses from different insurers.

    TASK:
    You MUST compare insurers strictly insurer-by-insurer.

    For EACH insurer:
    - Extract only what is explicitly stated in its policy clauses.
    - Do NOT infer or assume missing coverage.
    - If something is not stated, write exactly:
      "Not specified in policy wording".

    You MUST follow the exact output format below.
    Do NOT add extra sections.
    Do NOT add a generic summary before insurer blocks.

    FORMAT (STRICT):

    INSURER: <Company Name>
    - Coverage:
    - Conditions:
    - Risk Impact (use CLAIMS INSIGHTS if relevant):
    - Notes:

    Repeat this block for every insurer.

    FINAL RECOMMENDATION:
    <One concise paragraph comparing strengths and weaknesses>

    IMPORTANT RULES:
    - Never merge insurers into one paragraph.
    - Never answer outside the format.
    - Never repeat the question.
    - Never generate a standalone explanation.
    - If claims or pricing insights exist, always use them in Risk Impact and Suggestions.
    - Never say "Not specified" if analytics data is available.


    FORMAT STRICTLY AS:

    INSURER: <Company Name>
    - Coverage:
    - Conditions:
    - Risk Impact:
    - Notes:

    Then final recommendation.

    POLICY CLAUSES:
    ${context}

    ${claimsContext}

    ${pricingContext}
  `;
}

export function buildPolicyPrompt(question, chunks, claimsSummary = null, pricingSummary = null) {
  const context = chunks.map((c, i) => `(${i+1}) ${c.content}`).join("\n");

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


  return `
You are an insurance policy expert advising insurers.

Question:
${question}

IMPORTANT:
- Answer strictly based on clauses + claims insights if provided.
- If something is not explicitly stated, say:
  "Not explicitly mentioned in policy wording".
- If claims or pricing insights exist, always use them in Risk Impact and Suggestions.
- Never say "Not specified" if analytics data is available.


Policy Evidence:
${context}

${claimsContext}

PRICING SIGNALS:
${JSON.stringify(pricingSummary, null, 2)}


Answer in the following format:

1. Direct Answer
2. Conditions or exclusions
3. Risk or cost impact for insurer (USE CLAIMS DATA IF AVAILABLE)
4. Suggestions for policy or pricing improvement
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





