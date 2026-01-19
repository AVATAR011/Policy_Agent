import { storeGeneratedPolicy } from "../services/generatedPolicy.store.js";

export async function confirmPolicyHandler(req, res) {
  try {
    const { policy } = req.body;

    if (!policy) {
      return res.status(400).json({ error: "policy is required" });
    }

    await storeGeneratedPolicy(policy);

    res.json({
      success: true,
      message: "Policy confirmed and saved successfully"
    });
  } catch (error) {
    console.error("Confirm policy failed:", error);
    res.status(500).json({ error: "Failed to save policy" });
  }
}
