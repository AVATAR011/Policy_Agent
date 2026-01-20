import { z } from "zod";
import { db } from "../db/sqlite";
const FeedbackSchema = z.object({
    request_id: z.string().min(1),
    bundle_key: z.enum(["value", "protection_plus", "low_premium"]),
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
});
export const feedbackRoutes = async (app) => {
    app.post("/feedback", async (req) => {
        const fb = FeedbackSchema.parse(req.body);
        db.saveFeedback(fb);
        return { ok: true };
    });
};
