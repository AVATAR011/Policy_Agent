import { useState } from "react";

export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="ml-auto max-w-[75%] px-4 py-2 rounded-xl bg-blue-600 text-white text-sm">
        {content}
      </div>
    );
  }

  // ---------- ASSISTANT RENDERING ----------

  // Case 1: plain string
  if (typeof content === "string") {
    return (
      <div className="mr-auto max-w-[75%] px-4 py-2 rounded-xl bg-slate-700 text-white text-sm whitespace-pre-wrap">
        {content}
      </div>
    );
  }

  // Case 2: Multi-insurer comparison
  if (typeof content === "object" && !content.answer) {
    return (
      <div className="mr-auto max-w-[85%] space-y-4">
        {Object.entries(content).map(([insurer, data]) => (
          <InsurerCard key={insurer} name={insurer} data={data} />
        ))}
      </div>
    );
  }

  // Case 3: Single answer + sources
  return <AnswerCard data={content} />;
}

/* ---------------- COMPONENTS ---------------- */

function AnswerCard({ data }) {
  return (
    <div className="mr-auto max-w-[85%] bg-slate-800 text-white rounded-xl p-4 space-y-3 text-sm">
      <Section text={data.answer} />
      <Sources sources={data.sources} />
    </div>
  );
}

function InsurerCard({ name, data }) {
  return (
    <div className="bg-slate-800 text-white rounded-xl p-4 space-y-3">
      <div className="text-xs font-semibold text-blue-400">{name}</div>
      <Section text={data.answer} />
      <Sources sources={data.sources} />
    </div>
  );
}

function Section({ text }) {
  return <div className="whitespace-pre-wrap">{text}</div>;
}

function Sources({ sources }) {
  const [open, setOpen] = useState(false);
  if (!sources || sources.length === 0) return null;

  return (
    <div className="text-xs">
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-400 hover:underline"
      >
        {open ? "Hide sources" : "Show sources"}
      </button>

      {open && (
        <ul className="mt-2 space-y-1 text-slate-300">
          {sources.map((s, i) => (
            <li key={i}>
              {s.company} • {s.file} • {s.section}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
