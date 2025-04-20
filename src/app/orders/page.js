"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import {
  useGetOrderByEmailMutation,
  useUpdateOrderStatusMutation,
} from "@/features/orders/ordersApi";

export default function OrdersPage() {
  const { user } = useContext(AuthContext);
  const [getOrderByEmail] = useGetOrderByEmailMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders by user email
  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const res = await getOrderByEmail(user?.email).unwrap();
          setOrders(res);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user, getOrderByEmail]);

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    try {
      const res = await updateOrderStatus({ id: orderId, status: "cancelled" }).unwrap();
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };
  
console.log(orders)
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#6F4F37]">
        My Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-red-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#6F4F37]">
                    {order.name}
                  </h3>
                  <p className="text-gray-600">Price: ${order.price}</p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        order.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="relative group">
  <button
    onClick={() => handleCancelOrder(order?._id)}
    disabled={order.status === "approved"}
    className={`px-5 py-2 font-medium rounded-md transition
      ${order.status === "approved" ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600 text-white"}
    `}
  >
    Cancel Order
  </button>

  {order.status === "approved" && (
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
      You can't cancel an approved order
    </span>
  )}
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
