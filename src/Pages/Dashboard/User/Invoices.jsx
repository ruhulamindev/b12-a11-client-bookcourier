import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";

const Invoices = () => {
  // Static invoices data (placeholder)
  const axiosSecure = useAxiosSecure();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/invoices");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Invoices</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Payment ID</th>
              <th className="py-3 px-4 text-left">Book Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">{invoice.transactionId}</td>
                  <td className="py-3 px-4">{invoice.bookName}</td>
                  <td className="p-3 font-semibold">
                    ${invoice.bookPrice} × {invoice.quantity} = $
                    {invoice.bookPrice * invoice.quantity}
                  </td>
                  <td className="py-3 px-4">{invoice.orderDate}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                      Paid
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
