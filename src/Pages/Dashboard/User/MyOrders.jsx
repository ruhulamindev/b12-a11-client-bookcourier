import React from "react";

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      image: "https://st.depositphotos.com/1643295/3583/i/450/depositphotos_35837089-stock-photo-photo-of-you.jpg",
      name: "The Great Gatsby",
      category: "Novel",
      price: "$25",
      quantity: 1,
      status: "Pending",
    },
    {
      id: 2,
      image: "https://st.depositphotos.com/1643295/3583/i/450/depositphotos_35837089-stock-photo-photo-of-you.jpg",
      name: "Atomic Habits",
      category: "Self Help",
      price: "$30",
      quantity: 2,
      status: "Completed",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Image</th>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Quantity</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">{item.name}</td>

                <td className="p-3 text-gray-600">{item.category}</td>

                <td className="p-3 font-semibold">{item.price}</td>

                <td className="p-3">{item.quantity}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                    Cancel
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

export default MyOrders;
