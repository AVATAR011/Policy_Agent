import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

  // Case 1: plain string (FIXED: Now renders Markdown)
  if (typeof content === "string") {
    return (
      <div className="mr-auto max-w-[75%] px-4 py-2 rounded-xl bg-slate-700 text-white text-sm">
        {/* Added prose class for proper list/heading formatting */}
        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
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
  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

function Sources({ sources }) {
  const [open, setOpen] = useState(false);
  if (!sources || sources.length === 0) return null;

  // Normalize sources (handle stringified JSON safely)
  const normalized = sources.map((s) => {
    if (typeof s === "string") {
      try {
        return JSON.parse(s);
      } catch {
        return { file: s };
      }
    }
    return s;
  });

  return (
    <div className="text-xs border-t border-slate-700 pt-2 mt-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors"
      >
        {open ? "Hide sources" : "Show sources"}
      </button>

      {open && (
        <ul className="mt-2 space-y-1 text-slate-400">
          {normalized.map((s, i) => (
            <li key={i} className="truncate">
              <span className="font-medium text-slate-300">{s.company || "Doc"}</span> • {s.file || "Unknown"}
              {s.section && <span className="text-slate-500"> • {s.section}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}