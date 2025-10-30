import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// 🧹 Always clear auth on new app run (forces login each time)
localStorage.removeItem("token");
localStorage.removeItem("role");

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // ✅ Sync storage between tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Recheck every 500ms (for same tab)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      const currentRole = localStorage.getItem("role");
      if (currentToken !== token || currentRole !== role) {
        setToken(currentToken);
        setRole(currentRole);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [token, role]);

  // ✅ Default redirect logic
  const getDefaultRedirect = () => {
    if (!token) return <Navigate to="/login" replace />;
    return role === "admin" ? <Navigate to="/admin" replace /> : <Navigate to="/home" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={getDefaultRedirect()} />
        <Route
          path="/home"
          element={token && role === "user" ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={token && role === "admin" ? <AdminDashboard /> : <Navigate to="/admin-login" replace />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
