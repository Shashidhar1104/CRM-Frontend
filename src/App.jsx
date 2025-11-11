// src/App.jsx
import React, { useState } from "react";
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Theme context
import { DataProvider } from "./context/DataContext";   // ✅ Shared data context
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Read theme from localStorage for initial background
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
          {isLoggedIn ? (
            <DashboardLayout onLogout={handleLogout} />
          ) : (
            <AuthPage onLogin={handleLogin} />
          )}
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
