import { z } from "zod";
export const ProductSchema = z.object({
    product_name: z.string(),
    positioning: z.string(),
    target_segment: z.array(z.string()),
    coverage: z.array(z.string()),
    addons: z.array(z.string()),
    pricing_strategy: z.string(),
    risk_controls: z.array(z.string()),
    claims_experience: z.array(z.string()),
    differentiation: z.array(z.string()),
});
export const ProductResponseSchema = z.object({
    products: z.array(ProductSchema),
});
export const OpenAIProductJsonSchema = {
    name: "product_generation",
    strict: true,
    schema: {
        type: "object",
        additionalProperties: false,
        required: ["products"],
        properties: {
            products: {
                type: "array",
                minItems: 1,
                items: {
                    type: "object",
                    additionalProperties: false,
                    required: [
                        "product_name",
                        "positioning",
                        "target_segment",
                        "coverage",
                        "addons",
                        "pricing_strategy",
                        "risk_controls",
                        "claims_experience",
                        "differentiation",
                    ],
                    properties: {
                        product_name: { type: "string" },
                        positioning: { type: "string" },
                        target_segment: {
                            type: "array",
                            items: { type: "string" },
                        },
                        coverage: {
                            type: "array",
                            items: { type: "string" },
                        },
                        addons: {
                            type: "array",
                            items: { type: "string" },
                        },
                        pricing_strategy: { type: "string" },
                        risk_controls: {
                            type: "array",
                            items: { type: "string" },
                        },
                        claims_experience: {
                            type: "array",
                            items: { type: "string" },
                        },
                        differentiation: {
                            type: "array",
                            items: { type: "string" },
                        },
                    },
                },
            },
        },
    },
};
