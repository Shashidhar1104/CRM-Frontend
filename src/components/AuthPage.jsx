import React, { useState } from "react";
import "./AuthPage.css";
import ampliNovaLogo from "../Assets/AmpliNova Final Logo.png";

const AuthPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", formData);
    if (onLogin) onLogin();
    alert("Login successful!");
  };

  return (
    <div className="auth-container bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 flex flex-col items-center min-h-screen overflow-hidden">
      {/* Logo Section */}
      <div className="logo-highlight-section relative w-full flex items-center justify-center h-[22vh] bg-gradient-to-b from-blue-700/40 via-blue-800/60 to-blue-900/70 backdrop-blur-md shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)] blur-3xl opacity-70"></div>
        <img
          src={ampliNovaLogo}
          alt="AmpliNova Logo"
          className="company-logo relative z-10 max-h-[140px] sm:max-h-[160px] md:max-h-[180px] transition-transform duration-500 hover:scale-105 drop-shadow-[0_10px_25px_rgba(30,64,175,0.6)]"
        />
      </div>

      {/* Login Box */}
      <div className="flex-1 flex items-center justify-center w-full px-4 py-8">
        <div className="auth-box w-full max-w-[440px] bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 relative z-10 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(30,64,175,0.35)]">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your AmpliNova account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-700 text-gray-800 transition duration-300"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-700 text-gray-800 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold tracking-wide text-white bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-indigo-900 transition duration-300 transform hover:-translate-y-[2px] shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
