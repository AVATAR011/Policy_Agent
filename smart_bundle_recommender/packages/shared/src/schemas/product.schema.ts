import { z } from "zod";

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
