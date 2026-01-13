import { useState } from "react";
import ChatMessage from "../components/ChatMessage";
import { sendMessage } from "../api/chatApi";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me anything about insurance policies, coverage, risks, or product improvements.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);

      const botMsg = {
        role: "assistant",
        text: res.answer || "No answer received",
      };

      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ Server error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">

      {/* Chat Card */}
      <div className="w-full max-w-3xl h-[85vh] bg-slate-950 rounded-2xl shadow-xl flex flex-col border border-slate-700">

        {/* Header */}
        <div className="p-4 border-b border-slate-700 text-center">
          <h1 className="text-xl font-semibold text-white">
            Insurance Policy Assistant
          </h1>
          <p className="text-xs text-slate-400">
            Ask about coverage, exclusions, risks & product design
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} text={m.text} />
          ))}
          {loading && (
            <div className="text-slate-400 text-sm">Typing...</div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about coverage, exclusions, pricing ideas..."
            className="flex-1 px-4 py-2 rounded-full bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-5 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
