import React from "react";
import { FaDollarSign, FaShoppingBag } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6"];

const CustomerStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["customer-stats"],
    queryFn: async () => {
      const ordersRes = await axiosSecure.get("/orders");
      const invoicesRes = await axiosSecure.get("/invoices");

      return {
        orders: ordersRes.data.length,
        invoices: invoicesRes.data.length,
      };
    },
  });

  if (isLoading) return <Loading />;

  const stats = [
    {
      title: "My Orders",
      value: data.orders,
      icon: <FaShoppingBag className="text-4xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Invoices",
      value: data.invoices,
      icon: <FaDollarSign className="text-4xl text-blue-600" />,
      bg: "bg-blue-100",
    },
  ];

  // pie chart data
  const pieData = [
    { name: "Orders", value: data.orders },
    { name: "Invoices", value: data.invoices },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>

      {/* stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow flex gap-4"
          >
            <div className={`p-4 rounded-full ${item.bg}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* pie chart section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Orders vs Invoices
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CustomerStats;
