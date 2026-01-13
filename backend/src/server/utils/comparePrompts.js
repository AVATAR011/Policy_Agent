export function buildComparisonPrompt(question, groupedClauses) {

  let context = "";

  for (let company in groupedClauses) {
    context += `\n\n### ${company} POLICY CLAUSES:\n`;
    groupedClauses[company].forEach((c, i) => {
      context += `Clause ${i + 1}: ${c}\n`;
    });
  }

  return `
You are an insurance product comparison expert.

Compare the policies strictly using the clauses below.

QUESTION:
${question}

POLICY DATA:
${context}

Provide:
1. Coverage comparison (table format)
2. Major exclusions differences
3. Which policy is more customer-friendly
4. Which policy is more risk-prone for insurer
5. Product design insights
`;
}
