import express from "express";
import { ragHandler } from "./rag.routes.js";
import { compareHandler } from "./compare.routes.js";
import { improveHandler } from "./improve.routes.js";

const router = express.Router();

function detectIntent(text) {
  const q = text.toLowerCase();

  // ---- COMPARISON ----
  if (
    q.includes("compare") ||
    q.includes("which insurer") ||
    q.includes("best policy") ||
    q.includes("difference between") ||
    q.includes("vs") ||
    q.includes("better than")
  ) {
    return "compare";
  }

  // ---- PRODUCT IMPROVEMENT ----
  if (
    q.includes("improve") ||
    q.includes("profit") ||
    q.includes("loss") ||
    q.includes("pricing") ||
    q.includes("design") ||
    q.includes("recommend product") ||
    q.includes("how to increase") ||
    q.includes("business")
  ) {
    return "improve";
  }

  // ---- DEFAULT: POLICY Q&A ----
  return "rag";
}


/**
 * MAIN CHAT AGENT ENDPOINT
 */
router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const intent = detectIntent(message);

    console.log("🧠 Intent:", intent);

    // Fake req/res wrappers to reuse existing handlers
    const fakeReq = {
        body: {
            question: message,
            history,
            company: null,
            product: null,
            policyType: null,
            policyClass: null,
            addonType: null
        }
    };

    try {
        if (intent === "compare") {
            return await compareHandler(fakeReq, res);
        }

        if (intent === "improve") {
            return await improveHandler(fakeReq, res);
        }

        return await ragHandler(fakeReq, res);
    } catch (err) {
        console.error("HANDLER ERROR:", err);
        return res.status(500).json({ error: "Internal handler error" });
    }

  } catch (err) {
    console.error("CHAT ROUTE ERROR:", err);
    res.status(500).json({ error: "Chat processing failed" });
  }
});

export default router;
