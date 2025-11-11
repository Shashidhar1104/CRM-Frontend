import React, { useEffect, useState } from "react";
import agentsData from "../../json/agents.json";
import customersData from "../../json/customers.json";
import Breadcrumb from "../common/Breadcrumb";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Sales Executive",
    region: "",
    status: "Active",
    dateJoined: new Date().toISOString().split("T")[0],
    leads: 0,
    conversionRate: "0%",
    performanceRating: 0,
    targetRevenue: 0,
    notes: "",
  });

  useEffect(() => {
    setAgents(agentsData);
    setFilteredAgents(agentsData);
  }, []);

  useEffect(() => {
    const filtered = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.phone.includes(searchTerm)
    );
    setFilteredAgents(filtered);
  }, [searchTerm, agents]);

  const totalAgents = agents.length;
  const activeAgents = agents.filter((a) => a.status === "Active").length;
  const avgConversion = agents.length
    ? (
        agents.reduce((sum, a) => {
          const v = parseFloat(String(a.conversionRate || "0").replace("%", ""));
          return sum + (isNaN(v) ? 0 : v);
        }, 0) / agents.length
      ).toFixed(1)
    : 0;

  const handleAddAgent = (e) => {
    e.preventDefault();
    const id = agents.length ? Math.max(...agents.map((a) => a.id)) + 1 : 1;
    setAgents((prev) => [...prev, { ...newAgent, id }]);
    setShowAddModal(false);
  };

  const handleEditAgent = (e) => {
    e.preventDefault();
    if (!selectedAgent) return;
    setAgents((prev) =>
      prev.map((a) => (a.id === selectedAgent.id ? selectedAgent : a))
    );
    setShowEditModal(false);
    setSelectedAgent(null);
  };

  const handleDelete = (id) => setConfirmDelete(id);
  const confirmDeleteAgent = () => {
    setAgents((prev) => prev.filter((a) => a.id !== confirmDelete));
    setConfirmDelete(null);
  };

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setShowEditModal(true);
  };

  const openInfoModal = (agent) => {
    setShowInfoModal(agent);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Agents" }]} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            👨‍💼 Agents
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage sales agents and performance.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          + Add Agent
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Total Agents</h4>
          <p className="text-2xl font-semibold">{totalAgents}</p>
        </div>
        <div className="bg-green-600 dark:bg-green-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Active Agents</h4>
          <p className="text-2xl font-semibold">{activeAgents}</p>
        </div>
        <div className="bg-purple-600 dark:bg-purple-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Avg Conversion Rate</h4>
          <p className="text-2xl font-semibold">{avgConversion}%</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Region</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Leads</th>
              <th className="px-4 py-2 text-left">Conversion</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {filteredAgents.map((a) => (
              <tr
                key={a.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.email}</td>
                <td className="px-4 py-2">{a.phone}</td>
                <td className="px-4 py-2">{a.region || "—"}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    a.status === "Active" ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {a.status}
                </td>
                <td className="px-4 py-2">{a.leads ?? 0}</td>
                <td className="px-4 py-2">{a.conversionRate ?? "0%"}</td>
                <td className="px-4 py-2 space-x-3">
                  <button
                    onClick={() => openInfoModal(a)}
                    className="text-indigo-500 hover:text-indigo-400"
                  >
                    ℹ️
                  </button>
                  <button
                    onClick={() => openEditModal(a)}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AgentModal
          title="Add Agent"
          agent={newAgent}
          setAgent={setNewAgent}
          onSubmit={handleAddAgent}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {showEditModal && selectedAgent && (
        <AgentModal
          title="Edit Agent"
          agent={selectedAgent}
          setAgent={setSelectedAgent}
          onSubmit={handleEditAgent}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showInfoModal && (
        <AgentInfoModal
          agent={showInfoModal}
          onClose={() => setShowInfoModal(null)}
        />
      )}
      {confirmDelete && (
        <ConfirmDeleteModal
          onConfirm={confirmDeleteAgent}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

/* ------------------- Agent Modal ------------------- */
const AgentModal = ({ title, agent, setAgent, onSubmit, onClose }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 p-4">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-red-500"
      >
        ✖
      </button>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
        {title}
      </h3>

      <form onSubmit={onSubmit} className="space-y-3">
        {["name", "email", "phone", "region"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={agent[field]}
            onChange={(e) => setAgent({ ...agent, [field]: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
            bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
            required={field !== "region"}
          />
        ))}

        <select
          value={agent.role}
          onChange={(e) => setAgent({ ...agent, role: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option>Sales Executive</option>
          <option>Senior Sales Executive</option>
          <option>Sales Manager</option>
          <option>Team Lead</option>
        </select>

        <select
          value={agent.status}
          onChange={(e) => setAgent({ ...agent, status: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        <input
          type="number"
          placeholder="Leads"
          value={agent.leads}
          onChange={(e) => setAgent({ ...agent, leads: Number(e.target.value) })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />

        <textarea
          placeholder="Notes"
          value={agent.notes}
          onChange={(e) => setAgent({ ...agent, notes: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
          bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow"
        >
          Save
        </button>
      </form>
    </div>
  </div>
);

/* ------------------- Agent Info Modal ------------------- */
const AgentInfoModal = ({ agent, onClose }) => {
  const assignedCustomers = customersData.filter(
    (c) =>
      String(c.assignedAgent || "").toLowerCase() ===
      String(agent.name || "").toLowerCase()
  );

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-20 pb-8 bg-black bg-opacity-40 z-50 overflow-auto">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-red-500"
        >
          ✖
        </button>

        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Agent Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200 mb-4">
          <div>
            <p>
              <strong>Name:</strong> {agent.name}
            </p>
            <p>
              <strong>Email:</strong> {agent.email}
            </p>
            <p>
              <strong>Phone:</strong> {agent.phone}
            </p>
            <p>
              <strong>Region:</strong> {agent.region}
            </p>
          </div>
          <div>
            <p>
              <strong>Status:</strong> {agent.status}
            </p>
            <p>
              <strong>Leads:</strong> {agent.leads}
            </p>
            <p>
              <strong>Conversion:</strong> {agent.conversionRate}
            </p>
          </div>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Customers Managed ({assignedCustomers.length})
        </h4>
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
      </div>
    </div>
  );
};

/* ------------------- Confirm Delete Modal ------------------- */
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-80 text-center">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Confirm Deletion
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-5">
        Are you sure you want to delete this agent?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default AgentsPage;
