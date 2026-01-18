import express from "express";
import { ragHandler } from "./rag.routes.js";
import { compareHandler } from "./compare.routes.js";
import { improveHandler } from "./improve.routes.js";
import { askLLM } from "../services/llm.service.js";

const router = express.Router();
let lastContext = null;


async function detectIntent(question) {
  const q = question.toLowerCase();
  if (
    q.includes("create policy") ||
    q.includes("generate policy") ||
    q.includes("design policy") ||
    q.includes("new policy")
  ) {
    return "generate_policy";
  }
  if (
    q.includes("compare") ||
    q.includes("difference between") ||
    q.includes("vs") ||
    q.includes("which is better")
  ) return "COMPARE";
  if (
    q.includes("improve") ||
    q.includes("profit") || 
    q.includes("design better") ||
    q.includes("suggest") ||
    q.includes("pricing")
  )
    return "IMPROVE";
  if (q.includes("covered") || q.includes("policy") || q.includes("claim"))
    return "RAG";

  return "CHAT";
}

function inferBaseFilters(question) {
  const q = question.toLowerCase();

  let product = null;
  let policyType = null;

  if (q.includes("private car") || q.includes("car")) product = "PRIVATE_CAR";
  if (q.includes("two wheeler") || q.includes("bike")) product = "TWO_WHEELER";

  if (q.includes("bundled")) policyType = "BUNDLED_POLICY";
  if (q.includes("package")) policyType = "PACKAGE_POLICY";
  if (q.includes("standalone") || q.includes("own damage")) policyType = "SAOD_POLICY";

  return { product, policyType };
}


/**
 * MAIN CHAT AGENT ENDPOINT
 */
router.post("/", async (req, res) => {
  try {
    let { messages, message, history } = req.body;
    if (Array.isArray(history)) {
      messages = history;
    }

    // ✅ Case 2: Postman sends single message
    if (!messages && message) {
      messages = [{ role: "user", content: message }];
    }

    // ❌ Still invalid
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array required" });
    }

    const rewritePrompt = `
      You are a conversation understanding assistant.

      Rewrite the LAST user message into a full standalone insurance question
      using the previous chat context.

      Conversation:
      ${messages.map(m => `${m.role}: ${m.content}`).join("\n")}

      Return ONLY the rewritten question.
    `;

    const rewritten = await askLLM({
      system: "You rewrite follow-up questions into full insurance queries.",
      user: rewritePrompt
    });

    const finalQuestion = rewritten.trim();

    const intent = detectIntent(finalQuestion);
    console.log("🧠 Intent:", intent);

    const { product, policyType } = inferBaseFilters(finalQuestion);
    // Fake req/res wrappers to reuse existing handlers
     const effectiveQuestion = finalQuestion;

    // If user says "compare", attach previous topic
    // if (intent === "COMPARE" && previousTopic) {
    //   effectiveQuestion = `Compare insurers regarding: ${previousTopic}`;
    // }
    const fakeReq = {
        body: {
            question:  effectiveQuestion,
            chatHistory: messages.slice(0,-1),
            product,
            policyType
        }
    };

    try {
        if (intent === "COMPARE") {
            return await compareHandler(fakeReq, res);
        }

        if (intent === "IMPROVE") {
            return await improveHandler(fakeReq, res);
        }
        if(intent === "generate_policy"){
          return await generatePolicyHandler(req, res);
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
