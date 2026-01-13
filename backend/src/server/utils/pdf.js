import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractText(filePath) {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(it => it.str).join(" ");
      fullText += pageText + "\n\n";
    }

    let txt = fullText;

    txt = txt.replace(/([a-z,;:])\s*\n\s*([a-z])/gi, "$1 $2");
    txt = txt.replace(/\n{3,}/g, "\n\n");
    txt = txt.replace(/\s{2,}/g, " ");

    return txt;

  } catch (err) {
    console.error("❌ PDF extract failed:", filePath);
    console.error(err);
    return "";
  }
}
