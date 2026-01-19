import OpenAI from "openai";
import {
  OpenAIRecommendJsonSchema,
  RecommendResponseSchema,
} from "@spr/shared";
import { SYSTEM_PROMPT, buildUserPrompt } from "@spr/shared";
import "dotenv/config";

console.log("------------------>", process.env.OPENAI_API_KEY);
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function callOpenAI(args: {
  requestId: string;
  lifecycle: "purchase" | "renewal";
  vehicle: any;
  customer_risk: any;
  telematics: any;
  competitor_gaps: any;
  constraints: any;
  candidates: any;
}) {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const user = buildUserPrompt({
    requestId: args.requestId,
    lifecycle: args.lifecycle,
    vehicle: args.vehicle,
    customer_risk: args.customer_risk,
    telematics: args.telematics,
    competitor_gaps: args.competitor_gaps,
    constraints: args.constraints,
    candidates: args.candidates,
  });

  const started = Date.now();

  const resp = await client.responses.create({
    model,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: user },
    ],
    text: {
      format: {
        type: "json_schema",
        name: OpenAIRecommendJsonSchema.name, // ✅ REQUIRED
        strict: true, // ✅ REQUIRED in many builds
        schema: OpenAIRecommendJsonSchema.schema, // ✅ pass the schema itself
      },
    },
  });

  const latencyMs = Date.now() - started;

  const jsonText = resp.output_text; // SDK helper for Responses API :contentReference[oaicite:3]{index=3}
  const parsed = JSON.parse(jsonText);

  const validated = RecommendResponseSchema.parse(parsed);

  const usage = (resp as any).usage;
  return { validated, latencyMs, usage };
}
