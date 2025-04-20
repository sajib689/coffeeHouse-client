"use client";

import { AuthContext } from "@/context/AuthProvider";
import React, { useContext } from "react";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">


      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Profile Image */}
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#6F4F37]"
        />

        {/* Profile Info */}
        <div className="text-center md:text-left space-y-3">
          <h3 className="text-2xl font-semibold text-[#6F4F37]">
            {user?.displayName || "Anonymous User"}
          </h3>
          <p className="text-gray-600 text-sm">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="text-gray-500">
            Welcome to your profile dashboard. Here you can manage your orders,
            see your info, and stay updated.
          </p>

          {/* Optional Button */}
          <button className="mt-4 px-5 py-2 bg-[#6F4F37] hover:bg-[#543a28] text-white font-medium rounded-lg transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
