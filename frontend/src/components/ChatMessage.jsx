export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
        isUser
          ? "ml-auto bg-blue-600 text-white"
          : "mr-auto bg-slate-700 text-white"
      }`}
    >
      {content}
    </div>
  );
}
