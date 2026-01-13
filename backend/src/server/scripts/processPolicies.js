import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { extractText } from "../utils/pdf.js";
import { splitIntoSections } from "../utils/sectionSplitter.js";
import { chunkText } from "../utils/chunker.js";
import { cleanRawText } from "../utils/textCleaner.js";
import { extractMetadata } from "../utils/metadata.js";

const ROOT = path.resolve(process.cwd(), "insurance_data");
const OUTPUT = path.resolve("./output/processed_chunks.json");

let results = [];

// ---- WALK FOLDERS ----
async function walk(dir) {
  const files = await fs.readdir(dir);

  for (let f of files) {
    const full = path.join(dir, f);
    const stat = await fs.stat(full);

    if (stat.isDirectory()) {
      if (path.basename(full).toUpperCase() === "PROSPECTUS") continue;
      await walk(full);
    } else if (f.endsWith(".pdf")) {
      if (f.includes("__PROSPECTUS")) continue;
      await processFile(full);
    }
  }
}

// ---- PROCESS PDF ----
async function processFile(filePath) {

  console.log("📄 Processing:", path.basename(filePath));

  const raw = await extractText(filePath);
  const text = cleanRawText(raw);

  console.log("RAW:", raw.length, "CLEAN:", text.length);

  if (!text || text.length < 50) {
    console.warn("⚠ Too little text:", filePath);
    return;
  }

  const sections = splitIntoSections(text);
  console.log("SECTIONS:", sections.map(s => s.section));

  const metadata = extractMetadata({
    fileName: path.basename(filePath),
    fullPath: filePath
  });
  if (!metadata) return;

  for (let s of sections) {
    const chunks = chunkText(s.text);

    console.log("CHUNKS:", chunks.length, "SECTION:", s.section);

    for (let c of chunks) {
      if (!c || c.length < 60) continue;

      results.push({
        id: uuidv4(),
        content: c.trim(),
        section: s.section,
        metadata: {...metadata}
      });
    }
  }
}


// ---- RUN ----
(async () => {
  await walk(ROOT);
  await fs.ensureDir("./output");
  await fs.writeJSON(OUTPUT, results, { spaces: 2 });
  console.log("DONE. Total chunks:", results.length);
})();
