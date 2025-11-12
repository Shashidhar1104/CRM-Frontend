import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toast notifications
import Breadcrumb from "../common/Breadcrumb";
import agentsData from "../../json/agents.json";
import customersData from "../../json/customers.json";

const AgentInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Find agent details
  const agent = agentsData.find((a) => String(a.id) === String(id));

  // ✅ Get customers assigned to this agent
  const assignedCustomers = customersData.filter(
    (c) =>
      String(c.assignedAgent || "").toLowerCase() ===
      String(agent?.name || "").toLowerCase()
  );

  if (!agent)
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-300">
        Agent not found.
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Agents", path: "/agents" }, { label: "Agent Info" }]}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          👁 Agent Details
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

      {/* Agent Info Section */}
      <div className="space-y-3 text-gray-800 dark:text-gray-200">
        <p><strong>Name:</strong> {agent.name}</p>
        <p><strong>Email:</strong> {agent.email}</p>
        <p><strong>Phone:</strong> {agent.phone}</p>
        <p><strong>Region:</strong> {agent.region || "—"}</p>
        <p><strong>Status:</strong> {agent.status}</p>
        <p><strong>Leads:</strong> {agent.leads}</p>
        <p><strong>Conversion Rate:</strong> {agent.conversionRate}</p>
        <p><strong>Notes:</strong> {agent.notes || "—"}</p>
      </div>

      <hr className="my-5 border-gray-300 dark:border-gray-700" />

      {/* Assigned Customers Section */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        🧾 Customers Managed ({assignedCustomers.length})
      </h3>

      {assignedCustomers.length > 0 ? (
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {assignedCustomers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">{c.status}</td>
                <td className="px-3 py-2">{c.customerType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No customers assigned yet.
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-6">
        <button
          onClick={() => {
            toast("Redirecting to edit page...");
            navigate(`/agents/${id}/edit`);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white 
            rounded-lg font-medium transition-transform hover:-translate-y-[1px] duration-200"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => navigate("/agents")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
          dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 
          rounded-lg font-medium transition"
        >
          ← Back to Agents
        </button>
      </div>
    </div>
  );
};

export default AgentInfoPage;
