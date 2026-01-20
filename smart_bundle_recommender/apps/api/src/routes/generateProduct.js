import { ZodError, z } from "zod";
import { stableHash } from "../utils/hash.js";
import { getCache, setCache } from "../cache/redis.js";
import { callOpenAI } from "../llm/openai.js";
import { buildProductCandidates } from "../engine/productCandidates.js";
import { db } from "../db/sqlite.js";
export const GenerateProductSchema = z.object({
    generation_mode: z.literal("insurer_product_design"),
    lifecycle: z.string(),
    portfolio_context: z.any(),
    business_strategy: z.any(),
    competitor_landscape: z.any(),
    product_constraints: z.any(),
});
export const generateProductRoutes = async (app) => {
    app.post("/generate-product", async (req, reply) => {
        try {
            const requestId = crypto.randomUUID();
            const parsed = GenerateProductSchema.parse(req.body);
            const cacheKey = "product:" +
                stableHash({
                    portfolio: parsed.portfolio_context,
                    strategy: parsed.business_strategy,
                    market: parsed.competitor_landscape,
                    constraints: parsed.product_constraints,
                });
            const cached = await getCache(cacheKey);
            if (cached)
                return reply.send(JSON.parse(cached));
            // ----------------------------------
            // 1️⃣ Build deterministic candidates
            // ----------------------------------
            const candidates = buildProductCandidates(parsed);
            // ----------------------------------
            // 2️⃣ LLM synthesis
            // ----------------------------------
            const { validated } = await callOpenAI({
                requestId,
                mode: "product_generation",
                input: parsed,
                candidates,
            });
            // ----------------------------------
            // 3️⃣ Persist
            // ----------------------------------
            db.saveQuote({
                request_id: requestId,
                lifecycle: parsed.lifecycle,
                input_json: parsed,
                output_json: validated,
            });
            await setCache(cacheKey, JSON.stringify(validated), 3600);
            return reply.send(validated);
        }
        catch (e) {
            if (e instanceof ZodError) {
                return reply.code(400).send({ error: "VALIDATION_ERROR", issues: e.issues });
            }
            req.log.error(e);
            return reply.code(500).send({ error: "INTERNAL_ERROR" });
        }
    });
};
