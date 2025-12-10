import React, { useState } from "react";

const SellerRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "seller", // default role
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Request Data:", formData);
    alert(`Request submitted for ${formData.role.toUpperCase()} successfully!`);
    // API call করতে চাইলে এখানে call দিতে পারো
    setFormData({ name: "", email: "", role: "seller", message: "" });
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Request to Become Admin / Seller
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Request Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Reason / Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Why do you want this role?"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SellerRequest;
