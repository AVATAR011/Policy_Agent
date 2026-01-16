import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";

export default function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`
          relative max-w-[85%] rounded-2xl px-5 py-4 shadow-sm overflow-hidden
          ${isUser 
            ? "bg-blue-600 text-white rounded-br-sm" 
            : "bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700"}
        `}
      >
        {isUser ? (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{content}</div>
        ) : (
          <AssistantContent content={content} />
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function AssistantContent({ content }) {
  // Case 1: Plain string (Error messages or simple replies)
  if (typeof content === "string") {
    return <MarkdownText text={content} />;
  }

  // Case 2: Multi-insurer comparison (Object without 'answer' key)
  if (typeof content === "object" && !content.answer) {
    return (
      <div className="space-y-4 w-full">
        {Object.entries(content).map(([insurer, data]) => (
          <InsurerCard key={insurer} name={insurer} data={data} />
        ))}
      </div>
    );
  }

  // Case 3: Standard Answer + Sources
  return (
    <div className="space-y-3">
      <MarkdownText text={content.answer} />
      <Sources sources={content.sources} />
    </div>
  );
}

function MarkdownText({ text }) {
  return (
    // 'prose' classes format HTML elements (h1, p, ul) beautifully
    <div className="prose prose-invert prose-sm max-w-none 
      prose-p:leading-relaxed prose-p:my-2
      prose-headings:text-slate-100 prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2 prose-headings:text-base
      prose-ul:my-2 prose-ul:list-disc prose-ul:pl-4
      prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-4
      prose-li:my-0.5 prose-li:text-slate-300
      prose-strong:text-white prose-strong:font-bold
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      text-slate-200 text-sm"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

function InsurerCard({ name, data }) {
  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 border-b border-slate-700 pb-2">
        {name}
      </div>
      <MarkdownText text={data.answer} />
      <Sources sources={data.sources} />
    </div>
  );
}

function Sources({ sources }) {
  const [open, setOpen] = useState(false);
  if (!sources || sources.length === 0) return null;

  // Normalize sources safely
  const normalized = sources.map((s) => {
    if (typeof s === "string") {
      try { return JSON.parse(s); } catch { return { file: s }; }
    }
    return s;
  });

  return (
    <div className="pt-2 mt-2 border-t border-slate-700/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {open ? "Hide Sources" : `View ${normalized.length} Sources`}
      </button>

      {open && (
        <div className="mt-3 grid gap-2">
          {normalized.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-xs bg-slate-900/50 p-2 rounded border border-slate-700/50 text-slate-400">
              <FileText size={14} className="mt-0.5 shrink-0 text-slate-500" />
              <div className="overflow-hidden">
                <span className="font-semibold text-slate-300 block">
                  {s.company || "Document"}
                </span>
                <span className="truncate block opacity-80" title={s.file}>
                  {s.file ? s.file.split('/').pop() : "Unknown File"}
                </span>
                {s.section && (
                  <span className="block text-slate-500 mt-0.5">Section: {s.section}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}