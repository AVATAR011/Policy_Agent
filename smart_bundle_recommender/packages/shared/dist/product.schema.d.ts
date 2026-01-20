import { z } from "zod";
export declare const ProductSchema: z.ZodObject<{
    product_name: z.ZodString;
    positioning: z.ZodString;
    target_segment: z.ZodArray<z.ZodString, "many">;
    coverage: z.ZodArray<z.ZodString, "many">;
    addons: z.ZodArray<z.ZodString, "many">;
    pricing_strategy: z.ZodString;
    risk_controls: z.ZodArray<z.ZodString, "many">;
    claims_experience: z.ZodArray<z.ZodString, "many">;
    differentiation: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    addons: string[];
    product_name: string;
    positioning: string;
    target_segment: string[];
    coverage: string[];
    pricing_strategy: string;
    risk_controls: string[];
    claims_experience: string[];
    differentiation: string[];
}, {
    addons: string[];
    product_name: string;
    positioning: string;
    target_segment: string[];
    coverage: string[];
    pricing_strategy: string;
    risk_controls: string[];
    claims_experience: string[];
    differentiation: string[];
}>;
export declare const ProductResponseSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        product_name: z.ZodString;
        positioning: z.ZodString;
        target_segment: z.ZodArray<z.ZodString, "many">;
        coverage: z.ZodArray<z.ZodString, "many">;
        addons: z.ZodArray<z.ZodString, "many">;
        pricing_strategy: z.ZodString;
        risk_controls: z.ZodArray<z.ZodString, "many">;
        claims_experience: z.ZodArray<z.ZodString, "many">;
        differentiation: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        addons: string[];
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
    }, {
        addons: string[];
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    products: {
        addons: string[];
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
    }[];
}, {
    products: {
        addons: string[];
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
    }[];
}>;
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
                    readonly required: readonly ["product_name", "positioning", "target_segment", "coverage", "addons", "pricing_strategy", "risk_controls", "claims_experience", "differentiation"];
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
                    };
                };
            };
        };
    };
};
//# sourceMappingURL=product.schema.d.ts.map