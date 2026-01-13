export function cleanRawText(text) {
  if (!text) return "";

  let t = text;

  t = t.replace(/\n\s*page\s*\d+\s*(of\s*\d+)?/gi, "\n");
  t = t.replace(/registered office.*?\n/gi, "\n");
  t = t.replace(/corporate office.*?\n/gi, "\n");

  t = t.replace(/\S+@\S+\.\S+/g, " ");
  t = t.replace(/https?:\/\/\S+/g, " ");

  t = t.replace(/\.{5,}/g, " ");
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/\n{3,}/g, "\n\n");

  return t.trim();
}
