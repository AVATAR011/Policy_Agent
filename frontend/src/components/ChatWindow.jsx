import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
      {messages.map((m, i) => (
        <ChatMessage key={i} role={m.role} text={m.text} />
      ))}
    </div>
  );
}
