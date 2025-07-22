import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EditSnippet from "./pages/EditSnippet";
import CreateSnippet from "./pages/CreateSnippet";
import MySnippets from "./pages/MySnippets";
import Navbar from "./components/Navbar";
import PublicSnippet from "./pages/PublicSnippet";



function AppWrapper() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const hideNavbarRoutes = ["/login", "/register", "/"];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/snippets/create"
          element={token ? <CreateSnippet /> : <Navigate to="/login" />}
        />
        <Route
          path="/snippets"
          element={token ? <MySnippets /> : <Navigate to="/login" />}
        />
        <Route
          path="/snippets/public"
          element={token ? <PublicSnippet /> : <Navigate to="/login" />}
        />
        <Route
          path="/snippets/edit/:id"
          element={token ? <EditSnippet /> : <Navigate to="/login" />}
        />

      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
