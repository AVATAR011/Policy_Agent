import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in environment variables");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export async function askLLM(prompt) {
  // prompt can be string OR {system, user}
  let messages;

  if (typeof prompt === "string") {
    messages = [
      { role: "system", content: "You are a helpful insurance assistant." },
      { role: "user", content: prompt }
    ];
  } else {
    messages = [
      {
        role: "system",
        content: prompt.system || "You are a helpful insurance assistant."
      },
      ...(prompt.chatHistory || []),
      {
        role: "user",
        content: prompt.user
      }
    ];
  }

  const res = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.2
  });

  return res.choices[0].message.content;
}
