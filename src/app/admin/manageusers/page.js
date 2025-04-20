"use client";

import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} from "@/features/users/usersApi";
import Loader from "@/util/Loader";

export default function UserManagement() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleChange = async (id, role) => {
    await updateUserRole({ _id: id, role });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f3] min-h-screen">
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
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
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
