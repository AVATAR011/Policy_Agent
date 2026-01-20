export declare const OpenAIRecommendJsonSchema: {
    readonly name: "bundle_recommendation";
    readonly strict: true;
    readonly schema: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["request_id", "bundles"];
        readonly properties: {
            readonly request_id: {
                readonly type: "string";
            };
            readonly bundles: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["value", "protection_plus", "low_premium"];
                readonly properties: {
                    readonly value: {
                        readonly $ref: "#/$defs/bundle";
                    };
                    readonly protection_plus: {
                        readonly $ref: "#/$defs/bundle";
                    };
                    readonly low_premium: {
                        readonly $ref: "#/$defs/bundle";
                    };
                };
            };
        };
        readonly $defs: {
            readonly addon: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["name", "rationale", "expected_claim_impact", "pricing_impact", "underwriting_rules"];
                readonly properties: {
                    readonly name: {
                        readonly type: "string";
                    };
                    readonly rationale: {
                        readonly type: "string";
                    };
                    readonly expected_claim_impact: {
                        readonly type: "string";
                        readonly enum: readonly ["decrease", "neutral", "increase"];
                    };
                    readonly pricing_impact: {
                        readonly type: "string";
                        readonly enum: readonly ["low", "medium", "high"];
                    };
                    readonly underwriting_rules: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
            };
            readonly bundle: {
                readonly type: "object";
                readonly additionalProperties: false;
                readonly required: readonly ["bundle_name", "base_policy_type", "addons", "deductible_strategy", "premium_estimate_band", "risk_score", "attach_probability", "loss_ratio_impact_estimate", "compliance_notes", "explanation_customer", "explanation_insurer", "follow_up_questions"];
                readonly properties: {
                    readonly bundle_name: {
                        readonly type: "string";
                    };
                    readonly base_policy_type: {
                        readonly type: "string";
                        readonly enum: readonly ["TP", "Comprehensive"];
                    };
                    readonly addons: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly $ref: "#/$defs/addon";
                        };
                    };
                    readonly deductible_strategy: {
                        readonly type: "string";
                    };
                    readonly premium_estimate_band: {
                        readonly type: "string";
                        readonly enum: readonly ["low", "medium", "high"];
                    };
                    readonly risk_score: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly maximum: 100;
                    };
                    readonly attach_probability: {
                        readonly type: "number";
                        readonly minimum: 0;
                        readonly maximum: 1;
                    };
                    readonly loss_ratio_impact_estimate: {
                        readonly type: "string";
                        readonly enum: readonly ["decrease", "neutral", "increase"];
                    };
                    readonly compliance_notes: {
                        readonly type: "array";
                        readonly minItems: 1;
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly explanation_customer: {
                        readonly type: "string";
                    };
                    readonly explanation_insurer: {
                        readonly type: "string";
                    };
                    readonly follow_up_questions: {
                        readonly type: "array";
                        readonly maxItems: 3;
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
            };
        };
    };
};
export declare const OpenAIProductJsonSchema: {
    readonly name: "product_generation";
    readonly strict: true;
    readonly schema: {
        readonly type: "object";
        readonly additionalProperties: false;
        readonly required: readonly ["products"];
        readonly properties: {
            readonly products: {
                readonly type: "array";
                readonly minItems: 1;
                readonly items: {
                    readonly type: "object";
                    readonly additionalProperties: false;
                    readonly required: readonly ["product_name", "positioning", "target_segment", "coverage", "addons", "pricing_strategy", "risk_controls", "claims_experience", "differentiation", "explanation_insurer", "portfolio_fit", "risk_tradeoffs", "regulatory_notes", "growth_strategy"];
                    readonly properties: {
                        readonly product_name: {
                            readonly type: "string";
                        };
                        readonly positioning: {
                            readonly type: "string";
                        };
                        readonly target_segment: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly coverage: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly addons: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly pricing_strategy: {
                            readonly type: "string";
                        };
                        readonly risk_controls: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly claims_experience: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly differentiation: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly explanation_insurer: {
                            readonly type: "string";
                        };
                        readonly portfolio_fit: {
                            readonly type: "string";
                        };
                        readonly growth_strategy: {
                            readonly type: "string";
                        };
                        readonly risk_tradeoffs: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                        readonly regulatory_notes: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=openaiSchema.d.ts.map