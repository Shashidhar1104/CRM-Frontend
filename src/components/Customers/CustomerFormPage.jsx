import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import customersData from "../../json/customers.json";
import agentsData from "../../json/agents.json";

const CustomerFormPage = () => {
  const { id } = useParams(); // Detect edit mode
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [customer, setCustomer] = useState({
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

  // ✅ Load existing customer if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const found = customersData.find((c) => String(c.id) === String(id));
      if (found) setCustomer(found);
    }
  }, [id, isEditMode]);

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log("✏️ Updated Customer:", customer);
      alert("✅ Customer details updated successfully!");
    } else {
      console.log("🆕 New Customer:", customer);
      alert("✅ Customer added successfully!");
    }

    navigate("/customers");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* ✅ Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Customers", path: "/customers" },
          { label: isEditMode ? "Edit Customer" : "Add Customer" },
        ]}
      />

      {/* ✅ Header with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {isEditMode ? "✏️ Edit Customer" : "➕ Add New Customer"}
        </h2>
        <button
          onClick={() => navigate("/customers")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 
          dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg 
          font-medium transition"
        >
          ← Back to Customers
        </button>
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields */}
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={customer[field]}
            onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
            required
            className="w-full border border-gray-300 dark:border-gray-700 
              rounded-lg px-3 py-2 bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        ))}

        {/* Agent Assignment */}
        <select
          value={customer.assignedAgent}
          onChange={(e) => setCustomer({ ...customer, assignedAgent: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg 
            px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option value="">Assign Agent</option>
          {agentsData.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={customer.status}
          onChange={(e) => setCustomer({ ...customer, status: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg 
            px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>

        {/* Qualification & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={customer.qualificationStatus}
            onChange={(e) =>
              setCustomer({ ...customer, qualificationStatus: e.target.value })
            }
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg 
              px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option>Qualified</option>
            <option>Unqualified</option>
            <option>Prospect</option>
          </select>

          <select
            value={customer.customerType}
            onChange={(e) => setCustomer({ ...customer, customerType: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg 
              px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          >
            <option>Regular</option>
            <option>Premium</option>
            <option>Enterprise</option>
          </select>
        </div>

        {/* Notes */}
        <textarea
          placeholder="Notes"
          value={customer.notes}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg 
            px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        ></textarea>

        {/* ✅ Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 
          rounded-lg font-medium shadow transition"
        >
          {isEditMode ? "Save Changes" : "Save Customer"}
        </button>
      </form>
    </div>
  );
};

export default CustomerFormPage;
