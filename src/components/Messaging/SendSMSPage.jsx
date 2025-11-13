import React from "react";
import Breadcrumb from "../common/Breadcrumb";

const SendSMSPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📤 SMS sent successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-2xl mx-auto">
      <Breadcrumb items={[{ label: "Messaging", path: "/messaging" }, { label: "Send SMS" }]} />
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Send SMS Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Phone Number"
          required
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <textarea
          placeholder="Enter your message"
          rows="4"
          required
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium shadow"
        >
          Send SMS
        </button>
      </form>
    </div>
  );
};

export default SendSMSPage;
