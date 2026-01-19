export async function sendMessage(messages) {
  try {
    const lastUserMessage = messages
      .filter(m => m.role === "user")
      .at(-1)?.content;

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: lastUserMessage,   // ✅ backend-compatible
        history: messages           // (optional, for Step 1 memory)
      })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Server error");
    }

    return res.json();
  } catch (err) {
    console.error("Chat API failed:", err);
    throw err;
  }
}

// NEW API CALL
export async function generatePolicy(payload) {
  const response = await fetch("http://localhost:5000/generate-policy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: `
Policy Type: ${payload.policyType}
Target Segment: ${payload.targetSegment}
Business Goal: ${payload.businessGoal}
Risk Preference: ${payload.riskLevel}
Special Requirements: ${payload.notes}
      `
    })
  });

  if (!response.ok) {
    throw new Error("Generate policy API failed");
  }

  return response.json();
}


export async function refinePolicy(policy, intelligence, message) {
  const res = await fetch("http://localhost:5000/api/policy/refine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policy, intelligence, message })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Refine failed");
  }

  return res.json();
}



export async function confirmPolicy(policy) {
  const res = await fetch("http://localhost:5000/api/policy/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policy })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to confirm policy");
  }

  return res.json();
}

