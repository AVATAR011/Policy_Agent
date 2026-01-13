import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { cosineSimilarity } from "../utils/similarity.js";
import { embedQuery } from "./embedding.service.js";
import { VECTOR_DB_PATH } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(VECTOR_DB_PATH, { readonly: true });

// function cosineSim(a, b) {
//   let dot = 0, na = 0, nb = 0;
//   for (let i = 0; i < a.length; i++) {
//     dot += a[i] * b[i];
//     na += a[i] * a[i];
//     nb += b[i] * b[i];
//   }
//   return dot / (Math.sqrt(na) * Math.sqrt(nb));
// }

export async function searchVectors({
  query,
  company,
  product,
  policyType,
  policyClass,
  addonType,
  topK = 6,
}) {
  if (!query) throw new Error("Query missing for vector search");

  // 1. Embed the query
  const queryEmbedding = await embedQuery(query);

  // 2. Build metadata filter SQL
  const where = [];
  const params = [];
  const MIN_SCORE = 0.25;

  if (company) { where.push(`json_extract(metadata,'$.company') = ?`); params.push(company); }
  if (product) { where.push(`json_extract(metadata,'$.product') = ?`); params.push(product); }
  if (policyType) { where.push(`json_extract(metadata,'$.policyType') = ?`); params.push(policyType); }
  if (policyClass) { where.push(`json_extract(metadata,'$.policyClass') = ?`); params.push(policyClass); }
  if (addonType) { where.push(`json_extract(metadata,'$.addonType') = ?`); params.push(addonType); }

  const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";

  // 3. Fetch candidate rows (not similarity yet)
  const rows = db
    .prepare(`SELECT id, embedding, content, metadata FROM vectors ${whereSQL} LIMIT 1500`)
    .all(...params);

  // 4. Compute similarity in JS
  const scored = rows.map((r) => {
    const emb = JSON.parse(r.embedding);
    const score = cosineSimilarity(queryEmbedding, emb);
    return { ...r, score };
  });

  // 5. Sort & take topK
  scored.sort((a, b) => b.score - a.score);

  return scored.filter(r => r.score > MIN_SCORE).slice(0, topK).map(r => ({
  content: r.content,
  score: r.score,
  metadata: JSON.parse(r.metadata)   // ✅ VERY IMPORTANT
}));
}