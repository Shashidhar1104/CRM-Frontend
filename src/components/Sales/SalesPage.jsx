import React from "react";

const SalesPage = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
      <p className="text-gray-600 mb-6">
        Monitor your total revenue, transactions, and recent sales activities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <h3 className="text-blue-700 text-lg font-bold">$45,600</h3>
          <p className="text-sm text-blue-600">Total Revenue</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <h3 className="text-blue-700 text-lg font-bold">256</h3>
          <p className="text-sm text-blue-600">Transactions</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <h3 className="text-blue-700 text-lg font-bold">+$3,200</h3>
          <p className="text-sm text-blue-600">This Week</p>
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
