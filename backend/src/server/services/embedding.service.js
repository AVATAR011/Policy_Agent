import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function embedQuery(text) {
  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const out = await embedder(text, { pooling: "mean", normalize: true });
  return Array.from(out.data);
}
