import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" ref={bottomRef}>
      {messages.map((msg, i) => (
        <ChatMessage key={i} role={msg.role} content={msg.content} />
      ))
      }
    </div>
  );
}
