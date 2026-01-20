import OpenAI from "openai";
import { buildProductPrompt } from "./productPrompt.js";
import {
  OpenAIRecommendJsonSchema,
  RecommendResponseSchema,
  OpenAIProductJsonSchema,
  ProductResponseSchema,
} from "@spr/shared";
import { SYSTEM_PROMPT, buildUserPrompt } from "@spr/shared";
import "dotenv/config";

console.log("------------------>", process.env.OPENAI_API_KEY);
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function callOpenAI(args: {
  requestId: string;
  mode: "bundle_recommendation" | "product_generation";

  // bundle mode
  lifecycle?: "purchase" | "renewal";
  vehicle?: any;
  customer_risk?: any;
  telematics?: any;
  competitor_gaps?: any;
  constraints?: any;

  // product mode
  input?: any;

  // shared
  candidates: any;
}) {

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  let userPrompt = "";
  let schema: any;
  let responseValidator: any;

  if (args.mode === "bundle_recommendation") {
    userPrompt = buildUserPrompt({
      requestId: args.requestId,
      lifecycle: args.lifecycle,
      vehicle: args.vehicle,
      customer_risk: args.customer_risk,
      telematics: args.telematics,
      competitor_gaps: args.competitor_gaps,
      constraints: args.constraints,
      candidates: args.candidates,
    });

    schema = OpenAIRecommendJsonSchema;
    responseValidator = RecommendResponseSchema;
  }

  if (args.mode === "product_generation") {
    userPrompt = buildProductPrompt(args.input, args.candidates);

    schema = OpenAIProductJsonSchema;
    responseValidator = ProductResponseSchema;
  }


  const started = Date.now();

  const resp = await client.responses.create({
    model,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    text: {
      format: {
        type: "json_schema",
        name: schema.name,
        strict: true,
        schema: schema.schema,
      },
    },

  });

  const latencyMs = Date.now() - started;

  const jsonText = resp.output_text; // SDK helper for Responses API :contentReference[oaicite:3]{index=3}
  const parsed = JSON.parse(jsonText);

  const validated = responseValidator.parse(parsed);


  const usage = (resp as any).usage;
  return { validated, latencyMs, usage };
}
