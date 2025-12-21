import React, { useState } from "react";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";

const LibrarianRequest = () => {
  const [message, setMessage] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return alert("Please write a short message");
    }

    try {
      const response = await axiosSecure.post("/become-librarian", { message });

      if (response?.status === 200 || response?.status === 201) {
        alert("Librarian request sent. Please wait for admin approval!");
        setMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        alert(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Request to Become Librarian
      </h1>

      <p className="text-center text-gray-500 mb-6">
        Send a request to the admin to become a librarian and manage books.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Why do you want to become a librarian?
          </label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your reason here..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-bold"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => setMessage("")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LibrarianRequest;
