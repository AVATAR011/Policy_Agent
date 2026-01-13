import fs from "fs";
import Database from "better-sqlite3";
import { pipeline } from "@xenova/transformers";
import { VECTOR_DB_PATH } from "../server/config/db.js";

const DATA_PATH = "./output/processed_chunks.json";

const db = new Database(VECTOR_DB_PATH);

db.prepare(`
  CREATE TABLE IF NOT EXISTS vectors (
    id TEXT PRIMARY KEY,
    embedding TEXT,
    content TEXT,
    metadata TEXT
  )
`).run();

async function run() {
  console.log("Loading embedding model...");
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

  const insert = db.prepare(`
    INSERT OR REPLACE INTO vectors (id, embedding, content, metadata)
    VALUES (?, ?, ?, ?)
  `);

  console.log("Storing embeddings...");

  for (let i = 0; i < data.length; i++) {
    const r = data[i];

    const out = await embedder(r.content, {
      pooling: "mean",
      normalize: true
    });

    insert.run(
      r.id,
      JSON.stringify(Array.from(out.data)),
      r.content,
      JSON.stringify({ ...r.metadata, section: r.section })
    );

    if (i % 50 === 0) console.log(`Stored ${i}/${data.length}`);
  }

  console.log("Vector DB ready in SQLite");
}

run();
