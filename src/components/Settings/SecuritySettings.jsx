import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";

const SecuritySettings = () => {
  const navigate = useNavigate();

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurity({
      ...security,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (security.newPassword !== security.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }
    alert("✅ Security settings updated successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* ✅ Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Settings", onClick: () => navigate("/settings") },
          { label: "Security Settings" },
        ]}
      />

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        🔒 Security Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Password Section */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={security.currentPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={security.newPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={security.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Two-Factor Authentication (2FA)
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Adds an extra layer of protection to your account.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={security.twoFactorAuth}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
            <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        {/* Save / Back Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium shadow"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;
