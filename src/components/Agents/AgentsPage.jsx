import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import agentsData from "../../json/agents.json";
import Breadcrumb from "../common/Breadcrumb";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Load agents from JSON
  useEffect(() => {
    setAgents(agentsData);
    setFilteredAgents(agentsData);
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const filtered = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.phone.includes(searchTerm)
    );
    setFilteredAgents(filtered);
  }, [searchTerm, agents]);

  // ✅ Delete Agent (temporary local)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // ✅ Summary Stats
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Agents" }]} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            👨‍💼 Agents
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your sales agents and performance.
          </p>
        </div>
        <button
          onClick={() => navigate("/agents/add")}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Agent
        </button>
      </div>

      {/* Summary Cards */}
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
                <td className="px-4 py-2 flex space-x-3">
                  <button
                    onClick={() => navigate(`/agents/${a.id}`)}
                    className="text-indigo-500 hover:text-indigo-400"
                    title="View Info"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/agents/${a.id}/edit`)}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsPage;
