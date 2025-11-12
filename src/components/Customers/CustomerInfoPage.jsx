import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // ✅ Toast import
import Breadcrumb from "../common/Breadcrumb";
import customersData from "../../json/customers.json";
import agentsData from "../../json/agents.json";

const CustomerInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = customersData.find((c) => String(c.id) === String(id));
  const agent = agentsData.find(
    (a) => a.name === customer?.assignedAgent
  );

  // ✅ Handle Delete with toast
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      toast.success("Customer deleted successfully!");
      console.log(`🗑 Deleted Customer ID: ${id}`);

      // Simulate redirect after toast
      setTimeout(() => navigate("/customers"), 800);
    }
  };

  if (!customer)
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-300">
        Customer not found.
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Customers", path: "/customers" },
          { label: "Customer Info" },
        ]}
      />

      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          👁 Customer Details
        </h2>
        <button
          onClick={() => navigate("/customers")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
          text-gray-800 dark:text-gray-100 rounded-lg font-medium transition"
        >
          ← Back to Customers
        </button>
      </div>

      {/* Customer Details */}
      <div className="space-y-3 text-gray-800 dark:text-gray-200">
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Status:</strong> {customer.status}</p>
        <p><strong>Type:</strong> {customer.customerType}</p>
        <p><strong>Qualification:</strong> {customer.qualificationStatus}</p>
        <p><strong>Total Orders:</strong> {customer.orders}</p>
        <p><strong>Total Spent:</strong> ${customer.totalSpent}</p>
        <p><strong>Notes:</strong> {customer.notes || "—"}</p>
      </div>

      {/* Assigned Agent Section */}
      {agent && (
        <>
          <hr className="my-4 border-gray-300 dark:border-gray-700" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            🧑‍💼 Assigned Agent
          </h3>
          <div className="text-gray-800 dark:text-gray-200 space-y-2">
            <p><strong>Name:</strong> {agent.name}</p>
            <p><strong>Email:</strong> {agent.email}</p>
            <p><strong>Phone:</strong> {agent.phone}</p>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-6">
        <button
          onClick={() => navigate(`/customers/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
        >
          Delete
        </button>

        <button
          onClick={() => navigate("/customers")}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
          text-gray-800 dark:text-gray-100 rounded-lg font-medium transition"
        >
          ← Back to Customers
        </button>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
