import React from "react";
import { FaUsers, FaBook, FaDollarSign, FaShoppingBag } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$25,460",
      icon: <FaDollarSign className="text-4xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Orders",
      value: "1,280",
      icon: <FaShoppingBag className="text-4xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Books",
      value: "860",
      icon: <FaBook className="text-4xl text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Total Users",
      value: "5,430",
      icon: <FaUsers className="text-4xl text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="p-1 mb-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-md rounded-xl flex items-center gap-4 hover:shadow-xl transition"
          >
            <div className={`p-4 rounded-full ${item.bg}`}>
              {item.icon}
            </div>

            <div>
              <p className="text-gray-500 font-medium">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
