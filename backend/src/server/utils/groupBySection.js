export function groupBySection(rows) {
  const grouped = {};

  for (const r of rows) {
    if (!grouped[r.section]) grouped[r.section] = [];
    grouped[r.section].push(r.content);
  }

  return grouped;
}
