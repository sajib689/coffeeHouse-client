'use client';

import {
  useUpdateOrderStatusMutation,
  useGetOrderQuery,
  useCreateOrderMutation,
  useDeleteOrderMutation
} from '@/features/orders/ordersApi';
import toast,{ Toaster } from 'react-hot-toast';

export default function OrderManagement() {
  const { data: orders, isLoading, isError, refetch } = useGetOrderQuery();
  const [createOrder] = useCreateOrderMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success(`Order Status Changed ${newStatus}`);
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success('Order deleted successfully');
      refetch();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete order');
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Error loading orders.</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-coffee-600">🧾 Order Management</h1>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-coffee-100">
            <tr>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="py-2 px-4">
                  <img src={order.image} alt="product" className="w-12 h-12 object-cover rounded" />
                </td>
                <td className="py-2 px-4">{order.productName}</td>
                <td className="py-2 px-4">${order.price}</td>
                <td className="py-2 px-4">{order.email}</td>
                <td className="py-2 px-4">
                  {order.street}, {order.city}, {order.postalCode}
                </td>
                <td className="py-2 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
