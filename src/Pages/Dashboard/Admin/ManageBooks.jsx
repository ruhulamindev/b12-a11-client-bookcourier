import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Loading";

const ManageBooks = () => {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch all books (Admin)
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get("http://localhost:3000/books_all");
      return res.data;
    },
  });

  // Update book
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: selectedBook.name,
        category: selectedBook.category,
        price: selectedBook.price,
        status: selectedBook.status,
      };

      await axios.patch(
        `http://localhost:3000/books_all/${selectedBook._id}`,
        updatedData
      );
      alert("Book updated successfully!");
      setSelectedBook(null);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update book!");
    }
  };

  // delete book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/books_all/${bookId}`);
      alert("Book deleted successfully!");
      refetch(); // page refresh
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete book!");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{book.name}</td>
                <td className="py-3 px-4">{book.category}</td>
                <td className="py-3 px-4">{book.price}</td>
                <td className="py-3 px-4">{book.status}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Update */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Book</h2>

            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={selectedBook.name}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, name: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              value={selectedBook.category}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, category: e.target.value })
              }
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              min={0}
              value={selectedBook.price}
              onChange={(e) => {
                let value = e.target.value;

                if (value === "") {
                  setSelectedBook({ ...selectedBook, price: "" });
                  return;
                }

                value = Number(value);

                if (value < 0) return;

                setSelectedBook({ ...selectedBook, price: value });
              }}
              className="w-full border p-2 mb-3 rounded"
            />

            <label className="block font-medium mb-1">Status</label>
            <select
              value={selectedBook.status}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, status: e.target.value })
              }
              className="w-full border p-2 mb-4 rounded"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSelectedBook(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
