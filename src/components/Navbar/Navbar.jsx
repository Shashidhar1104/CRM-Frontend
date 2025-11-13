// src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns"; // optional nice timestamp (install date-fns if not present)

const NOTIFICATIONS_KEY = "amplinova_notifications_v1";

const defaultSampleNotifications = [
  {
    id: "n1",
    title: "New Lead Created",
    message: "A new lead (Ava Martinez) was added by Olivia.",
    ts: Date.now() - 1000 * 60 * 20,
    read: false,
    type: "info",
  },
  {
    id: "n2",
    title: "High Value Customer",
    message: "Customer John Smith crossed $3,000 in purchases.",
    ts: Date.now() - 1000 * 60 * 60 * 5,
    read: false,
    type: "success",
  },
];

const loadNotifications = () => {
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) return [...defaultSampleNotifications];
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load notifications", err);
    return [...defaultSampleNotifications];
  }
};

const saveNotifications = (list) => {
  try {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save notifications", err);
  }
};

const Navbar = ({ setSidebarOpen, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // load from localStorage on mount
  useEffect(() => {
    setNotifications(loadNotifications());
  }, []);

  // keep localStorage in sync
  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  // close dropdowns when clicking outside
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Actions
  const markAsRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const toggleRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  const deleteNotification = (id) => {
    if (!window.confirm("Delete this notification?")) return;
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    if (!window.confirm("Clear all notifications?")) return;
    setNotifications([]);
  };

  // Handy method to add a notification (useful for testing or when you hook your webhook/backend)
  const addNotification = (payload) => {
    const notif = {
      id: `n${Date.now()}`,
      title: payload.title || "Notification",
      message: payload.message || "",
      ts: Date.now(),
      read: false,
      type: payload.type || "info",
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  // sample add button handler (useful for testing)
  const addSample = () =>
    addNotification({
      title: "Manual Sample",
      message: "This is a test notification added manually.",
      type: "info",
    });

  return (
    <nav className="flex items-center justify-between bg-blue-700 text-white px-6 py-3 shadow-md relative z-20">
      {/* Sidebar toggle for small screens */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* center spacer so navbar content aligns to the right */}
      <div className="hidden md:block flex-1" />

      {/* right side */}
      <div className="flex items-center space-x-6 relative navbar-dropdown">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotificationsOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            className="relative hover:text-blue-200 focus:outline-none transition"
            title="Notifications"
          >
            <BellIcon className="h-6 w-6" />
            {/* badge */}
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-semibold"
                aria-live="polite"
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-96 max-h-96 overflow-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg py-2 z-30 border border-gray-200 dark:border-gray-700 animate-fadeIn">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <div className="text-sm font-semibold">Notifications</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // mark all as read
                      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                    }}
                    className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Mark all read
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* list */}
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700 flex gap-3 items-start ${
                      n.read ? "opacity-70" : "bg-blue-50 dark:bg-gray-900/40"
                    }`}
                  >
                    {/* marker */}
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          n.read ? "bg-transparent border border-gray-400" : "bg-blue-600"
                        }`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-medium truncate">{n.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {typeof formatDistanceToNow === "function"
                            ? formatDistanceToNow(new Date(n.ts), { addSuffix: true })
                            : new Date(n.ts).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">{n.message}</div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => toggleRead(n.id)}
                          className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          {n.read ? "Mark unread" : "Mark read"}
                        </button>
                        <button
                          onClick={() => deleteNotification(n.id)}
                          className="text-xs px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* footer with quick add (for dev/testing) */}
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <small className="text-xs text-gray-500">Local notifications (no backend)</small>
                <div className="flex items-center gap-2">
                  <button
                    onClick={addSample}
                    className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Add sample
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 focus:outline-none hover:text-blue-200 transition"
            title="Account"
          >
            <UserCircleIcon className="h-7 w-7" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg z-20 border border-gray-200 dark:border-gray-700 animate-fadeIn">
              <div className="px-4 py-2 text-sm border-b border-gray-200 dark:border-gray-700">
                <p className="font-semibold">My Account</p>
              </div>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 rounded-b-md transition"
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
