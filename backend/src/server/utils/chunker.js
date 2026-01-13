export function chunkText(text, max = 900) {

  const splits = text.split(
    /(?=\n\d+\.\s)|(?=\n\([a-z]\))|(?=\n[a-z]\))|(?=\n- )|(?=Provided that)|(?=Subject to)|(?=Notwithstanding)/i
  );

  let chunks = [];
  let buf = "";

  for (let part of splits) {

    part = part.trim();
    if (!part) continue;

    if ((buf + part).length > max) {
      if (buf.trim()) chunks.push(buf.trim());
      buf = part;
    } else {
      buf += "\n" + part;
    }
  }

  if (buf.trim()) chunks.push(buf.trim());

  return chunks;
}
