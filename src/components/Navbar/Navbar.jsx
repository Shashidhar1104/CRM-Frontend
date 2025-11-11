
import React, { useState, useEffect } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Navbar = ({ setSidebarOpen, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // ✅ Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar-dropdown")) {
        setProfileOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-blue-700 text-white px-6 py-3 shadow-md relative">
      {/* ✅ Sidebar Toggle (for mobile only) */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* ✅ Empty center to balance layout */}
      <div className="flex-1"></div>

      {/* ✅ Right side */}
      <div className="flex items-center space-x-5 relative navbar-dropdown">
        {/* 🔔 Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative hover:text-blue-200 focus:outline-none transition"
          >
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-md shadow-lg py-2 z-20 border border-gray-200">
              <p className="text-center text-sm text-gray-600 py-3">
                No new notifications
              </p>
            </div>
          )}
        </div>

        {/* 👤 Profile / Logout */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 focus:outline-none hover:text-blue-200 transition"
          >
            <UserCircleIcon className="h-7 w-7" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white text-gray-800 rounded-md shadow-lg z-20 border border-gray-200">
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
