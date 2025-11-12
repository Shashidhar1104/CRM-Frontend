import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import customersData from "../../json/customers.json";
import Breadcrumb from "../common/Breadcrumb";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Load initial data
  useEffect(() => {
    setCustomers(customersData);
    setFilteredCustomers(customersData);
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  // ✅ Delete (temporary local)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  // ✅ Summary Stats
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const avgOrders =
    customers.length > 0
      ? (
          customers.reduce((sum, c) => sum + parseInt(c.orders || 0), 0) /
          customers.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Customers" }]} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            🤝 Customers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your customers here.
          </p>
        </div>
        <button
          onClick={() => navigate("/customers/add")}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Customer
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Total Customers</h4>
          <p className="text-2xl font-semibold">{totalCustomers}</p>
        </div>
        <div className="bg-green-600 dark:bg-green-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Active Customers</h4>
          <p className="text-2xl font-semibold">{activeCustomers}</p>
        </div>
        <div className="bg-purple-600 dark:bg-purple-700 text-white rounded-xl p-4 shadow">
          <h4 className="text-sm opacity-80">Avg Orders</h4>
          <p className="text-2xl font-semibold">{avgOrders}</p>
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
              <th className="px-4 py-2 text-left">Agent</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total Spent</th>
              <th className="px-4 py-2 text-left">Orders</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {filteredCustomers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.phone}</td>
                <td className="px-4 py-2">{c.assignedAgent || "—"}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    c.status === "Active" ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {c.status}
                </td>
                <td className="px-4 py-2">${c.totalSpent}</td>
                <td className="px-4 py-2">{c.orders}</td>
                <td className="px-4 py-2 flex space-x-3">
                  <button
                    onClick={() => navigate(`/customers/${c.id}`)}
                    className="text-indigo-500 hover:text-indigo-400"
                    title="View Info"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/customers/${c.id}/edit`)}
                    className="text-blue-500 hover:text-blue-400"
                    title="Edit"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
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

export default CustomersPage;
