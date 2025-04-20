"use client";

import {
  useGetCoffeesQuery,
  useDeleteCoffeeMutation,
  useCreateCoffeeMutation,
  useUpdateCoffeeMutation,
} from "@/features/coffees/coffeesApi";
import Loader from "@/util/Loader";
import { useState } from "react";

const initialForm = {
  name: "",
  description: "",
  image: "",
  price: "",
  category: "",
};

export default function CoffeeManagement() {
  const { data: coffees, isLoading } = useGetCoffeesQuery();
  const [deleteCoffee] = useDeleteCoffeeMutation();
  const [createCoffee] = useCreateCoffeeMutation();
  const [updateCoffee] = useUpdateCoffeeMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCoffee({ _id: editingId, ...formData });
    } else {
      await createCoffee(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setModalOpen(false);
  };

  const handleEdit = (coffee) => {
    setFormData({
      name: coffee.name,
      description: coffee.description,
      image: coffee.image,
      price: coffee.price,
      category: coffee.category,
    });
    setEditingId(coffee._id); // Use _id here
    setModalOpen(true);
  };

  const handleDelete = async (_id) => {
    if (confirm("Are you sure you want to delete this coffee?")) {
      await deleteCoffee(_id);
    }
  };

  return (
    <div className="p-6 bg-[#fdf8f3] min-h-screen">
      <h1 className="text-4xl font-bold text-[#6f4e37] mb-6">
        ☕ Coffee Management
      </h1>

      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 bg-[#6f4e37] text-white px-6 py-2 rounded hover:bg-[#5a3d2b] transition"
      >
        ➕ Add New Coffee
      </button>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#f3ebe3] text-[#6f4e37] uppercase text-xs">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coffees?.map((coffee) => (
                <tr key={coffee._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium">{coffee.name}</td>
                  <td className="p-4">{coffee.category}</td>
                  <td className="p-4">${coffee.price}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(coffee)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(coffee._id)}
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-[#6f4e37] mb-4">
              {editingId ? "Update Coffee" : "Add New Coffee"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Coffee Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-4 py-2"
                rows={3}
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6f4e37] text-white px-4 py-2 rounded hover:bg-[#5a3d2b]"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
