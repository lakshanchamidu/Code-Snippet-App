import React, { useEffect, useState } from "react";
import { getAuthHeaders } from "../utils/auth"; 
import axios from "axios";

export default function PublicSnippetsList() {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [previewModal, setPreviewModal] = useState({ show: false, snippet: null });

useEffect(() => {
  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://code-snippet-app-production.up.railway.app/api/snippets/public", getAuthHeaders());
      setSnippets(res.data);
    } catch (err) {
      console.error("Error fetching snippets:", err);
      setError("Failed to load snippets.");
    } finally {
      setLoading(false);
    }
  };

  fetchSnippets();
}, []);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handlePreviewClick = (snippet) => {
    setPreviewModal({ show: true, snippet });
  };

  const handlePreviewClose = () => {
    setPreviewModal({ show: false, snippet: null });
  };

  const CopyIcon = ({ onClick, copied }) => (
    <button
      onClick={onClick}
      className={`transition-all duration-300 hover:scale-110 group ${
        copied 
          ? 'text-green-300' 
          : 'text-green-400 hover:text-green-300 hover:drop-shadow-lg hover:shadow-green-400/50'
      }`}
      title="Copy code"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        {copied ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m-3-8v8m-4 4h10a2 2 0 002-2v-8a2 2 0 00-2-2h-3m-4 0H7a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        )}
      </svg>
    </button>
  );

  const PreviewIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Preview code"
      className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:drop-shadow-lg hover:shadow-blue-400/50 group"
      title="Preview code"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 inline-block group-hover:scale-110 transition-transform"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    </button>
  );

  // Preview Modal
  const PreviewModal = ({ show, snippet, onClose }) => {
    if (!show || !snippet) return null;

    const handleCopyFromPreview = () => {
      navigator.clipboard.writeText(snippet.code).then(() => {
        setCopiedId(snippet._id);
        setTimeout(() => setCopiedId(null), 2000);
      });
    };

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2">
        <div className="relative bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 max-w-6xl w-full max-h-[95vh] shadow-2xl shadow-green-500/20 overflow-hidden">
          {/* Modal glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-400/5"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 to-green-500/10 blur opacity-30"></div>
          
          <div className="relative z-10 h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent font-mono mb-2">
                  [CODE_PREVIEW.EXE]
                </h2>
                <p className="text-gray-400 font-mono text-sm">PUBLIC_SNIPPET_VIEWER_ACTIVE</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-300 font-mono text-2xl"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>

            {/* Snippet Info */}
            <div className="mb-4 flex-shrink-0">
              <h3 className="text-green-300 font-mono font-bold text-xl mb-2">
                &gt; {snippet.title}
              </h3>
              <p className="text-gray-400 font-mono text-sm mb-4">
                // {snippet.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-green-700/50 to-green-600/50 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs font-mono font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                <span className="bg-gradient-to-r from-blue-700/50 to-blue-600/50 border border-blue-400/30 text-blue-300 px-3 py-1 rounded-full text-xs font-mono font-medium">
                  {snippet.language}
                </span>
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <span className="text-gray-400 font-mono text-sm">CODE_BLOCK.TXT</span>
                <button
                  onClick={handleCopyFromPreview}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/30 border border-green-400/50 font-mono text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m-3-8v8m-4 4h10a2 2 0 002-2v-8a2 2 0 00-2-2h-3m-4 0H7a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{copiedId === snippet._id ? 'COPIED!' : 'COPY_CODE'}</span>
                </button>
              </div>
              
              <div className="flex-1 bg-black/80 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-inner overflow-hidden min-h-0 relative">
                <style jsx>{`
                  .preview-green-scrollbar {
                    scrollbar-width: auto !important;
                    scrollbar-color: #22c55e #111111 !important;
                    overflow-y: scroll !important;
                    overflow-x: auto !important;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar {
                    width: 22px !important;
                    height: 22px !important;
                    background: #111111 !important;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-track {
                    background: linear-gradient(145deg, #000000, #222222, #000000) !important;
                    border-radius: 12px;
                    border: 3px solid #444444;
                    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.9);
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(145deg, #4ade80, #22c55e, #16a34a, #15803d) !important;
                    border-radius: 12px;
                    border: 3px solid #166534;
                    box-shadow: 
                      0 0 25px rgba(34, 197, 94, 1),
                      0 0 50px rgba(34, 197, 94, 0.9),
                      inset 0 3px 6px rgba(255, 255, 255, 0.4);
                    transition: all 0.3s ease;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(145deg, #86efac, #4ade80, #22c55e, #16a34a) !important;
                    box-shadow: 
                      0 0 35px rgba(34, 197, 94, 1),
                      0 0 70px rgba(34, 197, 94, 1),
                      inset 0 3px 6px rgba(255, 255, 255, 0.5);
                    transform: scale(1.2);
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(145deg, #bbf7d0, #86efac, #4ade80, #22c55e) !important;
                    box-shadow: 
                      0 0 45px rgba(34, 197, 94, 1),
                      0 0 90px rgba(34, 197, 94, 1);
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-corner {
                    background: #222222;
                    border-radius: 12px;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-button {
                    display: none;
                  }
                `}</style>
                <div className="h-full overflow-y-scroll overflow-x-auto preview-green-scrollbar" style={{minHeight: '400px', maxHeight: '500px'}}>
                  <pre className="p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed" style={{minHeight: '650px'}}>
                    <code className="text-green-300">
                      {snippet.code}


{/* Add spacing to ensure scrollbar appears */}
{Array.from({ length: 15 }, (_, i) => `\n`).join('')}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-green-400/20 flex-shrink-0">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">
                ACCESS_LEVEL:{" "}
                <span className="text-green-400 font-semibold">
                  [PUBLIC_REPOSITORY]
                </span>
              </div>
              <div className="text-xs text-gray-600 font-mono">
                SNIPPET_ID: {snippet._id}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
        <div className="relative text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 shadow-lg shadow-green-400/50 mx-auto"></div>
          <p className="text-green-400 mt-4 font-mono animate-pulse text-lg">LOADING_PUBLIC_MATRIX...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center">
        <div className="text-center border border-red-400/50 bg-red-900/20 p-6 rounded-lg backdrop-blur-sm">
          <p className="text-red-400 text-xl font-mono">[ERROR] {error}</p>
        </div>
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center">
        <p className="text-gray-400 text-center text-xl font-mono">[NO_PUBLIC_SNIPPETS_FOUND]</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white px-6 py-12 flex flex-col items-center relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="border border-green-400/20"></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="relative text-center mb-14">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-2xl font-mono">
            PUBLIC_REPOSITORY.DB
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur opacity-30 animate-pulse"></div>
        </div>
        <p className="text-gray-400 mt-4 font-mono text-lg">[ ACCESSING_GLOBAL_CODE_VAULT ]</p>
        <div className="mt-4 w-24 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto animate-pulse"></div>
      </div>

      {/* Snippets Grid */}
      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {snippets.map((snippet, index) => (
          <div
            key={snippet._id}
            className="relative bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 shadow-xl hover:shadow-green-400/20 transition-all duration-500 flex flex-col group overflow-hidden"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-mono mb-1">
                    &gt; {snippet.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-mono">// {snippet.description}</p>
                </div>
                <div className="ml-3 flex items-center space-x-2">
                  <span className="text-xs text-gray-500 font-mono">
                    {snippet.language}
                  </span>
                  <PreviewIcon onClick={() => handlePreviewClick(snippet)} />
                  <CopyIcon 
                    onClick={() => handleCopy(snippet.code, snippet._id)}
                    copied={copiedId === snippet._id}
                  />
                </div>
              </div>

              {/* Code Block */}
              <div className="relative flex-grow mb-4">
                <style jsx>{`
                  .green-scrollbar::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                  }
                  .green-scrollbar::-webkit-scrollbar-track {
                    background: linear-gradient(145deg, #0f0f23, #1a1a2e, #16213e);
                    border-radius: 6px;
                    border: 1px solid #2d3748;
                    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
                  }
                  .green-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(145deg, #34d399, #10b981, #059669, #047857);
                    border-radius: 6px;
                    border: 1px solid #064e3b;
                    box-shadow: 
                      0 0 10px rgba(16, 185, 129, 0.6),
                      0 0 20px rgba(16, 185, 129, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                  }
                  .green-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(145deg, #6ee7b7, #34d399, #10b981, #059669);
                    box-shadow: 
                      0 0 15px rgba(16, 185, 129, 0.8),
                      0 0 30px rgba(16, 185, 129, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    transform: scale(1.05);
                  }
                  .green-scrollbar::-webkit-scrollbar-thumb:active {
                    background: linear-gradient(145deg, #a7f3d0, #6ee7b7, #34d399, #10b981);
                    box-shadow: 
                      0 0 25px rgba(16, 185, 129, 1),
                      0 0 50px rgba(16, 185, 129, 0.5);
                  }
                  .green-scrollbar::-webkit-scrollbar-corner {
                    background: #1a1a2e;
                    border-radius: 6px;
                  }
                `}</style>
                <pre className="bg-black/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-sm overflow-auto font-mono whitespace-pre-wrap h-48 text-green-300 shadow-inner green-scrollbar">
                  <code>{snippet.code}</code>
                </pre>
                {copiedId === snippet._id && (
                  <div className="absolute top-2 right-2 bg-green-900/80 text-green-300 px-2 py-1 rounded text-xs font-mono animate-pulse">
                    COPIED!
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {snippet.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-green-700/50 to-blue-700/50 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs font-mono font-medium select-none backdrop-blur-sm hover:shadow-sm hover:shadow-green-400/30 transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700/30">
                <div className="text-xs text-gray-500 font-mono">
                  ID: {snippet._id}
                </div>
                <div className="text-xs text-green-400 font-mono">
                  [PUBLIC_ACCESS]
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative mt-16 text-center text-gray-500 text-sm font-mono">
        <div className="relative">
          © 2025 PUBLIC_CODE_MATRIX - [ GLOBAL_ACCESS_ENABLED ]
          <div className="absolute inset-0 bg-green-400/5 animate-pulse opacity-50"></div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        show={previewModal.show}
        snippet={previewModal.snippet}
        onClose={handlePreviewClose}
      />
    </div>
  );
}