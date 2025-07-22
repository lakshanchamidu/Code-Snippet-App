import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignInClick = () => {
    navigate("/login")
  };

const handleRegister = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setShowMessage(false);
  setMessage("");

  try {
    const response = await axios.post("https://code-snippet-app-production.up.railway.app/api/auth/register", form);

    setMessage("Neural link established!");
    setForm({ username: "", email: "", password: "" });
    setShowMessage(true);
    setIsLoading(false);

    setTimeout(() => {
      window.location.href = "/login";
    }, 1600);
  } catch (error) {
    setMessage(error.response?.data?.message || "Connection failed. Neural link disrupted.");
    setShowMessage(true);
    setIsLoading(false);
  }
};
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-zinc-950">
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

      {/* Animated orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-0 right-4 w-72 h-72 bg-blue-500 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-400 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: "4s" }}></div>

      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Welcome Section */}
        <div className="flex flex-col justify-center items-center text-white px-8 py-12 lg:border-r border-green-400/20">
          <div className="text-center space-y-8 max-w-lg">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500 border border-green-400/50">
                <svg
                  className="w-12 h-12 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
            </div>

            {/* Welcome Text */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-green-400 text-transparent bg-clip-text leading-tight font-mono tracking-wide">
                NEURAL
                <span className="text-4xl lg:text-5xl block"> LINK</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full animate-pulse"></div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed font-mono">
              [ ESTABLISHING_NEW_CONNECTION ]<br/>
              Initialize your digital identity...
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {["ENCRYPTED", "QUANTUM_SAFE", "AI_POWERED", "SECURE_MESH"].map((feature, index) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-green-900/20 backdrop-blur-sm rounded-full text-sm font-medium border border-green-400/30 hover:bg-green-800/30 transition-all duration-300 font-mono text-green-300"
                  style={{
                    animation: "fadeInUp 0.5s ease-out forwards",
                    animationDelay: `${index * 200}ms`,
                    opacity: 0,
                  }}
                >
                  [{feature}]
                </span>
              ))}
            </div>

            {/* Join Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text font-mono">
                  1M+
                </div>
                <div className="text-sm text-gray-400 font-mono">[NEURAL_NODES]</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text font-mono">
                  24/7
                </div>
                <div className="text-sm text-gray-400 font-mono">[GRID_ACTIVE]</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="relative flex items-center justify-center p-6 lg:p-8">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
              style={{ animation: "float 6s ease-in-out infinite" }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full blur-3xl"
              style={{ animation: "float 6s ease-in-out infinite", animationDelay: "3s" }}
            ></div>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <div className="bg-gray-900/60 backdrop-blur-xl border border-green-400/30 rounded-3xl shadow-2xl p-8 hover:bg-gray-900/70 transition-all duration-500 transform relative overflow-hidden">
              {/* Card glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-400/5"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-green-400/10 to-blue-400/10 blur opacity-30"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-6 shadow-lg shadow-green-500/25 transform hover:rotate-6 transition-all duration-300 border border-green-400/50">
                    <svg
                      className="w-8 h-8 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-green-400 mb-2 font-mono">[NEURAL_REGISTRATION]</h2>
                  <p className="text-gray-400 font-mono text-sm">// Create digital identity</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-6">
                  {/* Username Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === "username" ? "text-green-400" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      name="username"
                      placeholder="neural.username"
                      value={form.username}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-black/40 border border-green-400/30 rounded-2xl text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-black/60 group-hover:border-green-400/50 font-mono backdrop-blur-sm"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 ${
                        focusedField === "username" ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === "email" ? "text-green-400" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="node.address@cyber.net"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-black/40 border border-green-400/30 rounded-2xl text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-black/60 group-hover:border-green-400/50 font-mono backdrop-blur-sm"
                    />
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 ${
                        focusedField === "email" ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className={`h-5 w-5 transition-colors duration-200 ${
                          focusedField === "password" ? "text-green-400" : "text-gray-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••••••"
                      value={form.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      required
                      className="w-full pl-12 pr-16 py-4 bg-black/40 border border-green-400/30 rounded-2xl text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-black/60 group-hover:border-green-400/50 font-mono backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-400 transition-colors duration-200"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    <div
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-300 ${
                        focusedField === "password" ? "w-full" : "w-0"
                      }`}
                    ></div>
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-black font-bold rounded-2xl shadow-lg shadow-green-500/25 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden group font-mono text-lg border border-green-400/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          [ESTABLISHING_LINK...]
                        </>
                      ) : (
                        "[CREATE_NEURAL_LINK]"
                      )}
                    </div>
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm font-mono">
                    // Already connected to the grid?{" "}
                    <button onClick={handleSignInClick} className="text-green-400 hover:text-green-300 font-medium transition-colors duration-200 hover:underline">
                      [ACCESS_NEURAL_LINK]
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Message */}
      {showMessage && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-green-900/90 to-blue-900/90 backdrop-blur-lg text-green-300 px-6 py-3 rounded-xl shadow-lg z-50 transition-opacity duration-300 border border-green-400/50 font-mono">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>[{message}]</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}