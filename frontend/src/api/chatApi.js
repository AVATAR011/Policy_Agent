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
