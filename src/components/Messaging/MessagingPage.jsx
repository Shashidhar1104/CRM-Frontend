import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../common/Breadcrumb";
import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleBottomCenterTextIcon,
  DocumentTextIcon, // ✅ use this instead of TemplateIcon
} from "@heroicons/react/24/outline";

const MessagingPage = () => {
  const [activeTab, setActiveTab] = useState("sms");
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
      {/* ✅ Breadcrumb */}
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Messaging" }]} />

      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          💬 Messaging Center
        </h2>
      </div>

      {/* ✅ Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-300 dark:border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab("sms")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === "sms"
              ? "bg-blue-600 text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
          Send SMS
        </button>

        <button
          onClick={() => setActiveTab("whatsapp")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === "whatsapp"
              ? "bg-green-600 text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
          WhatsApp
        </button>

        <button
          onClick={() => setActiveTab("templates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            activeTab === "templates"
              ? "bg-purple-600 text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <DocumentTextIcon className="h-5 w-5" /> {/* ✅ replaced TemplateIcon */}
          SMS Templates
        </button>
      </div>

      {/* ✅ Tab Content */}
      <div className="mt-4">
        {activeTab === "sms" && (
          <div>
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Send SMS Message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("📤 Message sent successfully!");
              }}
              className="space-y-4 max-w-lg"
            >
              <input
                type="text"
                placeholder="Recipient Phone Number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
              <textarea
                placeholder="Type your message here..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow"
              >
                Send SMS
              </button>
            </form>
          </div>
        )}

        {activeTab === "whatsapp" && (
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Send WhatsApp Message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("💬 WhatsApp message sent successfully!");
              }}
              className="space-y-4 max-w-lg"
            >
              <input
                type="text"
                placeholder="WhatsApp Number"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
              <textarea
                placeholder="Type your WhatsApp message..."
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow"
              >
                Send WhatsApp
              </button>
            </form>
          </div>
        )}

        {activeTab === "templates" && (
          <div>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Manage SMS Templates
            </h3>
            <ul className="space-y-3">
              <li className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  Welcome Message
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  “Hi [Name], thank you for joining AmpliNova! We’re happy to have you.”
                </p>
              </li>
              <li className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  Payment Reminder
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  “Dear [Customer], your invoice #1234 is due. Please complete payment soon.”
                </p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;
