// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout & Contexts
import DashboardLayout from "./components/Layout/DashboardLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

// Auth & Core Pages
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/Dashboard/DashboardPage";

// Leads
import AllLeadsPage from "./components/Leads/AllLeadsPage";
import QualifiedLeadsPage from "./components/Leads/QualifiedLeadsPage";
import UnqualifiedLeadsPage from "./components/Leads/UnqualifiedLeadsPage";

// Customers (Unified Add/Edit)
import CustomersPage from "./components/Customers/CustomersPage";
import CustomerFormPage from "./components/Customers/CustomerFormPage";
import CustomerInfoPage from "./components/Customers/CustomerInfoPage";

// Agents (Unified Add/Edit)
import AgentsPage from "./components/Agents/AgentsPage";
import AgentFormPage from "./components/Agents/AgentFormPage";
import AgentInfoPage from "./components/Agents/AgentInfoPage";

// Messaging 💬
import MessagingPage from "./components/Messaging/MessagingPage";
import SendSMSPage from "./components/Messaging/SendSMSPage";
import SMSTemplatesPage from "./components/Messaging/SMSTemplatesPage";
import WhatsAppPage from "./components/Messaging/WhatsAppPage";

// Sales, Reports, Settings
import SalesPage from "./components/Sales/SalesPage";
import ReportsPage from "./components/Reports/ReportsPage";
import SettingsPage from "./components/Settings/SettingsPage";
import ProfileSettings from "./components/Settings/ProfileSettings";
import SystemPreferences from "./components/Settings/SystemPreferences";
import SecuritySettings from "./components/Settings/SecuritySettings";

import "./App.css";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* 🔐 Public Login */}
      <Route path="/login" element={<AuthPage />} />

      {/* 🧭 Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Leads */}
        <Route path="leads/all" element={<AllLeadsPage />} />
        <Route path="leads/qualified" element={<QualifiedLeadsPage />} />
        <Route path="leads/unqualified" element={<UnqualifiedLeadsPage />} />

        {/* Customers */}
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/form" element={<CustomerFormPage />} /> {/* Add Mode */}
        <Route path="customers/form/:id" element={<CustomerFormPage />} /> {/* Edit Mode */}
        <Route path="customers/:id" element={<CustomerInfoPage />} />

        {/* Agents */}
        <Route path="agents" element={<AgentsPage />} />
        <Route path="agents/form" element={<AgentFormPage />} /> {/* Add Mode */}
        <Route path="agents/form/:id" element={<AgentFormPage />} /> {/* Edit Mode */}
        <Route path="agents/:id" element={<AgentInfoPage />} />

        {/* 💬 Messaging */}
        <Route path="messaging" element={<MessagingPage />} />
        <Route path="messaging/send-sms" element={<SendSMSPage />} />
        <Route path="messaging/templates" element={<SMSTemplatesPage />} />
        <Route path="messaging/whatsapp" element={<WhatsAppPage />} />

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
          <Toaster position="top-center" reverseOrder={false} />
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
