import React from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  // const navigate = useNavigate();
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/orders?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  // cancel function
  //  const handleCancel = (id) => {
  //     alert("Cancel API tumi backend e korle ekhane add kore dibo");
  //   };

  const handlePayment = async (item) => {
    console.log("ORDER ITEM 👉", item);
    const paymentInfo = {
      orderId: item._id,
      bookName: item.bookName,
      imageURL: item.bookImage,
      category: item.bookCategory,
      price: item.bookPrice,
      quantity: item.quantity,
      totalPrice: item.bookPrice * item.quantity,
      seller: {
        name: item.seller?.name,
        email: item.seller?.email,
        image: item.seller?.image,
      },
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        paymentInfo
      );

window.location.assign(data.url);

      console.log("Checkout URL 👉", data.url);
    } catch (error) {
      console.error("Payment error 👉", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Image</th>
              <th className="p-3 font-semibold">Book Title</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Qty</th>
              <th className="p-3 font-semibold">Order Date</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={item.bookImage}
                    alt={item.bookName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 font-medium">{item.bookName}</td>

                <td className="p-3 text-gray-600">{item.bookCategory}</td>

                <td className="p-3 font-semibold">
                  ${item.bookPrice} × {item.quantity} = $
                  {item.bookPrice * item.quantity}
                </td>

                <td className="p-3">{item.quantity}</td>

                <td className="p-3 text-gray-500">{item.orderDate}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* action button */}
                <td className="p-3 align-middle">
                  <div className="flex gap-2 items-center">
                    {/* cancel button → only for pending */}
                    {item.status === "pending" && (
                      <button
                        // onClick={() => handleCancel(item.id)}
                        className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    )}

                    {item.status === "pending" &&
                      item.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(item)}
                          className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                        >
                          Pay Now
                        </button>
                      )}
                  </div>
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
