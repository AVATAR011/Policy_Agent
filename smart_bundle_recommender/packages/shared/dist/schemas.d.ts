import { z } from "zod";
export declare const LifecycleEnum: z.ZodEnum<["purchase", "renewal"]>;
export declare const VehicleSchema: z.ZodObject<{
    type: z.ZodEnum<["car", "bike"]>;
    brand: z.ZodString;
    model: z.ZodString;
    fuel_type: z.ZodEnum<["petrol", "diesel", "cng", "ev", "hybrid", "other"]>;
    cc: z.ZodNumber;
    vehicle_age_years: z.ZodNumber;
    idv_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    city: z.ZodString;
    state: z.ZodString;
    pincode: z.ZodString;
    ownership: z.ZodEnum<["1st", "2nd"]>;
    usage: z.ZodEnum<["private", "commercial"]>;
    annual_km: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "car" | "bike";
    brand: string;
    model: string;
    fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
    cc: number;
    vehicle_age_years: number;
    city: string;
    state: string;
    pincode: string;
    ownership: "1st" | "2nd";
    usage: "private" | "commercial";
    annual_km: number;
    idv_band?: "low" | "medium" | "high" | undefined;
}, {
    type: "car" | "bike";
    brand: string;
    model: string;
    fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
    cc: number;
    vehicle_age_years: number;
    city: string;
    state: string;
    pincode: string;
    ownership: "1st" | "2nd";
    usage: "private" | "commercial";
    annual_km: number;
    idv_band?: "low" | "medium" | "high" | undefined;
}>;
export declare const CustomerRiskSchema: z.ZodEffects<z.ZodObject<{
    claim_count_3y: z.ZodNumber;
    claim_types: z.ZodDefault<z.ZodArray<z.ZodEnum<["own_damage", "theft", "third_party", "water", "engine", "fire", "other"]>, "many">>;
    last_claim_months_ago: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    ncb_percent: z.ZodOptional<z.ZodNumber>;
    violations_count_12m: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    claim_count_3y: number;
    claim_types: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[];
    last_claim_months_ago?: number | null | undefined;
    ncb_percent?: number | undefined;
    violations_count_12m?: number | undefined;
}, {
    claim_count_3y: number;
    claim_types?: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[] | undefined;
    last_claim_months_ago?: number | null | undefined;
    ncb_percent?: number | undefined;
    violations_count_12m?: number | undefined;
}>, {
    claim_count_3y: number;
    claim_types: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[];
    last_claim_months_ago?: number | null | undefined;
    ncb_percent?: number | undefined;
    violations_count_12m?: number | undefined;
}, {
    claim_count_3y: number;
    claim_types?: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[] | undefined;
    last_claim_months_ago?: number | null | undefined;
    ncb_percent?: number | undefined;
    violations_count_12m?: number | undefined;
}>;
export declare const TelematicsSchema: z.ZodObject<{
    harsh_braking_score: z.ZodOptional<z.ZodNumber>;
    overspeed_score: z.ZodOptional<z.ZodNumber>;
    night_driving_pct: z.ZodOptional<z.ZodNumber>;
    highway_pct: z.ZodOptional<z.ZodNumber>;
    avg_daily_km: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    harsh_braking_score?: number | undefined;
    overspeed_score?: number | undefined;
    night_driving_pct?: number | undefined;
    highway_pct?: number | undefined;
    avg_daily_km?: number | undefined;
}, {
    harsh_braking_score?: number | undefined;
    overspeed_score?: number | undefined;
    night_driving_pct?: number | undefined;
    highway_pct?: number | undefined;
    avg_daily_km?: number | undefined;
}>;
export declare const CompetitorGapSchema: z.ZodObject<{
    competitor_name: z.ZodString;
    missing_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    price_advantage_notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    competitor_name: string;
    missing_addons: string[];
    price_advantage_notes?: string | undefined;
}, {
    competitor_name: string;
    missing_addons?: string[] | undefined;
    price_advantage_notes?: string | undefined;
}>;
export declare const ConstraintsSchema: z.ZodObject<{
    budget_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    must_have_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excluded_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    preferred_deductible_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
}, "strip", z.ZodTypeAny, {
    must_have_addons: string[];
    excluded_addons: string[];
    budget_band?: "low" | "medium" | "high" | undefined;
    preferred_deductible_band?: "low" | "medium" | "high" | undefined;
}, {
    budget_band?: "low" | "medium" | "high" | undefined;
    must_have_addons?: string[] | undefined;
    excluded_addons?: string[] | undefined;
    preferred_deductible_band?: "low" | "medium" | "high" | undefined;
}>;
export declare const RecommendRequestSchema: z.ZodObject<{
    request_id: z.ZodOptional<z.ZodString>;
    lifecycle: z.ZodEnum<["purchase", "renewal"]>;
    vehicle: z.ZodObject<{
        type: z.ZodEnum<["car", "bike"]>;
        brand: z.ZodString;
        model: z.ZodString;
        fuel_type: z.ZodEnum<["petrol", "diesel", "cng", "ev", "hybrid", "other"]>;
        cc: z.ZodNumber;
        vehicle_age_years: z.ZodNumber;
        idv_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        city: z.ZodString;
        state: z.ZodString;
        pincode: z.ZodString;
        ownership: z.ZodEnum<["1st", "2nd"]>;
        usage: z.ZodEnum<["private", "commercial"]>;
        annual_km: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "car" | "bike";
        brand: string;
        model: string;
        fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
        cc: number;
        vehicle_age_years: number;
        city: string;
        state: string;
        pincode: string;
        ownership: "1st" | "2nd";
        usage: "private" | "commercial";
        annual_km: number;
        idv_band?: "low" | "medium" | "high" | undefined;
    }, {
        type: "car" | "bike";
        brand: string;
        model: string;
        fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
        cc: number;
        vehicle_age_years: number;
        city: string;
        state: string;
        pincode: string;
        ownership: "1st" | "2nd";
        usage: "private" | "commercial";
        annual_km: number;
        idv_band?: "low" | "medium" | "high" | undefined;
    }>;
    customer_risk: z.ZodEffects<z.ZodObject<{
        claim_count_3y: z.ZodNumber;
        claim_types: z.ZodDefault<z.ZodArray<z.ZodEnum<["own_damage", "theft", "third_party", "water", "engine", "fire", "other"]>, "many">>;
        last_claim_months_ago: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        ncb_percent: z.ZodOptional<z.ZodNumber>;
        violations_count_12m: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        claim_count_3y: number;
        claim_types: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[];
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    }, {
        claim_count_3y: number;
        claim_types?: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[] | undefined;
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    }>, {
        claim_count_3y: number;
        claim_types: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[];
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    }, {
        claim_count_3y: number;
        claim_types?: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[] | undefined;
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    }>;
    telematics: z.ZodOptional<z.ZodObject<{
        harsh_braking_score: z.ZodOptional<z.ZodNumber>;
        overspeed_score: z.ZodOptional<z.ZodNumber>;
        night_driving_pct: z.ZodOptional<z.ZodNumber>;
        highway_pct: z.ZodOptional<z.ZodNumber>;
        avg_daily_km: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        harsh_braking_score?: number | undefined;
        overspeed_score?: number | undefined;
        night_driving_pct?: number | undefined;
        highway_pct?: number | undefined;
        avg_daily_km?: number | undefined;
    }, {
        harsh_braking_score?: number | undefined;
        overspeed_score?: number | undefined;
        night_driving_pct?: number | undefined;
        highway_pct?: number | undefined;
        avg_daily_km?: number | undefined;
    }>>;
    competitor_gaps: z.ZodDefault<z.ZodArray<z.ZodObject<{
        competitor_name: z.ZodString;
        missing_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        price_advantage_notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        competitor_name: string;
        missing_addons: string[];
        price_advantage_notes?: string | undefined;
    }, {
        competitor_name: string;
        missing_addons?: string[] | undefined;
        price_advantage_notes?: string | undefined;
    }>, "many">>;
    constraints: z.ZodOptional<z.ZodObject<{
        budget_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
        must_have_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excluded_addons: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        preferred_deductible_band: z.ZodOptional<z.ZodEnum<["low", "medium", "high"]>>;
    }, "strip", z.ZodTypeAny, {
        must_have_addons: string[];
        excluded_addons: string[];
        budget_band?: "low" | "medium" | "high" | undefined;
        preferred_deductible_band?: "low" | "medium" | "high" | undefined;
    }, {
        budget_band?: "low" | "medium" | "high" | undefined;
        must_have_addons?: string[] | undefined;
        excluded_addons?: string[] | undefined;
        preferred_deductible_band?: "low" | "medium" | "high" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    lifecycle: "purchase" | "renewal";
    vehicle: {
        type: "car" | "bike";
        brand: string;
        model: string;
        fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
        cc: number;
        vehicle_age_years: number;
        city: string;
        state: string;
        pincode: string;
        ownership: "1st" | "2nd";
        usage: "private" | "commercial";
        annual_km: number;
        idv_band?: "low" | "medium" | "high" | undefined;
    };
    customer_risk: {
        claim_count_3y: number;
        claim_types: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[];
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    };
    competitor_gaps: {
        competitor_name: string;
        missing_addons: string[];
        price_advantage_notes?: string | undefined;
    }[];
    request_id?: string | undefined;
    telematics?: {
        harsh_braking_score?: number | undefined;
        overspeed_score?: number | undefined;
        night_driving_pct?: number | undefined;
        highway_pct?: number | undefined;
        avg_daily_km?: number | undefined;
    } | undefined;
    constraints?: {
        must_have_addons: string[];
        excluded_addons: string[];
        budget_band?: "low" | "medium" | "high" | undefined;
        preferred_deductible_band?: "low" | "medium" | "high" | undefined;
    } | undefined;
}, {
    lifecycle: "purchase" | "renewal";
    vehicle: {
        type: "car" | "bike";
        brand: string;
        model: string;
        fuel_type: "petrol" | "diesel" | "cng" | "ev" | "hybrid" | "other";
        cc: number;
        vehicle_age_years: number;
        city: string;
        state: string;
        pincode: string;
        ownership: "1st" | "2nd";
        usage: "private" | "commercial";
        annual_km: number;
        idv_band?: "low" | "medium" | "high" | undefined;
    };
    customer_risk: {
        claim_count_3y: number;
        claim_types?: ("other" | "own_damage" | "theft" | "third_party" | "water" | "engine" | "fire")[] | undefined;
        last_claim_months_ago?: number | null | undefined;
        ncb_percent?: number | undefined;
        violations_count_12m?: number | undefined;
    };
    request_id?: string | undefined;
    telematics?: {
        harsh_braking_score?: number | undefined;
        overspeed_score?: number | undefined;
        night_driving_pct?: number | undefined;
        highway_pct?: number | undefined;
        avg_daily_km?: number | undefined;
    } | undefined;
    competitor_gaps?: {
        competitor_name: string;
        missing_addons?: string[] | undefined;
        price_advantage_notes?: string | undefined;
    }[] | undefined;
    constraints?: {
        budget_band?: "low" | "medium" | "high" | undefined;
        must_have_addons?: string[] | undefined;
        excluded_addons?: string[] | undefined;
        preferred_deductible_band?: "low" | "medium" | "high" | undefined;
    } | undefined;
}>;
export declare const BundleAddonSchema: z.ZodObject<{
    name: z.ZodString;
    rationale: z.ZodString;
    expected_claim_impact: z.ZodEnum<["decrease", "neutral", "increase"]>;
    pricing_impact: z.ZodEnum<["low", "medium", "high"]>;
    underwriting_rules: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    rationale: string;
    expected_claim_impact: "decrease" | "neutral" | "increase";
    pricing_impact: "low" | "medium" | "high";
    underwriting_rules: string[];
}, {
    name: string;
    rationale: string;
    expected_claim_impact: "decrease" | "neutral" | "increase";
    pricing_impact: "low" | "medium" | "high";
    underwriting_rules?: string[] | undefined;
}>;
export declare const BundleSchema: z.ZodObject<{
    bundle_name: z.ZodString;
    base_policy_type: z.ZodEnum<["TP", "Comprehensive"]>;
    addons: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        rationale: z.ZodString;
        expected_claim_impact: z.ZodEnum<["decrease", "neutral", "increase"]>;
        pricing_impact: z.ZodEnum<["low", "medium", "high"]>;
        underwriting_rules: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        rationale: string;
        expected_claim_impact: "decrease" | "neutral" | "increase";
        pricing_impact: "low" | "medium" | "high";
        underwriting_rules: string[];
    }, {
        name: string;
        rationale: string;
        expected_claim_impact: "decrease" | "neutral" | "increase";
        pricing_impact: "low" | "medium" | "high";
        underwriting_rules?: string[] | undefined;
    }>, "many">;
    deductible_strategy: z.ZodString;
    premium_estimate_band: z.ZodEnum<["low", "medium", "high"]>;
    risk_score: z.ZodNumber;
    attach_probability: z.ZodNumber;
    loss_ratio_impact_estimate: z.ZodEnum<["decrease", "neutral", "increase"]>;
    compliance_notes: z.ZodArray<z.ZodString, "many">;
    explanation_customer: z.ZodString;
    explanation_insurer: z.ZodString;
    follow_up_questions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    bundle_name: string;
    base_policy_type: "TP" | "Comprehensive";
    addons: {
        name: string;
        rationale: string;
        expected_claim_impact: "decrease" | "neutral" | "increase";
        pricing_impact: "low" | "medium" | "high";
        underwriting_rules: string[];
    }[];
    deductible_strategy: string;
    premium_estimate_band: "low" | "medium" | "high";
    risk_score: number;
    attach_probability: number;
    loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
    compliance_notes: string[];
    explanation_customer: string;
    explanation_insurer: string;
    follow_up_questions: string[];
}, {
    bundle_name: string;
    base_policy_type: "TP" | "Comprehensive";
    addons: {
        name: string;
        rationale: string;
        expected_claim_impact: "decrease" | "neutral" | "increase";
        pricing_impact: "low" | "medium" | "high";
        underwriting_rules?: string[] | undefined;
    }[];
    deductible_strategy: string;
    premium_estimate_band: "low" | "medium" | "high";
    risk_score: number;
    attach_probability: number;
    loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
    compliance_notes: string[];
    explanation_customer: string;
    explanation_insurer: string;
    follow_up_questions?: string[] | undefined;
}>;
export declare const RecommendResponseSchema: z.ZodObject<{
    request_id: z.ZodString;
    bundles: z.ZodObject<{
        value: z.ZodObject<{
            bundle_name: z.ZodString;
            base_policy_type: z.ZodEnum<["TP", "Comprehensive"]>;
            addons: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                rationale: z.ZodString;
                expected_claim_impact: z.ZodEnum<["decrease", "neutral", "increase"]>;
                pricing_impact: z.ZodEnum<["low", "medium", "high"]>;
                underwriting_rules: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }>, "many">;
            deductible_strategy: z.ZodString;
            premium_estimate_band: z.ZodEnum<["low", "medium", "high"]>;
            risk_score: z.ZodNumber;
            attach_probability: z.ZodNumber;
            loss_ratio_impact_estimate: z.ZodEnum<["decrease", "neutral", "increase"]>;
            compliance_notes: z.ZodArray<z.ZodString, "many">;
            explanation_customer: z.ZodString;
            explanation_insurer: z.ZodString;
            follow_up_questions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        }, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        }>;
        protection_plus: z.ZodObject<{
            bundle_name: z.ZodString;
            base_policy_type: z.ZodEnum<["TP", "Comprehensive"]>;
            addons: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                rationale: z.ZodString;
                expected_claim_impact: z.ZodEnum<["decrease", "neutral", "increase"]>;
                pricing_impact: z.ZodEnum<["low", "medium", "high"]>;
                underwriting_rules: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }>, "many">;
            deductible_strategy: z.ZodString;
            premium_estimate_band: z.ZodEnum<["low", "medium", "high"]>;
            risk_score: z.ZodNumber;
            attach_probability: z.ZodNumber;
            loss_ratio_impact_estimate: z.ZodEnum<["decrease", "neutral", "increase"]>;
            compliance_notes: z.ZodArray<z.ZodString, "many">;
            explanation_customer: z.ZodString;
            explanation_insurer: z.ZodString;
            follow_up_questions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        }, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        }>;
        low_premium: z.ZodObject<{
            bundle_name: z.ZodString;
            base_policy_type: z.ZodEnum<["TP", "Comprehensive"]>;
            addons: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                rationale: z.ZodString;
                expected_claim_impact: z.ZodEnum<["decrease", "neutral", "increase"]>;
                pricing_impact: z.ZodEnum<["low", "medium", "high"]>;
                underwriting_rules: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }, {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }>, "many">;
            deductible_strategy: z.ZodString;
            premium_estimate_band: z.ZodEnum<["low", "medium", "high"]>;
            risk_score: z.ZodNumber;
            attach_probability: z.ZodNumber;
            loss_ratio_impact_estimate: z.ZodEnum<["decrease", "neutral", "increase"]>;
            compliance_notes: z.ZodArray<z.ZodString, "many">;
            explanation_customer: z.ZodString;
            explanation_insurer: z.ZodString;
            follow_up_questions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        }, {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        value: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
        protection_plus: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
        low_premium: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
    }, {
        value: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
        protection_plus: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
        low_premium: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    request_id: string;
    bundles: {
        value: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
        protection_plus: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
        low_premium: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules: string[];
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions: string[];
        };
    };
}, {
    request_id: string;
    bundles: {
        value: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
        protection_plus: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
        low_premium: {
            bundle_name: string;
            base_policy_type: "TP" | "Comprehensive";
            addons: {
                name: string;
                rationale: string;
                expected_claim_impact: "decrease" | "neutral" | "increase";
                pricing_impact: "low" | "medium" | "high";
                underwriting_rules?: string[] | undefined;
            }[];
            deductible_strategy: string;
            premium_estimate_band: "low" | "medium" | "high";
            risk_score: number;
            attach_probability: number;
            loss_ratio_impact_estimate: "decrease" | "neutral" | "increase";
            compliance_notes: string[];
            explanation_customer: string;
            explanation_insurer: string;
            follow_up_questions?: string[] | undefined;
        };
    };
}>;
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
    explanation_insurer: z.ZodString;
    portfolio_fit: z.ZodString;
    risk_tradeoffs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    regulatory_notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    growth_strategy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    addons: string[];
    explanation_insurer: string;
    product_name: string;
    positioning: string;
    target_segment: string[];
    coverage: string[];
    pricing_strategy: string;
    risk_controls: string[];
    claims_experience: string[];
    differentiation: string[];
    portfolio_fit: string;
    risk_tradeoffs: string[];
    regulatory_notes: string[];
    growth_strategy: string;
}, {
    explanation_insurer: string;
    product_name: string;
    positioning: string;
    target_segment: string[];
    coverage: string[];
    pricing_strategy: string;
    portfolio_fit: string;
    growth_strategy: string;
    addons?: string[] | undefined;
    risk_controls?: string[] | undefined;
    claims_experience?: string[] | undefined;
    differentiation?: string[] | undefined;
    risk_tradeoffs?: string[] | undefined;
    regulatory_notes?: string[] | undefined;
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
        explanation_insurer: z.ZodString;
        portfolio_fit: z.ZodString;
        risk_tradeoffs: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        regulatory_notes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growth_strategy: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        addons: string[];
        explanation_insurer: string;
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
        portfolio_fit: string;
        risk_tradeoffs: string[];
        regulatory_notes: string[];
        growth_strategy: string;
    }, {
        explanation_insurer: string;
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        portfolio_fit: string;
        growth_strategy: string;
        addons?: string[] | undefined;
        risk_controls?: string[] | undefined;
        claims_experience?: string[] | undefined;
        differentiation?: string[] | undefined;
        risk_tradeoffs?: string[] | undefined;
        regulatory_notes?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    products: {
        addons: string[];
        explanation_insurer: string;
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        risk_controls: string[];
        claims_experience: string[];
        differentiation: string[];
        portfolio_fit: string;
        risk_tradeoffs: string[];
        regulatory_notes: string[];
        growth_strategy: string;
    }[];
}, {
    products: {
        explanation_insurer: string;
        product_name: string;
        positioning: string;
        target_segment: string[];
        coverage: string[];
        pricing_strategy: string;
        portfolio_fit: string;
        growth_strategy: string;
        addons?: string[] | undefined;
        risk_controls?: string[] | undefined;
        claims_experience?: string[] | undefined;
        differentiation?: string[] | undefined;
        risk_tradeoffs?: string[] | undefined;
        regulatory_notes?: string[] | undefined;
    }[];
}>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type RecommendRequest = z.infer<typeof RecommendRequestSchema>;
export type RecommendResponse = z.infer<typeof RecommendResponseSchema>;
//# sourceMappingURL=schemas.d.ts.map