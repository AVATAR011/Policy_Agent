import { z } from "zod";
export declare const ProductSchema: z.ZodObject<{
    product_name: z.ZodString;
    positioning: z.ZodString;
    target_segment: z.ZodArray<z.ZodString, "many">;
    coverage: z.ZodArray<z.ZodString, "many">;
    addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    pricing_strategy: z.ZodString;
    risk_controls: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    claims_experience: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    differentiation: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
    product_name: string;
    positioning: string;
    target_segment: string[];
    coverage: string[];
    pricing_strategy: string;
    addons?: string[] | undefined;
    risk_controls?: string[] | undefined;
    claims_experience?: string[] | undefined;
    differentiation?: string[] | undefined;
}>;
export declare const ProductResponseSchema: z.ZodObject<{
    products: z.ZodArray<z.ZodObject<{
        product_name: z.ZodString;
        positioning: z.ZodString;
        target_segment: z.ZodArray<z.ZodString, "many">;
        coverage: z.ZodArray<z.ZodString, "many">;
        addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        pricing_strategy: z.ZodString;
        risk_controls: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        claims_experience: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        differentiation: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        addons?: string[] | undefined;
        risk_controls?: string[] | undefined;
        claims_experience?: string[] | undefined;
        differentiation?: string[] | undefined;
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
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        addons?: string[] | undefined;
        risk_controls?: string[] | undefined;
        claims_experience?: string[] | undefined;
        differentiation?: string[] | undefined;
    }[];
}>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
//# sourceMappingURL=product.schema.d.ts.map