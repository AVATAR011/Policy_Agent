export async function sendMessage(message) {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend error:", data);
      throw new Error(data.error || "Server error");
    }

    return data;
  } catch (err) {
    console.error("Chat API failed:", err);
    throw err;
  }
}
