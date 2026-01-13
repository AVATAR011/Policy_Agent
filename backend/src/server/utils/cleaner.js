export function cleanText(text) {
  return text
    .replace(/Page\s+\d+\s+of\s+\d+/gi, " ")
    .replace(/IRDAI.*?\n/gi, " ")
    .replace(/CIN:.*?\n/gi, " ")
    .replace(/www\.[^\s]+/gi, " ")
    .replace(/hello@[\w.]+/gi, " ")
    .replace(/\n{2,}/g, "\n\n")
    .trim();
}
