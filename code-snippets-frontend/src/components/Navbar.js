import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("theme");
    navigate("/login");
    console.log("Logout clicked");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 via-slate-900 to-zinc-900 px-4 sm:px-6 lg:px-8 py-4 shadow-2xl text-white backdrop-blur-sm border-b border-green-400/30 relative overflow-hidden">
      {/* Cyberpunk glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
      
      {/* Desktop Layout */}
      <div className="relative flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/40">
              <span className="text-black font-bold text-sm">S</span>
              <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-pulse"></div>
            </div>
            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-lime-300 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
              Snippet
            </span>
          </div>
          <span className="hidden sm:block text-lg sm:text-xl font-light text-gray-300 drop-shadow-sm">Manager</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-6">
            <a
              href="/dashboard"
              className="relative text-gray-300 hover:text-green-300 transition-all duration-300 group"
            >
              <span className="relative z-10 drop-shadow-sm">Home</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-sm shadow-green-400/50"></div>
              <div className="absolute inset-0 bg-green-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/snippets/create"
              className="relative text-gray-300 hover:text-green-300 transition-all duration-300 group"
            >
              <span className="relative z-10 drop-shadow-sm">Create</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-sm shadow-green-400/50"></div>
              <div className="absolute inset-0 bg-green-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href="/snippets/public"
              className="relative text-gray-300 hover:text-green-300 transition-all duration-300 group"
            >
              <span className="relative z-10 drop-shadow-sm">Public Snippets</span>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-sm shadow-green-400/50"></div>
              <div className="absolute inset-0 bg-green-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
          
          <button
            onClick={handleLogout}
            className="relative bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-black font-bold px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/40 hover:shadow-green-500/60 hover:scale-105 text-sm sm:text-base border border-green-400/50 overflow-hidden"
          >
            <span className="relative z-10">Log out</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-green-400/10 animate-pulse"></div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden relative w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/40 transition-all duration-300 border border-green-400/50 overflow-hidden"
        >
          <div className="absolute inset-0 bg-green-400/20 animate-pulse"></div>
          <div className="relative z-10 w-5 h-5 flex flex-col justify-center items-center">
            <span
              className={`block w-4 h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-0.5' : ''
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-black mt-1 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-black mt-1 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden mt-4 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="relative bg-gradient-to-r from-gray-950/70 to-slate-900/70 backdrop-blur-sm rounded-lg border border-green-400/30 p-4 space-y-3 shadow-lg shadow-green-500/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
          
          <a
            href="/dashboard"
            className="relative block text-gray-300 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-green-800/20 hover:shadow-sm hover:shadow-green-500/20 border border-transparent hover:border-green-500/30"
          >
            <span className="relative z-10">Home</span>
          </a>
          <a
            href="/snippets/create"
            className="relative block text-gray-300 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-green-800/20 hover:shadow-sm hover:shadow-green-500/20 border border-transparent hover:border-green-500/30"
          >
            <span className="relative z-10">Create</span>
          </a>
          <a
            href="/snippets/public"
            className="relative block text-gray-300 hover:text-green-300 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-green-800/20 hover:shadow-sm hover:shadow-green-500/20 border border-transparent hover:border-green-500/30"
          >
            <span className="relative z-10">Public Snippets</span>
          </a>
          <button
            onClick={handleLogout}
            className="relative w-full text-left bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-black font-bold py-2 px-3 rounded-lg transition-all duration-300 shadow-lg shadow-green-500/30 border border-green-400/50 overflow-hidden"
          >
            <span className="relative z-10">Log out</span>
            <div className="absolute inset-0 bg-green-400/20 animate-pulse"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}