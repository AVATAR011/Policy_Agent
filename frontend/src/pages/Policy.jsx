import { useEffect, useState } from "react";
import { Folder, FileText, ChevronRight, ChevronDown, Shield, Layers, Box, Maximize2 } from "lucide-react";

export default function Policy() {
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/policies")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load policies");
        return res.json();
      })
      .then((data) => {
        setTree(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-slate-400">Loading directory...</div>;
  if (error) return <div className="p-8 text-red-400">Error: {error}</div>;

  return (
    <div className="h-full flex bg-slate-900 text-slate-100 overflow-hidden">
      
      {/* LEFT: File Tree Sidebar */}
      <div className="w-1/3 min-w-[300px] border-r border-slate-800 flex flex-col bg-slate-950">
        <div className="p-4 border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
          <h1 className="text-lg font-bold flex items-center gap-2">
            <Shield className="text-blue-500" size={20} />
            Policy Repository
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Browse indexed policy documents
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2">
          {tree && (
            <FileSystemNode 
              node={tree} 
              name="Root" 
              level={0} 
              basePath="" 
              onSelect={setSelectedFile} 
              selectedFile={selectedFile}
            />
          )}
        </div>
      </div>

      {/* RIGHT: PDF Viewer */}
      <div className="flex-1 flex flex-col bg-slate-900 h-full relative">
        {selectedFile ? (
          <div className="flex-1 flex flex-col h-full">
            <div className="h-12 border-b border-slate-800 flex items-center px-4 bg-slate-950 justify-between shrink-0">
              <span className="text-sm font-medium text-slate-300 truncate max-w-xl">
                {selectedFile.split('/').pop()}
              </span>
              <a 
                href={`http://localhost:5000/content/${selectedFile}`} 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                title="Open in new tab"
              >
                <Maximize2 size={16} />
              </a>
            </div>
            <iframe 
              src={`http://localhost:5000/content/${selectedFile}`}
              className="flex-1 w-full h-full border-none bg-white"
              title="PDF Viewer"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8">
            <FileText size={64} className="opacity-20 mb-4" />
            <p className="text-lg font-medium">Select a document to view</p>
            <p className="text-sm opacity-60">PDFs will render here</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Recursive Component with Path Tracking
function FileSystemNode({ node, name, level, basePath, onSelect, selectedFile }) {
  const [isOpen, setIsOpen] = useState(level < 1);
  
  const directories = Object.keys(node).filter((key) => key !== "files");
  const files = node.files || [];
  const hasChildren = directories.length > 0 || files.length > 0;

  // Construct current path (don't add Root to path)
  const currentPath = name === "Root" ? "" : (basePath ? `${basePath}/${name}` : name);

  const getIcon = (n) => {
    if (n === "Root") return <Shield size={16} className="text-blue-400" />;
    if (["ACKO", "GODIGIT", "HDFCERGO"].includes(n)) return <Box size={16} className="text-purple-400" />;
    if (["MOTOR", "HEALTH"].includes(n)) return <Layers size={16} className="text-orange-400" />;
    return <Folder size={16} className="text-slate-500" />;
  };

  if (!hasChildren && name !== "Root") return null;

  return (
    <div className="select-none">
      {/* Directory Row */}
      {name !== "Root" && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-all mb-0.5
            ${isOpen ? "text-slate-200" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"}
          `}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          <span className="text-slate-600">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
          {getIcon(name)}
          <span className="font-medium text-sm truncate">{name}</span>
        </div>
      )}

      {/* Children */}
      {(isOpen || name === "Root") && (
        <div>
          {directories.map((dirName) => (
            <FileSystemNode
              key={dirName}
              node={node[dirName]}
              name={dirName}
              level={level + 1}
              basePath={currentPath}
              onSelect={onSelect}
              selectedFile={selectedFile}
            />
          ))}

          {files.map((fileName) => {
             const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;
             const isSelected = selectedFile === filePath;
             
             return (
              <div
                key={fileName}
                onClick={() => onSelect(filePath)}
                className={`
                  flex items-center gap-2 py-1.5 px-2 rounded-lg cursor-pointer transition-colors mb-0.5
                  ${isSelected ? "bg-blue-600/20 text-blue-300" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"}
                `}
                style={{ paddingLeft: `${(level + 1) * 12 + 24}px` }}
              >
                <FileText size={14} className={isSelected ? "text-blue-400" : "text-slate-600"} />
                <span className="text-xs truncate">{fileName}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}