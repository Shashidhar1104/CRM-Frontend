// src/components/Settings/SystemPreferences.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Breadcrumb from "../common/Breadcrumb";

const SystemPreferences = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* ✅ Breadcrumb navigation */}
      <Breadcrumb
        items={[
          { label: "Settings", onClick: () => navigate("/settings") },
          { label: "System Preferences" },
        ]}
      />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        ⚙️ System Preferences
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Manage your theme and UI appearance preferences.
      </p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate("/settings")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium shadow"
        >
          ← Back
        </button>

        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow"
        >
          Toggle Theme ({theme === "dark" ? "🌙 Dark" : "☀️ Light"})
        </button>
      </div>
    </div>
  );
};

export default SystemPreferences;
