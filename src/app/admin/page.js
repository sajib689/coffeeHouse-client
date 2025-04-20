import React from "react";

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-coffee-700 mb-4">Welcome, Admin! 👋</h1>
      <p className="text-gray-700 mb-6">Here’s a quick overview of your admin panel.</p>

      {/* Example summary cards (optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-coffee-600">👤 Users</h2>
          <p className="text-gray-600">You have 200 users</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-coffee-600">☕ Coffees</h2>
          <p className="text-gray-600">25 coffees available</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-coffee-600">🧾 Orders</h2>
          <p className="text-gray-600">30 orders this week</p>
        </div>
      </div>
    </div>
  );
}
