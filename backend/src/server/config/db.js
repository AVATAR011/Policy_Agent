import path from "path";
export const VECTOR_DB_PATH =
  path.resolve(process.cwd(), "src/server/vector_store.db");

export const CLAIMS_DB_PATH = "src/server/db/claims.db";
export const PRICING_DB_PATH = "src/server/db/pricing.db";