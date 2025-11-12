import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import DashboardPage from "../Dashboard/DashboardPage";
import AllLeadsPage from "../Leads/AllLeadsPage";
import QualifiedLeadsPage from "../Leads/QualifiedLeadsPage";
import UnqualifiedLeadsPage from "../Leads/UnqualifiedLeadsPage";
import CustomersPage from "../Customers/CustomersPage";
import AgentsPage from "../Agents/AgentsPage";
import SalesPage from "../Sales/SalesPage";
import ReportsPage from "../Reports/ReportsPage";
import SettingsPage from "../Settings/SettingsPage";
import ProfileSettings from "../Settings/ProfileSettings";
import SystemPreferences from "../Settings/SystemPreferences";
import SecuritySettings from "../Settings/SecuritySettings"; // ✅ NEW IMPORT

const DashboardLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setCurrentPage={(page) => navigate(page)} />

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto p-6 transition-colors bg-gray-50 dark:bg-gray-900">
          <Routes>
            {/* ✅ Default route → Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* ✅ Main Pages */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/leads/all" element={<AllLeadsPage />} />
            <Route path="/leads/qualified" element={<QualifiedLeadsPage />} />
            <Route path="/leads/unqualified" element={<UnqualifiedLeadsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            {/* ✅ Settings & Nested Pages */}
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/preferences" element={<SystemPreferences />} />
            <Route path="/settings/security" element={<SecuritySettings />} /> {/* ✅ NEW ROUTE */}

            {/* ✅ Fallback - redirect unknown routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
