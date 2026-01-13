import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("./output/processed_chunks.json");

function inferProductFromFile(file) {
  if (!file || typeof file !== "string") return "UNKNOWN";
  const parts = file.split("__");
  if (parts.length >= 3) {
    const token = parts[2].split("_")[0];
    if (token) return token.toUpperCase();
  }
  const m = file.match(/__([A-Za-z0-9]{2,10})_/);
  if (m) return m[1].toUpperCase();
  return "UNKNOWN";
}

function inferPolicyFromFile(file) {
  if (!file || typeof file !== "string") return "UNKNOWN";
  const parts = file.split("__");
  if (parts.length >= 3) {
    const tail = parts[2];
    const tokens = tail.split("_");
    if (tokens.length >= 2) {
      const policy = tokens.slice(1).join("_");
      if (policy) return policy.toUpperCase();
    }
  }
  const m = file.match(/__[^_]+_([A-Z0-9_]+)__v/i);
  if (m) return m[1].toUpperCase();
  const common = [
    'LIABILITY_ONLY','PACKAGE_POLICY','BUNDLED_POLICY','PERSONAL_ACCIDENT_ONLY_OWNER_DRIVER',
    'OWNER_DRIVER_ONLY','LIABILITY_ONLY_3YR','LIABILITY_ONLY_5YR','PACKAGE_POLICY_LONG_TERM',
    'STANDALONE_OWN_DAMAGE','SAOD_POLICY'
  ];
  const up = file.toUpperCase();
  for (const c of common) if (up.includes(c)) return c;
  return "UNKNOWN";
}

const dataRaw = fs.readFileSync(DATA_PATH, "utf-8");
const arr = JSON.parse(dataRaw);

let fixes = [];
for (let i = 0; i < arr.length; i++) {
  const r = arr[i];
  const meta = r.metadata || {};
  const prod = meta.product;
  let newProd = prod;

  if (typeof prod !== "string" || prod.trim() === "") {
    newProd = inferProductFromFile(meta.file);
    if (newProd === "UNKNOWN") {
      // fallback: stringify anything present
      if (prod != null) newProd = String(prod).toUpperCase();
      else newProd = "UNKNOWN";
    }
  } else {
    newProd = prod.trim();
  }

  if (newProd !== prod) {
    fixes.push({ index: i, id: r.id, old: prod, new: newProd, file: meta.file, field: 'product' });
    meta.product = newProd;
    r.metadata = meta;
  }

  // policyType
  const pol = meta.policyType;
  let newPol = pol;
  if (typeof pol !== 'string' || pol.trim() === '') {
    newPol = inferPolicyFromFile(meta.file);
    if (newPol === 'UNKNOWN') {
      if (pol != null) newPol = String(pol).toUpperCase();
      else newPol = 'UNKNOWN';
    }
  } else {
    newPol = pol.trim().toUpperCase();
  }

  if (newPol !== pol) {
    fixes.push({ index: i, id: r.id, old: pol, new: newPol, file: meta.file, field: 'policyType' });
    meta.policyType = newPol;
    r.metadata = meta;
  }
}

if (fixes.length === 0) {
  console.log("No product fixes needed.");
  process.exit(0);
}

// backup
const bakPath = DATA_PATH + ".bak." + Date.now();
fs.copyFileSync(DATA_PATH, bakPath);
fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2), "utf-8");

console.log(`Applied ${fixes.length} fixes. Backup saved at: ${bakPath}`);
console.log("Sample fixes:", fixes.slice(0, 10));
console.log("Done.");
