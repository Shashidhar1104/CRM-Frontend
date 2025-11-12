// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const currentTheme = localStorage.getItem("theme");

  return (
    <ThemeProvider>
      <DataProvider>
        <div
          className={`App min-h-screen transition-colors duration-300 ${
            currentTheme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <Router>
            <Routes>
              {/* 🔐 Public Login */}
              {!isLoggedIn && (
                <>
                  <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
                  {/* Redirect everything else to login */}
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}

              {/* 🧭 Protected Dashboard */}
              {isLoggedIn && (
                <>
                  {/* Default route after login */}
                  <Route path="/*" element={<DashboardLayout onLogout={handleLogout} />} />
                  {/* Redirect base / to dashboard */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
          </Router>
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
