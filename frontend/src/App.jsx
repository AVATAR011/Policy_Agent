import { useState } from "react";
import Chatbot from "./pages/Chatbot";
import Policy from "./pages/Policy";
import PolicyBuilder from "./pages/PolicyBuilder";
import { MessageSquare, FileText, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("chatbot");

  const menuItems = [
    { id: "chatbot", label: "Chatbot", icon: MessageSquare },
    { id: "policy", label: "Policy", icon: FileText },
    { id: "builder", label: "Policy Builder", icon: FileText },
    { id: "claims", label: "Claims", icon: ShieldAlert },
  ];

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col relative shrink-0`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-blue-600 text-white rounded-full p-1 shadow-lg hover:bg-blue-700 transition-colors z-10"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        <div className={`p-6 flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-blue-500/20 shadow-lg">
            <span className="font-bold text-lg text-white">P</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-xl tracking-tight text-white truncate">
              Policy Agent
            </span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
              }`}
            >
              <div className={`${isCollapsed ? "mx-auto" : ""}`}>
                <item.icon size={24} />
              </div>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">
              U
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium">User Admin</span>
                <span className="text-xs text-slate-500">View Profile</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900 relative">
        {activeTab === "chatbot" && <Chatbot />}
        {activeTab === "policy" && <Policy />}
        {activeTab === "builder" && <PolicyBuilder />}
        {activeTab === "claims" && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-900">
            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center max-w-md">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                <ShieldAlert size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">Claims Module</h2>
              <p className="text-slate-400">
                This feature is currently under development. Please check back later.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
