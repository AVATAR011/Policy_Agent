export function buildProductPrompt(input, candidates) {
    return `
You are an insurance product architect.

Design insurer-grade product blueprints.

Input:
${JSON.stringify(input, null, 2)}

Candidate Directions:
${JSON.stringify(candidates, null, 2)}

Return JSON only:

{
  "products": [
    {
      "product_name": "",
      "positioning": "",
      "target_segment": [],
      "coverage": [],
      "addons": [],
      "pricing_strategy": "",
      "risk_controls": [],
      "claims_experience": [],
      "differentiation": []
    }
  ]
}
`;
}
