import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get(`/users`);
        console.log("Fetched users:", res.data);
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // fetch librarian requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/admin/librarian-requests");
        setRequests(res.data || []);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 3000);
    return () => clearInterval(interval);
  }, [axiosSecure]);

  // handle role update
  const handleRoleUpdate = async (userId, newRole) => {
    setLoading(true);
    try {
      // librarian hole backend a seller hobe
      const backendRole = newRole === "librarian" ? "seller" : newRole;
      const res = await axiosSecure.patch(`/user/role/${userId}`, {
        newRole: backendRole,
      });

      if (res.data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: backendRole } : u))
        );

        // remove request if exists
        setRequests((prev) =>
          prev.filter(
            (r) => r.email !== users.find((u) => u._id === userId)?.email
          )
        );

        alert("Role updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  // check if user has pending request
  const hasRequest = (email) => requests.some((r) => r.email === email);

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
              <th className="py-3 px-4 text-left">Actions</th>
              <th className="py-3 px-4 text-left">Request</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users
                .filter((u) => u.role !== "admin")
                .map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded font-semibold ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-800"
                            : user.role === "seller"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role === "seller" ? "Librarian" : user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        disabled={loading}
                        className="border rounded px-2 py-1"
                        onChange={(e) =>
                          handleRoleUpdate(user._id, e.target.value)
                        }
                        value={user.role === "seller" ? "librarian" : user.role}
                      >
                        <option value="customer">Customer</option>
                        <option value="librarian">Librarian</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      {hasRequest(user.email) ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">
                            Librarian request pending
                          </p>

                          <button
                            onClick={() =>
                              handleRoleUpdate(user._id, "librarian")
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                          >
                            Approve
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Request
                        </span>
                      )}
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
