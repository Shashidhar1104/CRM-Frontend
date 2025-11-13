import React from "react";
import Breadcrumb from "../common/Breadcrumb";

const SMSTemplatesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 max-w-3xl mx-auto">
      <Breadcrumb items={[{ label: "Messaging", path: "/messaging" }, { label: "SMS Templates" }]} />
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">Manage SMS Templates</h2>

      <ul className="space-y-4">
        <li className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <p className="font-medium text-gray-800 dark:text-gray-100">Welcome Message</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            “Hi [Name], welcome to AmpliNova! We’re excited to have you.”
          </p>
        </li>
        <li className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <p className="font-medium text-gray-800 dark:text-gray-100">Payment Reminder</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            “Dear [Customer], your invoice #1234 is due soon. Kindly make the payment.”
          </p>
        </li>
      </ul>
    </div>
  );
};

export default SMSTemplatesPage;
