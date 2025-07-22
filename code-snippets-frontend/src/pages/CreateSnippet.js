import React, { useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

export default function CreateSnippet() {
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "",
    tags: "",
    description: "",
    isPublic: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(",").map((tag) => tag.trim()) };
      
      await axios.post("https://code-snippet-app-production.up.railway.app/api/snippets", payload, getAuthHeaders());
      console.log("Snippet created:", payload);
      alert("✅ Snippet created successfully!");
      
      setForm({
        title: "",
        code: "",
        language: "",
        tags: "",
        description: "",
        isPublic: false,
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error creating snippet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950 text-white flex justify-center items-center px-4 py-10 relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
      
      {/* Floating grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-green-400/20"></div>
          ))}
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-green-400/30 overflow-hidden">
        {/* Card glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 to-blue-400/10 blur opacity-20"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent tracking-wide drop-shadow-2xl font-mono mb-2">
              CREATE_SNIPPET.EXE
            </h2>
            <p className="text-gray-400 font-mono text-lg">[ INITIALIZING_CODE_MATRIX ]</p>
            <div className="mt-4 w-20 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 mx-auto animate-pulse"></div>
          </div>

          <div className="space-y-6">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "title", placeholder: "> Title", icon: "📝" },
                { field: "language", placeholder: "> Language", icon: "💻" },
                { field: "tags", placeholder: "> Tags (comma separated)", icon: "🏷️" },
                { field: "description", placeholder: "> Description", icon: "📄" }
              ].map(({ field, placeholder, icon }) => (
                <div key={field} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 font-mono text-sm">
                      {icon}
                    </span>
                    <input
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-black/60 border border-green-400/30 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-300 font-mono backdrop-blur-sm"
                      required={field !== "tags" && field !== "description"}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="absolute top-3 left-3 text-green-400 font-mono text-sm flex items-center space-x-2">
                  <span>⚡</span>
                  <span>CODE_INPUT:</span>
                </div>
                <textarea
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  placeholder="// Enter your code here...
// This is where the magic happens!"
                  className="w-full bg-black/80 border border-green-400/30 rounded-lg p-4 pt-12 h-64 text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400 transition-all duration-300 font-mono backdrop-blur-sm resize-none"
                  required
                ></textarea>
                <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-mono">
                  {form.code.length} chars
                </div>
              </div>
            </div>

            {/* Public Toggle */}
            <div className="relative">
              <label className="flex items-center space-x-4 p-4 rounded-lg bg-black/40 border border-green-400/20 hover:border-green-400/40 transition-all duration-300 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                    form.isPublic 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/30' 
                      : 'bg-gray-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-0.5 ${
                      form.isPublic ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-green-300 font-mono select-none">🌐 PUBLIC_ACCESS</span>
                  <p className="text-xs text-gray-400 font-mono">Enable global visibility</p>
                </div>
                <div className="text-xs font-mono">
                  <span className={form.isPublic ? "text-green-400" : "text-red-400"}>
                    [{form.isPublic ? "ENABLED" : "DISABLED"}]
                  </span>
                </div>
              </label>
              
              {form.isPublic && (
                <div className="mt-3 p-3 rounded-lg bg-yellow-900/20 border border-yellow-400/30 animate-pulse">
                  <p className="text-yellow-400 text-sm flex items-center space-x-2 font-mono">
                    <span>⚠️</span>
                    <span>WARNING: PUBLIC_MODE_ACTIVE - Verify no sensitive data included</span>
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div
              onClick={handleSubmit}
              className="w-full relative bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-black font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 border border-green-400/50 overflow-hidden font-mono text-lg group cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>DEPLOY_SNIPPET</span>
                <span>🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-green-400/10 animate-pulse"></div>
              
              {/* Button glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}