import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import agentsData from "../../json/agents.json";

const AgentFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

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

  // ✅ Load existing agent if editing
  useEffect(() => {
    if (isEditMode) {
      const found = agentsData.find((a) => String(a.id) === String(id));
      if (found) setAgent(found);
    }
  }, [id, isEditMode]);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log("✏️ Updated Agent:", agent);
      alert("✅ Agent details updated successfully!");
    } else {
      console.log("🆕 New Agent:", agent);
      alert("✅ Agent added successfully!");
    }

    navigate("/agents");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Agents", path: "/agents" },
          { label: isEditMode ? "Edit Agent" : "Add Agent" },
        ]}
      />

      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {isEditMode ? "✏️ Edit Agent" : "➕ Add New Agent"}
        </h2>
        <button
          onClick={() => navigate("/agents")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
          dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg 
          font-medium transition"
        >
          ← Back to Agents
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        {["name", "email", "phone", "region"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={agent[field]}
            onChange={(e) => setAgent({ ...agent, [field]: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-700 
              rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        ))}

        {/* Role */}
        <select
          value={agent.role}
          onChange={(e) => setAgent({ ...agent, role: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 
            rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-100"
        >
          <option>Sales Executive</option>
          <option>Team Lead</option>
          <option>Regional Manager</option>
          <option>Account Manager</option>
        </select>

        {/* Status */}
        <select
          value={agent.status}
          onChange={(e) => setAgent({ ...agent, status: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 
            rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-100"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        {/* Leads & Conversion Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Leads"
            value={agent.leads}
            onChange={(e) => setAgent({ ...agent, leads: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-700 
              rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-100"
          />
          <input
            type="text"
            placeholder="Conversion Rate (%)"
            value={agent.conversionRate}
            onChange={(e) =>
              setAgent({
                ...agent,
                conversionRate: e.target.value.endsWith("%")
                  ? e.target.value
                  : `${e.target.value}%`,
              })
            }
            className="w-full border border-gray-300 dark:border-gray-700 
              rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Notes */}
        <textarea
          placeholder="Notes"
          value={agent.notes}
          onChange={(e) => setAgent({ ...agent, notes: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 dark:border-gray-700 
            rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-100"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 
          rounded-lg font-medium shadow transition"
        >
          {isEditMode ? "Save Changes" : "Save Agent"}
        </button>
      </form>
    </div>
  );
};

export default AgentFormPage;
