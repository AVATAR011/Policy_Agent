import { RecommendRequestSchema } from "@spr/shared";
import { ADDONS, baseBundleTemplates } from "../engine/candidates";
import { applyRules } from "../engine/rules";
import { scoreAddon, bandFromPrice } from "../engine/scoring";
import { callOpenAI } from "../llm/openai";
import { getCache, setCache } from "../cache/redis";
import { stableHash } from "../utils/hash";
import { db } from "../db/sqlite";
import { ZodError } from "zod";
function computeBundleRisk(addons, ctx) {
    if (!addons.length)
        return 15; // base TP-only risk floor
    const addonRisk = addons.reduce((sum, a) => sum + (a.riskScore ?? 0), 0) / addons.length;
    const telematicsPenalty = (ctx.telematics?.overspeed_score ?? 0) > 70 ? 10 : 0;
    const claimPenalty = (ctx.customer_risk?.claim_count_3y ?? 0) > 1 ? 15 : 0;
    return Math.min(100, Math.round(addonRisk + telematicsPenalty + claimPenalty));
}
export const recommendRoutes = async (app) => {
    app.post("/recommend-bundles", async (req, reply) => {
        try {
            const requestId = req.body?.request_id || crypto.randomUUID();
            const parsed = RecommendRequestSchema.parse({
                ...req.body,
                request_id: requestId,
            });
            const t0 = Date.now();
            const ttlSeconds = parsed.lifecycle === "renewal" ? 1800 : 600;
            const cacheKey = "rec:" +
                stableHash({
                    lifecycle: parsed.lifecycle,
                    vehicle: parsed.vehicle,
                    customer_risk: parsed.customer_risk,
                    telematics: parsed.telematics ?? {},
                    competitor_gaps: parsed.competitor_gaps ?? [],
                    constraints: parsed.constraints ?? {},
                });
            const cached = await getCache(cacheKey);
            if (cached) {
                app.log.info({ request_id: requestId, cached: true }, "recommendation cache hit");
                return reply.send(JSON.parse(cached));
            }
            const ctx = {
                lifecycle: parsed.lifecycle,
                vehicle: parsed.vehicle,
                customer_risk: parsed.customer_risk,
                telematics: parsed.telematics ?? {},
                competitor_gaps: parsed.competitor_gaps ?? [],
                constraints: parsed.constraints ?? {},
            };
            // 1) RULES + 2) SCORING => candidate addons
            const scored = ADDONS.filter((a) => a.baseEligibility(ctx))
                .map((a) => {
                const r = applyRules(ctx, a.name);
                const s = scoreAddon(ctx, a.name);
                return { name: a.name, ok: r.ok, rule_reasons: r.reasons, ...s };
            })
                .filter((x) => x.ok);
            // bundle candidates for LLM (keep deterministic)
            const templates = baseBundleTemplates();
            const candidates = templates.map((tpl) => {
                // simple selection strategy:
                const want = tpl.key === "protection_plus" ? 5 : tpl.key === "value" ? 4 : 2;
                const sorted = [...scored].sort((a, b) => {
                    if (tpl.key === "low_premium")
                        return a.priceScore - b.priceScore || b.fitScore - a.fitScore;
                    if (tpl.key === "protection_plus")
                        return b.fitScore + b.riskScore - (a.fitScore + a.riskScore);
                    return b.fitScore - a.fitScore || a.priceScore - b.priceScore;
                });
                // enforce must-have
                const must = new Set(ctx.constraints?.must_have_addons ?? []);
                const chosen = [];
                for (const m of must) {
                    const hit = sorted.find((s) => s.name === m);
                    if (hit)
                        chosen.push(hit);
                }
                for (const s of sorted) {
                    if (chosen.find((c) => c.name === s.name))
                        continue;
                    if (chosen.length >= want)
                        break;
                    chosen.push(s);
                }
                const priceScoreSum = chosen.reduce((n, x) => n + (x.priceScore ?? 0), 0);
                const bundleRisk = computeBundleRisk(chosen, ctx);
                return {
                    key: tpl.key,
                    base_policy_type: tpl.base_policy_type,
                    premium_estimate_band: bandFromPrice(priceScoreSum, ctx.constraints?.budget_band),
                    risk_score: bundleRisk,
                    addons: chosen,
                };
            });
            // 3) LLM: narratives + final ranking + insurer/customer explanation
            const { validated, latencyMs, usage } = await callOpenAI({
                requestId,
                lifecycle: parsed.lifecycle,
                vehicle: parsed.vehicle,
                customer_risk: parsed.customer_risk,
                telematics: parsed.telematics ?? {},
                competitor_gaps: parsed.competitor_gaps ?? [],
                constraints: parsed.constraints ?? {},
                candidates,
            });
            // persist quote summary
            db.saveQuote({
                request_id: requestId,
                lifecycle: parsed.lifecycle,
                input_json: parsed,
                output_json: validated,
            });
            await setCache(cacheKey, JSON.stringify(validated), ttlSeconds);
            const totalMs = Date.now() - t0;
            app.log.info({
                request_id: requestId,
                latency_ms: totalMs,
                llm_ms: latencyMs,
                usage,
                bundle_ids: Object.values(validated.bundles).map((b) => b.bundle_name),
            }, "recommendation done");
            return reply.send(validated);
        }
        catch (e) {
            if (e instanceof ZodError) {
                return reply.code(400).send({
                    error: "VALIDATION_ERROR",
                    issues: e.issues,
                });
            }
            req.log.error(e);
            return reply.code(500).send({ error: "INTERNAL_ERROR" });
        }
    });
};
