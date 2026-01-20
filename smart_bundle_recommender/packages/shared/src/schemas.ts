import { z } from "zod";

export const LifecycleEnum = z.enum(["purchase", "renewal"]);

export const VehicleSchema = z.object({
  type: z.enum(["car", "bike"]),
  brand: z.string().min(1),
  model: z.string().min(1),
  fuel_type: z.enum(["petrol", "diesel", "cng", "ev", "hybrid", "other"]),
  cc: z.number().int().min(0).max(12000),
  vehicle_age_years: z.number().min(0).max(30),
  idv_band: z.enum(["low", "medium", "high"]).optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  pincode: z.string().regex(/^\d{6}$/),
  ownership: z.enum(["1st", "2nd"]),
  usage: z.enum(["private", "commercial"]),
  annual_km: z.number().int().min(0).max(200000),
});

export const CustomerRiskSchema = z
  .object({
    claim_count_3y: z.number().int().min(0).max(50),
    claim_types: z
      .array(
        z.enum([
          "own_damage",
          "theft",
          "third_party",
          "water",
          "engine",
          "fire",
          "other",
        ]),
      )
      .default([]),
    last_claim_months_ago: z
      .number()
      .int()
      .min(0)
      .max(240)
      .optional()
      .nullable(),
    ncb_percent: z.number().min(0).max(50).optional(),
    violations_count_12m: z.number().int().min(0).max(200).optional(),
  })
  .superRefine((val, ctx) => {
    if ((val.claim_count_3y ?? 0) > 0) {
      if (
        val.last_claim_months_ago === undefined ||
        val.last_claim_months_ago === null
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["last_claim_months_ago"],
          message: "Required when claim_count_3y > 0",
        });
      }
    }
  });

export const TelematicsSchema = z.object({
  harsh_braking_score: z.number().min(0).max(100).optional(), // 0 best
  overspeed_score: z.number().min(0).max(100).optional(), // 0 best
  night_driving_pct: z.number().min(0).max(100).optional(),
  highway_pct: z.number().min(0).max(100).optional(),
  avg_daily_km: z.number().min(0).max(1000).optional(),
});

export const CompetitorGapSchema = z.object({
  competitor_name: z.string().min(1),
  missing_addons: z.array(z.string().min(1)).default([]),
  price_advantage_notes: z.string().optional(),
});

export const ConstraintsSchema = z.object({
  budget_band: z.enum(["low", "medium", "high"]).optional(),
  must_have_addons: z.array(z.string()).default([]),
  excluded_addons: z.array(z.string()).default([]),
  preferred_deductible_band: z.enum(["low", "medium", "high"]).optional(),
});

export const RecommendRequestSchema = z.object({
  request_id: z.string().optional(),
  lifecycle: LifecycleEnum,
  vehicle: VehicleSchema,
  customer_risk: CustomerRiskSchema,
  telematics: TelematicsSchema.optional(),
  competitor_gaps: z.array(CompetitorGapSchema).default([]),
  constraints: ConstraintsSchema.optional(),
});

export const BundleAddonSchema = z.object({
  name: z.string().min(1),
  rationale: z.string().min(1),
  expected_claim_impact: z.enum(["decrease", "neutral", "increase"]),
  pricing_impact: z.enum(["low", "medium", "high"]),
  underwriting_rules: z.array(z.string().min(1)).default([]),
});

export const BundleSchema = z.object({
  bundle_name: z.string().min(1),
  base_policy_type: z.enum(["TP", "Comprehensive"]),
  addons: z.array(BundleAddonSchema).min(1),
  deductible_strategy: z.string().min(1),
  premium_estimate_band: z.enum(["low", "medium", "high"]),
  risk_score: z.number().min(0).max(100),
  attach_probability: z.number().min(0).max(1),
  loss_ratio_impact_estimate: z.enum(["decrease", "neutral", "increase"]),
  compliance_notes: z.array(z.string().min(1)).min(1),
  explanation_customer: z.string().min(1),
  explanation_insurer: z.string().min(1),
  follow_up_questions: z.array(z.string().min(1)).max(3).default([]),
});

export const RecommendResponseSchema = z.object({
  request_id: z.string().min(1),
  bundles: z.object({
    value: BundleSchema,
    protection_plus: BundleSchema,
    low_premium: BundleSchema,
  }),
});

// -------------------------------
// Product Blueprint Schemas
// -------------------------------

export const ProductSchema = z.object({
  product_name: z.string().min(1),
  positioning: z.string().min(1),
  target_segment: z.array(z.string().min(1)).min(1),
  coverage: z.array(z.string().min(1)).min(1),
  addons: z.array(z.string().min(1)).default([]),
  pricing_strategy: z.string().min(1),
  risk_controls: z.array(z.string().min(1)).default([]),
  claims_experience: z.array(z.string().min(1)).default([]),
  differentiation: z.array(z.string().min(1)).default([]),
});

export const ProductResponseSchema = z.object({
  products: z.array(ProductSchema).min(1),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductResponse = z.infer<typeof ProductResponseSchema>;


export type RecommendRequest = z.infer<typeof RecommendRequestSchema>;
export type RecommendResponse = z.infer<typeof RecommendResponseSchema>;
