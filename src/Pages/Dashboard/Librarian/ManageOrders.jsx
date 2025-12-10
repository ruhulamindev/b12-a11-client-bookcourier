import React from "react";

const ManageOrders = () => {
  // Static orders data (placeholder)
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      book: "JavaScript Basics",
      quantity: 2,
      price: "$50",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Jane Smith",
      book: "React for Beginners",
      quantity: 1,
      price: "$30",
      status: "Completed",
    },
    {
      id: 3,
      customer: "Alice Johnson",
      book: "CSS Mastery",
      quantity: 3,
      price: "$60",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Book Name</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.book}</td>
                <td className="py-3 px-4">{order.quantity}</td>
                <td className="py-3 px-4">{order.price}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
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
};

export default ManageOrders;
