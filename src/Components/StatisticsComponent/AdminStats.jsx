import React from "react";
import { FaUsers, FaDollarSign, FaShoppingBag, FaBan } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const usersRes = await axiosSecure.get("/users");
      const ordersRes = await axiosSecure.get("/orders/all");

      const totalUsers = usersRes.data.length;
      const totalOrders = ordersRes.data.length;
      const cancelledOrders = ordersRes.data.filter(
        (o) => o.status === "cancelled"
      ).length;

      const totalRevenue = ordersRes.data
        .filter((o) => o.paymentStatus === "paid")
        .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

      // Monthly orders & revenue for charts
      const monthlyOrders = Array(12).fill(0);
      const monthlyRevenue = Array(12).fill(0);

      ordersRes.data.forEach((o) => {
        const date = new Date(o.orderDate);
        const month = date.getMonth();
        monthlyOrders[month] += 1;
        if (o.paymentStatus === "paid") {
          monthlyRevenue[month] += o.totalPrice || 0;
        }
      });

      return {
        totalUsers,
        totalOrders,
        cancelledOrders,
        totalRevenue,
        monthlyOrders,
        monthlyRevenue,
      };
    },
  });

  if (isLoading) return <Loading />;

  const stats = [
    {
      title: "Total Paid ($)",
      value: `$${data.totalRevenue}`,
      icon: <FaDollarSign className="w-12 h-12 text-white p-2 rounded-full bg-blue-600" />,
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingBag className="w-12 h-12 text-white p-2 rounded-full bg-blue-600" />,
    },
    {
      title: "Cancelled Orders",
      value: data.cancelledOrders,
      icon: <FaBan className="w-12 h-12 text-white p-2 rounded-full bg-blue-600" />,
    },
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers className="w-12 h-12 text-white p-2 rounded-full bg-blue-600" />,
    },
  ];

  // Pie Chart Data (Cancelled vs Completed Orders)
  const pieData = {
    labels: ["Completed Orders", "Cancelled Orders"],
    datasets: [
      {
        label: "# of Orders",
        data: [data.totalOrders - data.cancelledOrders, data.cancelledOrders],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data (Monthly Revenue)
  const barData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Paid ($)",
        data: data.monthlyRevenue,
        backgroundColor: "#3b82f6",
      },
      {
        label: "Monthly Orders",
        data: data.monthlyOrders,
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, i) => (
          <div key={i} className="p-4 bg-white rounded-xl shadow flex gap-4">
            <div className={`p-4 rounded-full ${item.bg}`}>{item.icon}</div>
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Order Status</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Monthly Orders & Revenue</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
