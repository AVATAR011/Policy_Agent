export function splitIntoSections(text) {

  if (!text || typeof text !== "string") return [];

  const rules = [
    { name: "DEFINITIONS", regex: /definitions?|meaning of words/i },
    { name: "COVER", regex: /section\s*i\b|own damage|what is covered/i },
    { name: "LIABILITY", regex: /section\s*ii\b|liability to third party/i },
    { name: "EXCLUSIONS", regex: /exclusions?|what is not covered/i },
    { name: "CONDITIONS", regex: /conditions?|duty of insured/i },
    { name: "ENDORSEMENT", regex: /^imt\.?\s*\d+|endorsement/i }
  ];

  let sections = [];
  let current = { section: "GENERAL", text: "" };

  for (let line of text.split("\n")) {

    let matched = false;

    for (let r of rules) {
      if (r.regex && r.regex.test(line)) {   // ✅ SAFE CHECK
        if (current.text.trim()) sections.push(current);
        current = { section: r.name, text: line + "\n" };
        matched = true;
        break;
      }
    }

    if (!matched) current.text += line + "\n";
  }

  if (current.text.trim()) sections.push(current);

  return sections.filter(s => s.text.length > 80);
}
