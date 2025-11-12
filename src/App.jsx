// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Toast Notifications

// Pages
import AuthPage from "./components/AuthPage";
import DashboardLayout from "./components/Layout/DashboardLayout";
import DashboardPage from "./components/Dashboard/DashboardPage";
import AllLeadsPage from "./components/Leads/AllLeadsPage";
import QualifiedLeadsPage from "./components/Leads/QualifiedLeadsPage";
import UnqualifiedLeadsPage from "./components/Leads/UnqualifiedLeadsPage";
import CustomersPage from "./components/Customers/CustomersPage";
import AgentsPage from "./components/Agents/AgentsPage";
import SalesPage from "./components/Sales/SalesPage";
import ReportsPage from "./components/Reports/ReportsPage";
import SettingsPage from "./components/Settings/SettingsPage";
import ProfileSettings from "./components/Settings/ProfileSettings";
import SystemPreferences from "./components/Settings/SystemPreferences";
import SecuritySettings from "./components/Settings/SecuritySettings";

// Context Providers
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import "./App.css";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* 🔐 Public Login */}
      <Route path="/login" element={<AuthPage />} />

      {/* 🧭 Protected Dashboard Area */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard Routes (inside DashboardLayout Outlet) */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Leads */}
        <Route path="leads/all" element={<AllLeadsPage />} />
        <Route path="leads/qualified" element={<QualifiedLeadsPage />} />
        <Route path="leads/unqualified" element={<UnqualifiedLeadsPage />} />

        {/* Customers */}
        <Route path="customers/*" element={<CustomersPage />} />

        {/* Agents */}
        <Route path="agents/*" element={<AgentsPage />} />

        {/* Sales & Reports */}
        <Route path="sales" element={<SalesPage />} />
        <Route path="reports" element={<ReportsPage />} />

        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/profile" element={<ProfileSettings />} />
        <Route path="settings/preferences" element={<SystemPreferences />} />
        <Route path="settings/security" element={<SecuritySettings />} />
      </Route>

      {/* Default Redirects */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Toasts */}
          <AppRoutes />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
