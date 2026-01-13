export function extractMetadata({ fileName, fullPath }) {
  
  // remove double .pdf
  const cleanName = fileName.replace(/\.pdf$/i, "").replace(/\.pdf$/i, "");
  const parts = cleanName.toUpperCase().split("__");
  const full = parts.join("_");

  const folders = fullPath.toUpperCase().split(/[\\/]/);

  const company = parts[0];
  const isAddon =
    folders.includes("ADDONS") ||
    parts[1] === "ADDON";

  let lob = "MOTOR";
  let product = null;
  let policyType = null;
  let addonType = null;

  // ---- PRODUCT ----
  if (full.includes("PRIVATE_CAR")) product = "PRIVATE_CAR";
  else if (full.includes("TWO_WHEELER")) product = "TWO_WHEELER";
  else if (full.includes("PCV")) product = "PCV";
  else if (full.includes("GCV")) product = "GCV";

  // ---- POLICY TYPE ----
  if (full.includes("PACKAGE_POLICY")) policyType = "PACKAGE_POLICY";
  else if (full.includes("BUNDLED_POLICY")) policyType = "BUNDLED_POLICY";
  else if (full.includes("STANDALONE_OWN_DAMAGE") || full.includes("SAOD"))
    policyType = "SAOD_POLICY";
  else if (full.includes("LIABILITY_ONLY")) policyType = "LIABILITY_ONLY";

  // ---- ADDON TYPE ----
  if (isAddon) {
  const folderStr = folders.join("_");

  if (folderStr.includes("ENGINE")) addonType = "ENGINE_PROTECT";
  else if (folderStr.includes("ZERO")) addonType = "ZERO_DEPRECIATION";
  else if (folderStr.includes("TYRE")) addonType = "TYRE_SECURE";
  else if (folderStr.includes("ROAD")) addonType = "ROADSIDE_ASSISTANCE";
  else if (folderStr.includes("FASTAG")) addonType = "FASTAG";
  else if (folderStr.includes("PERSONAL")) addonType = "PERSONAL_BELONGINGS";
  else if (folderStr.includes("KEY")) addonType = "KEY_PROTECT";
  else addonType = "OTHER_ADDON";
}

  if (!company || !product || !policyType) {
    console.warn("⚠ BAD METADATA:", fileName);
    return null;
  }

  return {
    company,
    lob,
    product,
    policyType,
    policyClass: isAddon ? "ADDON" : "BASE",
    addonType,
    file: fileName
  };
}
