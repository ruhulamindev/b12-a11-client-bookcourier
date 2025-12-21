import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const ManageOrders = () => {
  const { user } = useAuth();
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manage-orders", user?.email],
    queryFn: async () => {
      // fetch all orders (seller)
      const res = await axios.get(
        `http://localhost:3000/orders/librarian?email=${user.email}`
      );
      return res.data;
    },
  });

  // newest orders first
  const sortedOrders = orders.slice().reverse();

  if (isLoading) return <p>Loading...</p>;

  // change order status
  const handleStatusChange = async (orderId, newStatus) => {
    await axios.patch(`http://localhost:3000/orders/status/${orderId}`, {
      status: newStatus,
    });
    refetch(); // auto page update no refash
  };

  // Cancel order
  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Are you sure to cancel this order?");
    if (!confirm) return;

    await axios.patch(`http://localhost:3000/orders/cancel/${orderId}`);
    refetch(); // auto page update no refash
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
        <table className="min-w-full border-collapse whitespace-nowrap">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Book Title</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  {order.customer?.name}
                  <br />
                  <span className="text-sm text-gray-500">
                    {order.customer?.email}
                  </span>
                </td>
                <td className="p-3">
                  <img
                    src={order.bookImage}
                    alt={order.bookName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{order.bookName}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3 font-semibold">
                  ${order.bookPrice} × {order.quantity} = $
                  {order.bookPrice * order.quantity}
                </td>
                <td className="p-3">{order.customer?.phone}</td>
                <td className="p-3">{order.customer?.address}</td>

                <td className="p-3">
                  {order.paymentStatus === "paid" ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                      Unpaid
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {order.status !== "cancelled" ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Cancelled
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {order.status !== "pending" &&
                    order.status !== "cancelled" && (
                      <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
