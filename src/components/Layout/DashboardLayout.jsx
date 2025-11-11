import React, { useState } from "react";
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

const DashboardLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [settingsSubPage, setSettingsSubPage] = useState("overview");

  const renderContent = () => {
    switch (currentPage) {
      case "all-leads":
        return <AllLeadsPage />;
      case "qualified-leads":
        return <QualifiedLeadsPage />;
      case "unqualified-leads":
        return <UnqualifiedLeadsPage />;
      case "customers":
        return <CustomersPage />;
      case "agents":
        return <AgentsPage />;
      case "sales":
        return <SalesPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        switch (settingsSubPage) {
          case "profile":
            return (
              <ProfileSettings
                onBack={() => setSettingsSubPage("overview")}
              />
            );
          case "preferences":
            return (
              <SystemPreferences
                onBack={() => setSettingsSubPage("overview")}
              />
            );
          default:
            return (
              <SettingsPage
                setSettingsSubPage={setSettingsSubPage}
              />
            );
        }
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setCurrentPage={setCurrentPage} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6 transition-colors bg-gray-50 dark:bg-gray-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
