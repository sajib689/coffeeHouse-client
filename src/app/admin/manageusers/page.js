"use client";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/features/users/usersApi";
import Loader from "@/util/Loader";
import toast, { Toaster } from "react-hot-toast";

export default function UserManagement() {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole({ _id: id, role }).unwrap();
      toast.success("Role updated successfully");
      refetch(); // Refetch after successful role update
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
        refetch(); // Refetch after deletion
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f3] min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-3xl font-bold mb-6 text-[#6f4e37]">👤 User Management</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f3ebe3] text-[#6f4e37] uppercase text-xs">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4 font-medium">{user.name || "N/A"}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      value={user?.role}
                      onChange={(e) =>
                        handleRoleChange(user?._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
