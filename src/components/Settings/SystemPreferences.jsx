import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Breadcrumb from "../common/Breadcrumb";

const SystemPreferences = ({ onBack }) => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* ✅ Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Settings", onClick: onBack },
          { label: "System Preferences" },
        ]}
      />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        ⚙️ System Preferences
      </h2>

      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            Dark Mode
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            Notifications
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SystemPreferences;
