import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toast import
import Breadcrumb from "../common/Breadcrumb";

const AddAgentPage = () => {
  const navigate = useNavigate();

  const [agent, setAgent] = useState({
    name: "",
    email: "",
    phone: "",
    region: "",
    role: "Sales Executive",
    status: "Active",
    leads: 0,
    conversionRate: "0%",
    notes: "",
  });

  // ✅ Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🆕 New Agent:", agent);

    toast.success("Agent added successfully!"); // ✅ Toast success

    // Simulate redirect after a short delay
    setTimeout(() => {
      navigate("/agents");
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Agents", path: "/agents" }, { label: "Add Agent" }]}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          ➕ Add New Agent
        </h2>
        <button
          onClick={() => navigate("/agents")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
          dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 
          rounded-lg font-medium transition"
        >
          ← Back to Agents
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone", "region"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={agent[field]}
            onChange={(e) => setAgent({ ...agent, [field]: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}

        {/* Status Dropdown */}
        <select
          value={agent.status}
          onChange={(e) => setAgent({ ...agent, status: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
            rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 
            focus:ring-2 focus:ring-blue-500 transition"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        {/* Notes */}
        <textarea
          placeholder="Notes"
          value={agent.notes}
          onChange={(e) => setAgent({ ...agent, notes: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            focus:ring-2 focus:ring-blue-500 transition"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg 
            font-medium shadow transition-transform hover:-translate-y-[1px] duration-200"
        >
          Save Agent
        </button>
      </form>
    </div>
  );
};

export default AddAgentPage;
