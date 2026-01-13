export function buildImprovementPrompt({
  baseClauses,
  addonClauses,
  targetMarket,
  businessGoal
}) {

  const baseText = baseClauses.slice(0, 10).map(r => r.text).join("\n");
  const addonText = addonClauses.slice(0, 10).map(r => r.text).join("\n");

  return `
You are an insurance product design expert.

TARGET MARKET:
${targetMarket}

BUSINESS GOAL:
${businessGoal}

CURRENT BASE POLICY:
${baseText}

AVAILABLE ADD-ONS:
${addonText}

Design an improved insurance product:

Provide:
1. Recommended coverage changes
2. New or modified add-ons
3. Pricing logic (qualitative)
4. Risk control strategies
5. Customer value proposition
`;
}
