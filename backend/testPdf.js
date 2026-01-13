import { extractText } from "./src/server/utils/pdf.js";

const txt = await extractText(
  "insurance_data/HDFCERGO/MOTOR/TWO_WHEELER/SAOD_POLICY/base_policy/HDFCERGO__MOTOR__TWO_WHEELER_STANDALONE_OWN_DAMAGE__v1__2019.pdf.pdf"
);

console.log("LEN:", txt.length);
console.log(txt.slice(0, 500));
