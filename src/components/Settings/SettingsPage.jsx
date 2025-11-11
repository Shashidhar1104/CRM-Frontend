// src/components/Settings/SettingsPage.jsx
import React from "react";

const SettingsPage = ({ setSettingsSubPage }) => {
  const settingsOptions = [
    {
      id: "profile",
      name: "Profile Settings",
      description: "Update your personal details and profile photo.",
      icon: "👤",
    },
    {
      id: "preferences",
      name: "System Preferences",
      description: "Customize dashboard appearance and behavior.",
      icon: "⚙️",
    },
    {
      id: "security",
      name: "Security Settings",
      description: "Manage passwords, login sessions, and 2FA.",
      icon: "🔒",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        ⚙️ Settings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setSettingsSubPage(opt.id)} // ✅ uses state, not router
            className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg hover:scale-105 cursor-pointer transition-all"
          >
            <div className="text-4xl mb-3">{opt.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {opt.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              {opt.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
