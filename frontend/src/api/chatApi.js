export async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message
      })
    });

    // const data = await res.json();

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
