import React, { useEffect, useState } from "react";
import allLeadsData from "../../json/allLeads.json";

const AllLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Qualified",
    source: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setLeads(allLeadsData);
    setFilteredLeads(allLeadsData);
  }, []);

  // 🔍 Search + Filter
  useEffect(() => {
    let filtered = leads.filter(
      (lead) =>
        (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.phone.includes(searchTerm)) &&
        (filter === "All" || lead.status === filter)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, filter, leads]);

  // ➕ Add Lead
  const handleAddLead = (e) => {
    e.preventDefault();
    const updatedLeads = [...leads, { ...newLead, id: leads.length + 1 }];
    setLeads(updatedLeads);
    setShowAddModal(false);
    setNewLead({
      name: "",
      email: "",
      phone: "",
      status: "Qualified",
      source: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  // ✏️ Edit Lead
  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleEditLead = (e) => {
    e.preventDefault();
    const updatedLeads = leads.map((lead) =>
      lead.id === selectedLead.id ? selectedLead : lead
    );
    setLeads(updatedLeads);
    setShowEditModal(false);
    setSelectedLead(null);
  };

  // 🗑️ Delete Lead
  const handleDelete = (id) => setConfirmDelete(id);
  const confirmDeleteLead = () => {
    const updatedLeads = leads.filter((lead) => lead.id !== confirmDelete);
    setLeads(updatedLeads);
    setConfirmDelete(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
            🧾 All Leads
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all your leads efficiently.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-3 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          + Add Lead
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-1/4 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Qualified">Qualified</option>
          <option value="Unqualified">Unqualified</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Source</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-200">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-2">{lead.name}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td
                  className={`px-4 py-2 font-medium ${
                    lead.status === "Qualified"
                      ? "text-green-500"
                      : "text-red-400"
                  }`}
                >
                  {lead.status}
                </td>
                <td className="px-4 py-2">{lead.source}</td>
                <td className="px-4 py-2">{lead.date}</td>
                <td className="px-4 py-2 space-x-3">
                  <button
                    onClick={() => openEditModal(lead)}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-500 hover:text-red-400 font-medium"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ➕ Add Lead Modal */}
      {showAddModal && (
        <LeadModal
          title="Add New Lead"
          lead={newLead}
          setLead={setNewLead}
          onSubmit={handleAddLead}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* ✏️ Edit Lead Modal */}
      {showEditModal && selectedLead && (
        <LeadModal
          title="Edit Lead"
          lead={selectedLead}
          setLead={setSelectedLead}
          onSubmit={handleEditLead}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {/* 🗑️ Confirm Delete Modal */}
      {confirmDelete && (
        <ConfirmDeleteModal
          onConfirm={confirmDeleteLead}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

/* ------------------ LeadModal Component ------------------ */
const LeadModal = ({ title, lead, setLead, onSubmit, onClose }) => (
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
        <input
          type="text"
          placeholder="Full Name"
          value={lead.name}
          onChange={(e) => setLead({ ...lead, name: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={lead.email}
          onChange={(e) => setLead({ ...lead, email: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={lead.phone}
          onChange={(e) => setLead({ ...lead, phone: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2"
          required
        />
        <select
          value={lead.status}
          onChange={(e) => setLead({ ...lead, status: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2"
        >
          <option value="Qualified">Qualified</option>
          <option value="Unqualified">Unqualified</option>
        </select>
        <input
          type="text"
          placeholder="Lead Source"
          value={lead.source}
          onChange={(e) => setLead({ ...lead, source: e.target.value })}
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Save
        </button>
      </form>
    </div>
  </div>
);

/* ------------------ Confirm Delete Modal ------------------ */
const ConfirmDeleteModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-80 text-center">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Confirm Deletion
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-5">
        Are you sure you want to delete this lead?
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

export default AllLeadsPage;
