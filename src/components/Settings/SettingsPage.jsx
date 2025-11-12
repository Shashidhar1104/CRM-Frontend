// src/components/Settings/SettingsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      id: "profile",
      name: "Profile Settings",
      description: "Update your personal details and profile photo.",
      icon: "👤",
      path: "/settings/profile",
    },
    {
      id: "preferences",
      name: "System Preferences",
      description: "Customize dashboard appearance and behavior.",
      icon: "⚙️",
      path: "/settings/preferences",
    },
    {
      id: "security",
      name: "Security Settings",
      description: "Manage passwords, login sessions, and 2FA.",
      icon: "🔒",
      path: "/settings/security",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 min-h-[80vh]">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        ⚙️ Settings
      </h2>

      {/* Settings Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => navigate(opt.path)} // ✅ uses React Router navigation
            className="p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                       rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer 
                       transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-3">{opt.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {opt.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {opt.description}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(opt.path);
                }}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
              >
                Open →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
