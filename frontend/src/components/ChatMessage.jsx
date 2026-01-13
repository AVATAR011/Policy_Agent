export default function ChatMessage({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-slate-800 text-gray-200 rounded-bl-sm"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
