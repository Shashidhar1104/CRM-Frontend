import React, { createContext, useContext, useState, useEffect } from "react";
import customersJSON from "../json/customers.json";
import agentsJSON from "../json/agents.json";

const DataContext = createContext();

/**
 * DataProvider
 * Central data store for customers and agents across the app.
 * Handles sync between them (assigned customers count updates, etc.)
 */
export const DataProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [agents, setAgents] = useState([]);

  // ✅ Load initial data from JSON
  useEffect(() => {
    setCustomers(customersJSON);
    setAgents(agentsJSON);
  }, []);

  // ✅ Keep agents’ “leads” count in sync with assigned customers
  useEffect(() => {
    if (agents.length && customers.length) {
      const updatedAgents = agents.map((agent) => {
        const assigned = customers.filter(
          (c) => String(c.assignedAgent || "").toLowerCase() ===
                 String(agent.name || "").toLowerCase()
        );
        return {
          ...agent,
          leads: assigned.length,
        };
      });
      setAgents(updatedAgents);
    }
  }, [customers]);

  // ✅ Add or update functions
  const addCustomer = (newCustomer) => {
    setCustomers((prev) => [...prev, { ...newCustomer, id: prev.length + 1 }]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const addAgent = (newAgent) => {
    setAgents((prev) => [...prev, { ...newAgent, id: prev.length + 1 }]);
  };

  const updateAgent = (updatedAgent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a))
    );
  };

  const deleteAgent = (id) => {
    setAgents((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        customers,
        setCustomers,
        agents,
        setAgents,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addAgent,
        updateAgent,
        deleteAgent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ✅ Custom hook
export const useData = () => useContext(DataContext);
