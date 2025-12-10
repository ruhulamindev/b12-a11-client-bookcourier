import React from "react";

const AllUsers = () => {
  // Static user data (placeholder)
  const users = [
    {
      id: 1,
      name: "Ruhul Amin",
      email: "ruhul@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Sadia Khan",
      email: "sadia@example.com",
      role: "Seller",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">{user.status}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
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

export default AllUsers;
