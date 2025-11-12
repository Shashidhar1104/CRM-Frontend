import React, { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import customersData from "../../json/customers.json";
import agentsData from "../../json/agents.json";
import Breadcrumb from "../common/Breadcrumb";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    assignedAgent: "",
    qualificationStatus: "Qualified",
    customerType: "Regular",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
    totalSpent: 0,
    orders: 0,
    notes: "",
  });

  // ✅ Load initial data
  useEffect(() => {
    setCustomers(customersData);
    setFilteredCustomers(customersData);
  }, []);

  // ✅ Search Filter
  useEffect(() => {
    const filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

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

  // ✅ Add Customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    const updated = [...customers, { ...newCustomer, id: customers.length + 1 }];
    setCustomers(updated);
    setShowAddModal(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      assignedAgent: "",
      qualificationStatus: "Qualified",
      customerType: "Regular",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
      totalSpent: 0,
      orders: 0,
      notes: "",
    });
  };

  // ✅ Edit Customer
  const handleEditCustomer = (e) => {
    e.preventDefault();
    const updated = customers.map((c) =>
      c.id === selectedCustomer.id ? selectedCustomer : c
    );
    setCustomers(updated);
    setShowEditModal(false);
  };

  // ✅ Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

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
          onClick={() => setShowAddModal(true)}
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
                    onClick={() => {
                      setSelectedCustomer(c);
                      setShowInfoModal(true);
                    }}
                    className="text-indigo-500 hover:text-indigo-400"
                    title="View Info"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomer(c);
                      setShowEditModal(true);
                    }}
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

      {/* Modals */}
      {showAddModal && (
        <CustomerModal
          title="Add Customer"
          customer={newCustomer}
          setCustomer={setNewCustomer}
          onSubmit={handleAddCustomer}
          onClose={() => setShowAddModal(false)}
          agents={agentsData}
        />
      )}
      {showEditModal && selectedCustomer && (
        <CustomerModal
          title="Edit Customer"
          customer={selectedCustomer}
          setCustomer={setSelectedCustomer}
          onSubmit={handleEditCustomer}
          onClose={() => setShowEditModal(false)}
          agents={agentsData}
        />
      )}
      {showInfoModal && selectedCustomer && (
        <CustomerInfoModal
          customer={selectedCustomer}
          onClose={() => setShowInfoModal(false)}
        />
      )}
    </div>
  );
};

/* ------------------- Customer Modal ------------------- */
const CustomerModal = ({ title, customer, setCustomer, onSubmit, onClose, agents }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-11/12 sm:w-96 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        ✖
      </button>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {title}
      </h3>

      <form onSubmit={onSubmit} className="space-y-3">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={customer[field]}
            onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            required
          />
        ))}

        <select
          value={customer.assignedAgent}
          onChange={(e) => setCustomer({ ...customer, assignedAgent: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100"
        >
          <option value="">Assign Agent</option>
          {agents.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Notes"
          value={customer.notes}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          rows="3"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          Save
        </button>
      </form>
    </div>
  </div>
);

/* ------------------- Customer Info Modal ------------------- */
const CustomerInfoModal = ({ customer, onClose }) => {
  const agent = agentsData.find((a) => a.name === customer.assignedAgent);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-11/12 sm:w-[500px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ✖
        </button>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Customer Details
        </h3>

        <div className="space-y-3 text-gray-800 dark:text-gray-200">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Qualification:</strong> {customer.qualificationStatus}</p>
          <p><strong>Type:</strong> {customer.customerType}</p>
          <p><strong>Total Orders:</strong> {customer.orders}</p>
          <p><strong>Total Spent:</strong> ${customer.totalSpent}</p>
          <p><strong>Notes:</strong> {customer.notes || "—"}</p>

          {agent && (
            <>
              <hr className="my-3 border-gray-300 dark:border-gray-700" />
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Agent Details
              </h4>
              <p><strong>Name:</strong> {agent.name}</p>
              <p><strong>Email:</strong> {agent.email}</p>
              <p><strong>Phone:</strong> {agent.phone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
