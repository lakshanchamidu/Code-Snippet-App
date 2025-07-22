import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../utils/auth";
import axios from "axios";

export default function Dashboard() {
  const [userSnippets, setUserSnippets] = useState([]);
  const [publicSnippets, setPublicSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, snippet: null });
  const [previewModal, setPreviewModal] = useState({ show: false, snippet: null });
  const navigate = useNavigate();



  const userSnippetIds = new Set(userSnippets.map((s) => s._id));
  const filteredPublicSnippets = publicSnippets.filter((s) => !userSnippetIds.has(s._id));
  const displayedSnippets = [...userSnippets, ...filteredPublicSnippets];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);

        const res = await axios.get("https://code-snippet-app-production.up.railway.app/api/snippets", getAuthHeaders());
        const snippets = res.data;
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.userId;

        const userSnips = snippets.filter((s) => s.user === userId);
        const publicSnips = snippets.filter((s) => s.isPublic);

        setUserSnippets(userSnips);
        setPublicSnippets(publicSnips);
        setError(null);
      } catch (err) {
        setError("Failed to fetch snippets");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);




  const handleEdit = (snippet) => {
    navigate(`/snippets/edit/${snippet._id}`);
    console.log(`Navigate to edit: /snippets/edit/${snippet._id}`);

    window.history.pushState({}, '', `/snippets/edit/${snippet._id}`);
    
  };

  const handleDeleteClick = (snippet) => {
    setDeleteModal({ show: true, snippet });
  };

  const handleDeleteConfirm = () => {
    const snippet = deleteModal.snippet;
    setUserSnippets(prev => prev.filter(s => s._id !== snippet._id));
    setDeleteModal({ show: false, snippet: null });
    setTimeout(() => {
      axios.delete(`https://code-snippet-app-production.up.railway.app/api/snippets/${snippet._id}`, getAuthHeaders())
        .then(() => {
          console.log(`Snippet ${snippet._id} deleted successfully`);
        })
        .catch(err => {
          console.error("Failed to delete snippet:", err);
          setError("Failed to delete snippet");
        }); 
    }, 300);
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, snippet: null });
  };

  const handlePreviewClick = (snippet) => {
    setPreviewModal({ show: true, snippet });
  };

  const handlePreviewClose = () => {
    setPreviewModal({ show: false, snippet: null });
  };
  const CopyIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Copy code"
      className="text-green-400 hover:text-green-300 transition-all duration-300 hover:drop-shadow-lg hover:shadow-green-400/50 group"
      title="Copy code"
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
          d="M9 12h6m-6 4h6m-3-8v8m-4 4h10a2 2 0 002-2v-8a2 2 0 00-2-2h-3m-4 0H7a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </button>
  );

  const EditIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Edit snippet"
      className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:drop-shadow-lg hover:shadow-blue-400/50 group"
      title="Edit snippet"
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
          d="M15.232 5.232l3.536 3.536M9 13.5v3.75a.75.75 0 00.75.75h3.75m0-7.5L19.5 5.25a2.121 2.121 0 00-3-3L9 10.5z"
        />
      </svg>
    </button>
  );

  const DeleteIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Delete snippet"
      className="text-red-400 hover:text-red-300 transition-all duration-300 hover:drop-shadow-lg hover:shadow-red-400/50 group"
      title="Delete snippet"
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );

  const PreviewIcon = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Preview code"
      className="text-purple-400 hover:text-purple-300 transition-all duration-300 hover:drop-shadow-lg hover:shadow-purple-400/50 group"
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

  // Delete Confirmation Modal
  const DeleteModal = ({ show, snippet, onConfirm, onCancel }) => {
    if (!show || !snippet) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-sm border border-red-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-red-500/20 overflow-hidden">
          {/* Modal glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-red-400/5"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400/50 to-transparent"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400/10 to-red-500/10 blur opacity-30"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-red-400 text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent font-mono mb-2">
                [DELETION_WARNING]
              </h2>
              <p className="text-gray-400 font-mono text-sm">IRREVERSIBLE_OPERATION_DETECTED</p>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-white font-mono text-center mb-4">
                Are you sure you want to delete this snippet?
              </p>

              <div className="bg-black/60 border border-red-400/30 rounded-lg p-4 mb-4">
                <h3 className="text-red-300 font-mono font-bold text-lg mb-2">
                  &gt; {snippet.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm mb-3">
                  // {snippet.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-red-900/30 border border-red-400/30 text-red-300 px-2 py-1 rounded text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {snippet.tags.length > 3 && (
                    <span className="text-gray-500 font-mono text-xs">
                      +{snippet.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-3">
                <p className="text-yellow-400 text-sm font-mono flex items-center">
                  <span className="mr-2">⚡</span>
                  WARNING: This action cannot be undone!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {/* Cancel Button */}
              <button
                onClick={onCancel}
                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-gray-500/30 border border-gray-500/50 font-mono"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>❌</span>
                  <span>CANCEL</span>
                </span>
              </button>

              {/* Delete Button */}
              <button
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 border border-red-400/50 font-mono group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>🗑️</span>
                  <span>DELETE</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-1">
        <div className="relative bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-sm border border-green-400/30 rounded-2xl p-4 max-w-7xl w-full max-h-[98vh] shadow-2xl shadow-green-500/20 overflow-hidden">
          {/* Modal glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-400/5"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 to-green-500/10 blur opacity-30"></div>

          <div className="relative z-10 h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent font-mono mb-2">
                  [CODE_PREVIEW.EXE]
                </h2>
                <p className="text-gray-400 font-mono text-sm">SNIPPET_VIEWER_ACTIVE</p>
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
            <div className="mb-6">
              <h3 className="text-purple-300 font-mono font-bold text-xl mb-2">
                &gt; {snippet.title}
              </h3>
              <p className="text-gray-400 font-mono text-sm mb-4">
                // {snippet.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {snippet.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-purple-700/50 to-purple-600/50 border border-purple-400/30 text-purple-300 px-3 py-1 rounded-full text-xs font-mono font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Code Display */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              <div className="flex items-center justify-between mb-2 flex-shrink-0">
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

              <div className="flex-1 bg-black/80 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-inner min-h-0 relative overflow-hidden">
                <style jsx>{`
                  .preview-green-scrollbar {
                    scrollbar-width: auto !important;
                    scrollbar-color: #22c55e #222222 !important;
                    overflow-y: scroll !important;
                    overflow-x: auto !important;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar {
                    width: 24px !important;
                    height: 24px !important;
                    background: #222222 !important;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-track {
                    background: linear-gradient(145deg, #000000, #333333, #111111) !important;
                    border-radius: 15px;
                    border: 4px solid #666666;
                    box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.9);
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(145deg, #34d399, #22c55e, #16a34a, #15803d) !important;
                    border-radius: 15px;
                    border: 4px solid #166534;
                    box-shadow: 
                      0 0 35px rgba(34, 197, 94, 1),
                      0 0 70px rgba(34, 197, 94, 0.8),
                      inset 0 4px 8px rgba(255, 255, 255, 0.4);
                    transition: all 0.3s ease;
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(145deg, #6ee7b7, #34d399, #22c55e, #16a34a) !important;
                    box-shadow: 
                      0 0 50px rgba(34, 197, 94, 1),
                      0 0 100px rgba(34, 197, 94, 1);
                    transform: scale(1.3);
                  }
                  .preview-green-scrollbar::-webkit-scrollbar-corner {
                    background: #333333;
                  }
                `}</style>
                <div className="h-full overflow-y-scroll overflow-x-auto preview-green-scrollbar" style={{ minHeight: '450px', maxHeight: '600px' }}>
                  <pre className="p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed" style={{ minHeight: '700px' }}>
                    <code className="text-green-300">
                      {snippet.code}


                      {/* Add spacing to ensure scrollbar appears */}
                      {Array.from({ length: 10 }, (_, i) => `\n`).join('')}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-green-400/20 flex-shrink-0">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-mono">
                PUBLIC_ACCESS:{" "}
                <span
                  className={snippet.isPublic
                    ? "text-green-400 font-semibold"
                    : "text-red-400 font-semibold"
                  }
                >
                  [{snippet.isPublic ? "ENABLED" : "DISABLED"}]
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
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400 shadow-lg shadow-green-400/50"></div>
          <p className="text-green-400 text-center mt-4 font-mono animate-pulse">Loading snippets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center">
        <p className="text-red-400 text-center text-xl border border-red-400/50 bg-red-900/20 p-4 rounded-lg backdrop-blur-sm">
          {error}
        </p>
      </div>
    );
  }

  if (displayedSnippets.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-400 text-xl font-mono">No snippets available.</p>
          <p className="text-gray-500 text-sm font-mono mt-2">Create your first snippet to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex flex-col relative overflow-hidden">
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

      <header className="relative p-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-2xl font-mono">
            CODE_SNIPPETS.EXE
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur opacity-30 animate-pulse"></div>
        </div>
        <p className="text-gray-400 mt-4 font-mono text-lg">[ SYSTEM_ONLINE ] - [ ACCESS_GRANTED ]</p>
      </header>

      <main className="relative flex-grow p-8">
        <div className="grid gap-8 md:grid-cols-2">
          {displayedSnippets.map((snippet, index) => (
            <div
              key={snippet._id}
              className="relative bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30 shadow-xl hover:shadow-green-400/20 transition-all duration-500 flex flex-col max-h-[420px] group overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-green-400 mb-3 flex-shrink-0 flex items-start justify-between font-mono gap-3">
                  <span className="drop-shadow-sm flex-1 leading-tight min-w-0">
                    &gt; {snippet.title || "Untitled Snippet"}
                  </span>
                  <div className="flex space-x-3 flex-shrink-0">
                    <PreviewIcon onClick={() => handlePreviewClick(snippet)} />
                    <EditIcon onClick={() => handleEdit(snippet)} />
                    <DeleteIcon onClick={() => handleDeleteClick(snippet)} />
                  </div>
                </h2>

                <p className="text-gray-400 mb-4 flex-shrink-0 font-mono text-sm line-clamp-2">// {snippet.description}</p>

                <div className="relative flex-grow overflow-hidden">
                  <style jsx>{`
                    .dashboard-scrollbar::-webkit-scrollbar {
                      width: 8px;
                      height: 8px;
                    }
                    .dashboard-scrollbar::-webkit-scrollbar-track {
                      background: linear-gradient(90deg, #1f2937, #111827);
                      border-radius: 4px;
                      border: 1px solid #374151;
                    }
                    .dashboard-scrollbar::-webkit-scrollbar-thumb {
                      background: linear-gradient(180deg, #10b981, #059669);
                      border-radius: 4px;
                      border: 1px solid #047857;
                      box-shadow: 0 0 6px rgba(16, 185, 129, 0.3);
                    }
                    .dashboard-scrollbar::-webkit-scrollbar-thumb:hover {
                      background: linear-gradient(180deg, #34d399, #10b981);
                      box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
                    }
                    .dashboard-scrollbar::-webkit-scrollbar-corner {
                      background: #1f2937;
                    }
                  `}</style>
                  <pre className="bg-black/80 backdrop-blur-sm text-sm p-4 rounded-lg overflow-y-auto max-h-[180px] font-mono whitespace-pre-wrap border border-gray-700/50 shadow-inner dashboard-scrollbar">
                    <code className="text-green-300">{snippet.code}</code>
                  </pre>
                  <div className="absolute top-3 right-5 flex items-center">
                    <CopyIcon onClick={() => handleCopy(snippet.code, snippet._id)} />
                    {copiedId === snippet._id && (
                      <span className="ml-2 text-xs text-green-400 font-semibold select-none animate-pulse drop-shadow-sm">
                        COPIED!
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 mb-2 flex-shrink-0">
                  {snippet.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-green-700/50 to-blue-700/50 border border-green-400/30 text-green-300 px-3 py-1 rounded-full text-xs font-mono font-medium select-none backdrop-blur-sm hover:shadow-sm hover:shadow-green-400/30 transition-all duration-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {snippet.tags.length > 3 && (
                    <span className="text-gray-500 font-mono text-xs">
                      +{snippet.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between flex-shrink-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-mono">
                    PUBLIC_ACCESS:{" "}
                    <span
                      className={snippet.isPublic
                        ? "text-green-400 font-semibold drop-shadow-sm"
                        : "text-red-400 font-semibold drop-shadow-sm"
                      }
                    >
                      [{snippet.isPublic ? "ENABLED" : "DISABLED"}]
                    </span>
                  </p>
                  <div className="text-xs text-gray-600 font-mono">
                    ID: {snippet._id}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative p-4 text-center text-gray-500 text-sm border-t border-green-400/20 font-mono backdrop-blur-sm">
        <div className="relative">
          © 2025 SNIPPET_MATRIX.SYS - [ ALL_RIGHTS_RESERVED ] - [ SYSTEM_SECURE ]
          <div className="absolute inset-0 bg-green-400/5 animate-pulse opacity-50"></div>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={deleteModal.show}
        snippet={deleteModal.snippet}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Preview Modal */}
      <PreviewModal
        show={previewModal.show}
        snippet={previewModal.snippet}
        onClose={handlePreviewClose}
      />
    </div>
  );
}