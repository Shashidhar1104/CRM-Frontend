import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toast import
import Breadcrumb from "../common/Breadcrumb";
import agentsData from "../../json/agents.json";

const AddCustomerPage = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🆕 New Customer:", customer);

    // ✅ Simulated save
    toast.success("Customer added successfully!"); // 🔥 Replaces alert()

    // Redirect to customer list
    setTimeout(() => {
      navigate("/customers");
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Customers", path: "/customers" },
          { label: "Add Customer" },
        ]}
      />

      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          ➕ Add New Customer
        </h2>
        <button
          onClick={() => navigate("/customers")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
          text-gray-800 dark:text-gray-100 rounded-lg font-medium transition"
        >
          ← Back to Customers
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={customer[field]}
            onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
              focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        ))}

        {/* Assigned Agent */}
        <select
          value={customer.assignedAgent}
          onChange={(e) =>
            setCustomer({ ...customer, assignedAgent: e.target.value })
          }
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Assign Agent</option>
          {agentsData.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Notes */}
        <textarea
          placeholder="Notes"
          value={customer.notes}
          onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
          rows="3"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
            bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
            focus:ring-2 focus:ring-blue-500 transition"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium 
            shadow transition-transform hover:-translate-y-[1px] duration-200"
        >
          Save Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomerPage;
