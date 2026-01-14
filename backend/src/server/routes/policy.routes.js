import express from "express";
import fs from "fs-extra";
import path from "path";

const router = express.Router();
// Resolve path relative to where server.js is running (backend/src/server)
const DATA_ROOT = path.resolve(process.cwd(), "../insurance_data");

async function buildTree(currentPath) {
  const node = { files: [] };
  
  try {
    const items = await fs.readdir(currentPath);

    for (const item of items) {
      if (item.startsWith(".") || item === "desktop.ini") continue;
      
      const itemPath = path.join(currentPath, item);
      const stat = await fs.stat(itemPath);

      if (stat.isDirectory()) {
        if (item.toUpperCase() === "PROSPECTUS") continue;
        
        // Recursively build
        const childNode = await buildTree(itemPath);
        
        // Only attach folders if they (or their children) have files
        const hasFiles = childNode.files.length > 0 || Object.keys(childNode).length > 1;
        if (hasFiles) {
          node[item] = childNode;
        }

      } else {
        // ✅ Filter: Only show PDF files
        if (item.toLowerCase().endsWith(".pdf")) {
          node.files.push(item);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading ${currentPath}:`, err);
  }

  return node;
}

router.get("/", async (req, res) => {
  try {
    if (!fs.existsSync(DATA_ROOT)) {
      // Fallback for different CWD scenarios
      return res.status(404).json({ error: "Insurance data directory not found" });
    }
    const tree = await buildTree(DATA_ROOT);
    res.json(tree);
  } catch (err) {
    console.error("Policy Tree Error:", err);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

export default router;