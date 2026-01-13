import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { extractText } from "../src/server/utils/pdf.js";
import { cleanText } from "../src/server/utils/cleaner.js";
import { extractMetadata } from "../src/server/utils/metadata.js";
import { splitIntoSections } from "../src/server/utils/sectionSplitter.js";
import { chunkText } from "../src/server/utils/chunker.js";

const ROOT = path.resolve("../insurance_data");
const OUTPUT = path.resolve("./output/processed_chunks_v2.json");

let results = [];

async function walk(dir) {
  const files = await fs.readdir(dir);

  for (let f of files) {
    const full = path.join(dir, f);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) await walk(full);
    else if (f.toLowerCase().endsWith(".pdf")) await processFile(full);
  }
}

async function processFile(filePath) {
  console.log("Processing:", filePath);

  let text = await extractText(filePath);
  text = cleanText(text);

  const metadata = extractMetadata(filePath);
  const sections = splitIntoSections(text);

  for (let s of sections) {
    const chunks = chunkText(s.text);

    for (let c of chunks) {
      results.push({
        id: uuidv4(),
        content: c,
        section: s.section,
        metadata
      });
    }
  }
}

(async () => {
  await walk(ROOT);
  await fs.ensureDir("./output");
  await fs.writeJSON(OUTPUT, results, { spaces: 2 });
  console.log("DONE. Total chunks:", results.length);
})();
