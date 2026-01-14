import { useState } from "react";
import { sendMessage } from "../api/chatApi";
import ChatWindow from "../components/ChatWindow";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
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

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: res.answer || "No answer received",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ Server error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-lg font-semibold text-white">
            Insurance Policy Assistant
          </h1>
          <p className="text-xs text-slate-400">
            AI-powered analysis for coverage & exclusions
          </p>
        </div>
      </div>

      {/* Messages Area - Fills available space */}
      <div className="flex-1 overflow-hidden relative flex flex-col">
        <ChatWindow messages={messages} loading={loading} />
        
        {loading && (
          <div className="absolute bottom-4 left-6 text-slate-400 text-xs animate-pulse bg-slate-900/80 px-2 py-1 rounded">
            Agent is typing...
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your policies..."
            className="flex-1 px-5 py-3 rounded-xl bg-slate-800 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-slate-800 transition-all shadow-inner"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-600">
                AI can make mistakes. Please verify important information.
            </p>
        </div>
      </div>
    </div>
  );
}