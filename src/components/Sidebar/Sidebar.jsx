
import React, { useState } from "react";
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import ampliNovaLogo from "../../Assets/AmpliNova Final Logo.png"; // ✅ Import logo

const Sidebar = ({ sidebarOpen, setCurrentPage }) => {
  const [leadsDropdownOpen, setLeadsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const handleNavigation = (page) => {
    setActivePage(page);
    setCurrentPage(page);
  };

  const menuItems = [
    { name: "Dashboard", icon: <ChartBarIcon className="h-5 w-5" />, page: "dashboard" },
    {
      name: "Leads",
      icon: <UsersIcon className="h-5 w-5" />,
      hasSubmenu: true,
      subItems: [
        { name: "All Leads", page: "all-leads" },
        { name: "Qualified Leads", page: "qualified-leads" },
        { name: "Unqualified Leads", page: "unqualified-leads" },
      ],
    },
    { name: "Customers", icon: <UserGroupIcon className="h-5 w-5" />, page: "customers" },
    { name: "Agents", icon: <UserIcon className="h-5 w-5" />, page: "agents" },
    { name: "Sales", icon: <CurrencyDollarIcon className="h-5 w-5" />, page: "sales" },
    { name: "Reports", icon: <ClipboardDocumentListIcon className="h-5 w-5" />, page: "reports" },
    { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" />, page: "settings" },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-blue-700 text-white w-64 h-screen fixed md:static md:translate-x-0 transition-transform duration-300 z-30 flex flex-col`}
    >
      {/* ✅ Sticky Header with Logo */}
      <div
        onClick={() => handleNavigation("dashboard")}
        className="sticky top-0 z-20 flex items-center justify-center gap-3 p-5 border-b border-blue-500 bg-blue-700 cursor-pointer hover:bg-blue-600 transition-all"
      >
        <img
          src={ampliNovaLogo}
          alt="AmpliNova Logo"
          className="w-12 h-12 object-contain drop-shadow-md"
        />
        <h1 className="text-xl font-semibold tracking-wide whitespace-nowrap">AmpliNova</h1>
      </div>

      {/* ✅ Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-3 space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() =>
                  item.hasSubmenu
                    ? setLeadsDropdownOpen(!leadsDropdownOpen)
                    : handleNavigation(item.page)
                }
                className={`flex items-center w-full px-4 py-2 rounded-lg hover:bg-blue-600 transition-all ${
                  activePage === item.page ? "bg-blue-800" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="flex-1 text-left">{item.name}</span>
                {item.hasSubmenu && (
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      leadsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.hasSubmenu && leadsDropdownOpen && (
                <ul className="ml-2 mt-1 space-y-1 text-center">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button
                        onClick={() => handleNavigation(subItem.page)}
                        className={`block w-full py-2 text-sm rounded-md hover:bg-blue-600 transition ${
                          activePage === subItem.page ? "bg-blue-800" : ""
                        }`}
                      >
                        {subItem.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ✅ Footer */}
      <div className="p-4 border-t border-blue-500 text-center text-xs opacity-80">
        © 2025 AmpliNova
      </div>
    </aside>
  );
};

export default Sidebar;
