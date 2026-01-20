export const OpenAIRecommendJsonSchema = {
    name: "bundle_recommendation",
    strict: true,
    schema: {
        type: "object",
        additionalProperties: false,
        required: ["request_id", "bundles"],
        properties: {
            request_id: { type: "string" },
            bundles: {
                type: "object",
                additionalProperties: false,
                required: ["value", "protection_plus", "low_premium"],
                properties: {
                    value: { $ref: "#/$defs/bundle" },
                    protection_plus: { $ref: "#/$defs/bundle" },
                    low_premium: { $ref: "#/$defs/bundle" },
                },
            },
        },
        $defs: {
            addon: {
                type: "object",
                additionalProperties: false,
                required: [
                    "name",
                    "rationale",
                    "expected_claim_impact",
                    "pricing_impact",
                    "underwriting_rules",
                ],
                properties: {
                    name: { type: "string" },
                    rationale: { type: "string" },
                    expected_claim_impact: {
                        type: "string",
                        enum: ["decrease", "neutral", "increase"],
                    },
                    pricing_impact: { type: "string", enum: ["low", "medium", "high"] },
                    underwriting_rules: { type: "array", items: { type: "string" } },
                },
            },
            bundle: {
                type: "object",
                additionalProperties: false,
                required: [
                    "bundle_name",
                    "base_policy_type",
                    "addons",
                    "deductible_strategy",
                    "premium_estimate_band",
                    "risk_score",
                    "attach_probability",
                    "loss_ratio_impact_estimate",
                    "compliance_notes",
                    "explanation_customer",
                    "explanation_insurer",
                    "follow_up_questions",
                ],
                properties: {
                    bundle_name: { type: "string" },
                    base_policy_type: { type: "string", enum: ["TP", "Comprehensive"] },
                    addons: {
                        type: "array",
                        minItems: 1,
                        items: { $ref: "#/$defs/addon" },
                    },
                    deductible_strategy: { type: "string" },
                    premium_estimate_band: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                    },
                    risk_score: { type: "number", minimum: 0, maximum: 100 },
                    attach_probability: { type: "number", minimum: 0, maximum: 1 },
                    loss_ratio_impact_estimate: {
                        type: "string",
                        enum: ["decrease", "neutral", "increase"],
                    },
                    compliance_notes: {
                        type: "array",
                        minItems: 1,
                        items: { type: "string" },
                    },
                    explanation_customer: { type: "string" },
                    explanation_insurer: { type: "string" },
                    follow_up_questions: {
                        type: "array",
                        maxItems: 3,
                        items: { type: "string" },
                    },
                },
            },
        },
    },
};
// -------------------------------
// Product Generation JSON Schema
// -------------------------------
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
