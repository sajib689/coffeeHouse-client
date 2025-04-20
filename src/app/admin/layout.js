// app/admin/layout.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Static Sidebar */}
      <aside className="w-full lg:w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-coffee-700">☕ Admin Panel</h2>
        <nav className="flex flex-col space-y-4 text-coffee-700 font-medium">
          <Link href="/admin/manageusers" className="hover:text-coffee-500">
            👤 User Management
          </Link>
          <Link href="/admin/managecoffees" className="hover:text-coffee-500">
            ☕ Coffee Management
          </Link>
          <Link href="/admin/manageorders" className="hover:text-coffee-500">
            🧾 Order Management
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
