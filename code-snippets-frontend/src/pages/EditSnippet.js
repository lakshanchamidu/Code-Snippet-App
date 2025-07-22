import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "../utils/auth";
import axios from "axios";

// Complete EditSnippet Page Component - Fully Responsive
export default function EditSnippetPage() {
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "",
    tags: "",
    description: "",
    isPublic: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { id: snippetId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://code-snippet-app-production.up.railway.app/api/snippets/${snippetId}`, getAuthHeaders());
        console.log("Response data:", response.data);
        const snippet = response.data;

        // Use setTimeout instead of requestAnimationFrame to avoid ResizeObserver issues
        setTimeout(() => {
          setForm({
            title: snippet.title,
            code: snippet.code,
            language: snippet.language,
            tags: snippet.tags.join(", "),
            description: snippet.description,
            isPublic: snippet.isPublic,
          });
        }, 0);

        setError("");
      } catch (err) {
        console.error("Failed to fetch snippet:", err);
        setError("Failed to load snippet");
      } finally {
        setLoading(false);
      }
    };

    if (snippetId) {
      fetchSnippet();
    }
  }, [snippetId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.title.trim() || !form.code.trim()) {
      alert("⚠️ Title and Code are required!");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(tag => tag),
        updatedAt: new Date().toISOString()
      };
      await axios.put(
        `https://code-snippet-app-production.up.railway.app/api/snippets/${snippetId}`,
        payload,
        getAuthHeaders()
      );

      alert("✅ Snippet updated successfully!");
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert("❌ Error updating snippet");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("⚠️ Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      navigate('/dashboard');
      alert("Cancelled - would navigate back to dashboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>

        <div className="relative text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-3 border-b-3 border-green-400 shadow-lg shadow-green-400/50 mx-auto"></div>
          <div className="mt-4 sm:mt-6 space-y-2">
            <p className="text-green-400 font-mono animate-pulse text-lg sm:text-xl">LOADING_SNIPPET_DATA...</p>
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex items-center justify-center relative overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5"></div>

        <div className="text-center border border-red-400/50 bg-red-900/20 p-6 sm:p-8 rounded-lg backdrop-blur-sm max-w-sm sm:max-w-md w-full">
          <div className="text-red-400 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-red-400 text-xl sm:text-2xl font-mono mb-4">[SYSTEM_ERROR]</h2>
          <p className="text-red-300 font-mono mb-6 text-sm sm:text-base break-words">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 sm:px-6 rounded-lg transition-all duration-300 font-mono text-sm sm:text-base"
          >
            RETRY_SYSTEM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex justify-center items-start px-2 sm:px-4 py-4 sm:py-6 md:py-10 relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>

      {/* Animated grid pattern - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-5 hidden sm:block">
        <div className="grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={i}
              className="border border-green-400/20 animate-pulse"
              style={{ animationDelay: `${(i % 12) * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        {/* Header */}
        <div className="mb-4 sm:mb-6 text-center">
          <p className="text-gray-400 font-mono text-sm sm:text-lg md:text-xl">
            Editing Snippet #{snippetId}
          </p>
        </div>

        {/* Main Edit Form */}
        <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-400/30 relative">
          {/* Card glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 to-blue-400/10 blur opacity-20"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="relative inline-block">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-2xl font-mono mb-2">
                  EDIT_SNIPPET.EXE
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur opacity-30 animate-pulse"></div>
              </div>
              <p className="text-gray-400 font-mono text-xs sm:text-sm md:text-base lg:text-lg break-words">
                [ MODIFYING_CODE_MATRIX ] - [ ID: {snippetId} ]
              </p>
              <div className="mt-2 sm:mt-4 w-16 sm:w-24 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto animate-pulse"></div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Input Grid - Responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { field: "title", placeholder: "> Title", icon: "📝", value: form.title },
                  { field: "language", placeholder: "> Language", icon: "💻", value: form.language },
                  { field: "tags", placeholder: "> Tags (comma separated)", icon: "🏷️", value: form.tags },
                  { field: "description", placeholder: "> Description", icon: "📄", value: form.description }
                ].map(({ field, placeholder, icon, value }) => (
                  <div key={field} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-mono text-xs sm:text-sm z-10">
                        {icon}
                      </span>
                      <input
                        name={field}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full pl-8 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 rounded-lg bg-black/60 border border-green-400/30 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-300 font-mono backdrop-blur-sm text-sm sm:text-base"
                        required={field !== "tags" && field !== "description"}
                      />
                      <div className="absolute inset-0 bg-green-400/5 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code Textarea - Responsive height */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-green-400 font-mono text-xs sm:text-sm flex flex-wrap items-center gap-1 sm:gap-2 z-10">
                    <span>⚡</span>
                    <span>CODE_EDITOR:</span>
                    <span className="text-blue-400 break-words">[ {form.language || 'No Language'} ]</span>
                  </div>
                  <textarea
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="// Edit your code here...
// Make your changes and save!"
                    className="w-full bg-black/80 border border-green-400/30 rounded-lg p-3 sm:p-4 pt-12 sm:pt-16 h-60 sm:h-72 md:h-80 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-300 font-mono backdrop-blur-sm resize-none leading-relaxed text-sm sm:text-base"
                    required
                  ></textarea>
                  <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4 z-10">
                    <span className="text-xs text-gray-500 font-mono">
                      Lines: {form.code.split('\n').length}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      Chars: {form.code.length}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-green-400/5 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Public Toggle - Mobile optimized */}
              <div className="relative">
                <label className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-lg bg-black/40 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer group">
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={form.isPublic}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-all duration-300 relative ${form.isPublic
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/30'
                        : 'bg-gray-600'
                      }`}>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 absolute top-0.5 ${form.isPublic ? 'translate-x-6 sm:translate-x-7' : 'translate-x-0.5'
                        } flex items-center justify-center`}>
                        <span className="text-xs">
                          {form.isPublic ? '🌐' : '🔒'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-green-300 font-mono select-none text-sm sm:text-base lg:text-lg block">
                      🌐 PUBLIC_ACCESS_MODE
                    </span>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono break-words">
                      Enable global repository visibility
                    </p>
                  </div>
                  <div className="text-xs sm:text-sm font-mono flex-shrink-0">
                    <span className={form.isPublic ? "text-green-400" : "text-red-400"}>
                      [{form.isPublic ? "ON" : "OFF"}]
                    </span>
                  </div>
                </label>

                {form.isPublic && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-yellow-900/20 border border-yellow-400/30 animate-pulse">
                    <p className="text-yellow-400 text-xs sm:text-sm flex items-start sm:items-center space-x-2 font-mono">
                      <span className="flex-shrink-0">⚠️</span>
                      <span className="break-words">SECURITY_WARNING: PUBLIC_MODE_ACTIVE - Verify no sensitive data included</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons - Responsive layout */}
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-4 pt-4">
                {/* Cancel Button */}
                  <button
                  onClick={handleCancel}
                  className="flex-1 relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-gray-500/40 hover:scale-105 border border-gray-500/50 font-mono text-sm sm:text-base lg:text-lg group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                    <span>❌</span>
                    <span className="hidden sm:inline">ABORT_CHANGES</span>
                    <span className="sm:hidden">CANCEL</span>
                  </span>
                  <div className="absolute inset-0 bg-gray-500/20 animate-pulse"></div>
                  <div className="absolute -inset-1 bg-gray-400/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>

                {/* Update Button */}
                  <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className={`flex-1 relative bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 border border-green-400/50 font-mono text-sm sm:text-base lg:text-lg group ${saving ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-t-2 border-b-2 border-black"></div>
                        <span className="hidden sm:inline">UPDATING_MATRIX...</span>
                        <span className="sm:hidden">SAVING...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span className="hidden sm:inline">COMMIT_CHANGES</span>
                        <span className="sm:hidden">SAVE</span>
                        <span className="hidden sm:inline">⚡</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 w-full h-full bg-green-400/10 animate-pulse"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </button>
              </div>------------------------
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}