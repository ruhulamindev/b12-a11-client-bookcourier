import React from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
    refetchInterval: 2000, // auto page update no refash
  });

  if (isLoading) return <Loading />;

  // newest orders first
  const sortedOrders = orders.slice().reverse();

  // cancel order
  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure want to cancel this order?");
    if (!confirm) return;

    await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
    refetch(); // auto page update no refash
  };

  // pay now data
  const handlePayment = async (item) => {
    const paymentInfo = {
      orderId: item._id,
      bookId: item.bookId,
      bookName: item.bookName,
      imageURL: item.bookImage,
      price: item.bookPrice,
      quantity: item.quantity,
      totalPrice: item.bookPrice * item.quantity,
      seller: item.seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        phone: item.customer?.phone,
        address: item.customer?.address,
      },
    };
    // console.log("PAYMENT INFO (Frontend)", paymentInfo);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        paymentInfo
      );

      // Stripe payment page redirect
      window.location.assign(data.url);
    } catch (error) {
      console.error("Payment error 👉", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 font-semibold">Image</th>
              <th className="p-3 font-semibold">Book Title</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Qty</th>
              <th className="p-3 font-semibold">Price</th>
              <th className="p-3 font-semibold">Order Date</th>
              <th className="p-3 font-semibold">Phone</th>
              <th className="p-3 font-semibold">Address</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedOrders.map((item) => (
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
                <td className="p-3">{item.quantity}</td>
                <td className="p-3 font-semibold">
                  ${item.bookPrice} × {item.quantity} = $
                  {item.bookPrice * item.quantity}
                </td>
                <td className="p-3 text-gray-500">{item.orderDate}</td>
                <td className="p-3">{item.customer?.phone}</td>
                <td className="p-3">{item.customer?.address}</td>

                {/* Status column */}
                <td className="p-3">
                  {item.status === "cancelled" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Cancelled
                    </span>
                  )}
                  {item.status === "pending" &&
                    item.paymentStatus === "unpaid" && (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                        Pending
                      </span>
                    )}
                  {item.status === "pending" &&
                    item.paymentStatus === "paid" && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                        Pending (processing)
                      </span>
                    )}
                  {item.status === "shipped" && (
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      Shipped
                    </span>
                  )}
                  {item.status === "delivered" && (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Delivered
                    </span>
                  )}
                </td>

                {/* Action column */}
                <td className="p-3 align-middle">
                  <div className="flex gap-2 items-center">
                    {/* cancel order */}
                    {item.status === "cancelled" && (
                      <>
                        {item.paymentStatus === "paid" ? (
                          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                            Paid (Return Support)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-red-500 font-semibold">
                            Unpaid
                          </span>
                        )}
                      </>
                    )}
                    {/* User can cancel unpaid orders */}
                    {item.status === "pending" &&
                      item.paymentStatus === "unpaid" && (
                        <>
                          <button
                            onClick={() => handleCancel(item._id)}
                            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handlePayment(item)}
                            className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                          >
                            Pay Now
                          </button>
                        </>
                      )}
                    {/* Paid orders */}
                    {item.paymentStatus === "paid" &&
                      item.status !== "cancelled" && (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          Paid
                        </span>
                      )}

                    {/* Unpaid but status shipped/delivered */}
                    {item.paymentStatus === "unpaid" &&
                      item.status !== "pending" &&
                      item.status !== "cancelled" && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                          Unpaid
                        </span>
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
