import React from "react";

const Invoices = () => {
  // Static invoices data (placeholder)
  const invoices = [
    {
      id: 1,
      orderId: 101,
      date: "2025-12-01",
      amount: "$50",
      status: "Paid",
    },
    {
      id: 2,
      orderId: 102,
      date: "2025-12-03",
      amount: "$30",
      status: "Pending",
    },
    {
      id: 3,
      orderId: 103,
      date: "2025-12-05",
      amount: "$60",
      status: "Paid",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Invoices</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Invoice ID</th>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{invoice.id}</td>
                <td className="py-3 px-4">{invoice.orderId}</td>
                <td className="py-3 px-4">{invoice.date}</td>
                <td className="py-3 px-4">{invoice.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    View
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded">
                    Download
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

export default Invoices;
