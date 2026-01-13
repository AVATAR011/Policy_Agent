import { searchVectors } from "./vector.service.js";

export async function comparePolicies({
  query,
  product,
  policyType,
  companies
}) {

  const results = {};

  for (const company of companies) {
    const rows = await searchVectors({
      query,
      company,
      product,
      policyType,
      topK: 6
    });

    results[company] = rows;
  }

  return results;
}
