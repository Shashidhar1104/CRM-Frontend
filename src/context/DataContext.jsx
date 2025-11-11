import React, { createContext, useContext, useState, useEffect } from "react";
import customersData from "../json/customers.json";
import agentsData from "../json/agents.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [agents, setAgents] = useState([]);

  // Load initial data once
  useEffect(() => {
    setCustomers(customersData);
    setAgents(agentsData);
  }, []);

  return (
    <DataContext.Provider value={{ customers, setCustomers, agents, setAgents }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);