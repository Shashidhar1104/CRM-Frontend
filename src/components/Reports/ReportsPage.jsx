import React from "react";

const ReportsPage = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reports</h2>
      <p className="text-gray-600 mb-6">
        Analyze your performance with comprehensive reports and visual insights.
      </p>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <p className="text-yellow-800 text-sm">
          Report generation feature will allow you to export sales, leads, and customer data in the future.
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;
