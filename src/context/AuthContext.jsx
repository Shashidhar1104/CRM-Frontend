import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ❌ Don't load user from localStorage  
  // ❌ User will reset to null every time website reloads
  const [user, setUser] = useState(null);

  const login = (userData, token) => {
    // ❌ Remove persistence
    // localStorage.setItem("token", token);
    // localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData); // 🔥 Only store in memory
  };

  const logout = () => {
    // ❌ Remove persistence
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
