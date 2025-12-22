import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const MyBooks = () => {
  const { user } = useAuth();
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch seller books
  const { data: books = [], refetch } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/books/seller?email=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );
      return res.data;
    },
  });

  // update data
  const handleUpdate = async () => {
    try {
      let updatedImage = selectedBook.image;

      // check if user selected a new image
      if (selectedBook.newImage instanceof File) {
        const formData = new FormData();
        formData.append("image", selectedBook.newImage);

        const imageRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );

        // ✅ safety check
        if (!imageRes.data?.data?.url) {
          alert("Image upload failed!");
          return;
        }
        updatedImage = imageRes.data.data.url;
      }

      const updatedData = {
        name: selectedBook.name,
        category: selectedBook.category,
        price: selectedBook.price,
        status: selectedBook.status,
        description: selectedBook.description,
        image: updatedImage,
      };

      await axios.patch(
        `http://localhost:3000/books_all/${selectedBook._id}`,
        updatedData
      );
      refetch();
      setSelectedBook(null);
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update book!");
    }
  };

  // // delete book (seller)
  // const handleDelete = async (bookId) => {
  //   const confirmDelete = window.confirm(
  //     "Are you sure you want to delete this book? This will also delete all related orders."
  //   );
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`http://localhost:3000/orders/book/${bookId}`, {
  //       headers: {
  //         authorization: `Bearer ${await user.getIdToken()}`,
  //       },
  //     });

  //     await axios.delete(`http://localhost:3000/books_all/${bookId}`, {
  //       headers: {
  //         authorization: `Bearer ${await user.getIdToken()}`,
  //       },
  //     });

  //     alert("Book and related orders deleted successfully!");
  //     refetch(); // page refresh
  //   } catch (error) {
  //     console.error("Delete error:", error);
  //     alert("Failed to delete book!");
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Books</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4">
        <table className="min-w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-100 text-left">
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
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white font-medium ${
                      book.status.toLowerCase() === "published"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {/* <div className="flex items-center gap-2"> */}
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    {/* <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal open*/}
        {selectedBook && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg overflow-y-auto max-h-[80vh]">
              <h2 className="text-xl font-bold mb-4">Update Book</h2>

              {/* Image */}
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    newImage: e.target.files[0],
                  })
                }
                className="w-full border p-2 mb-3 rounded"
              />
              <img
                src={selectedBook.image}
                alt={selectedBook.name}
                className="w-32 h-32 object-cover rounded mb-3"
              />

              {/* Name */}
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                value={selectedBook.name}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, name: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              {/* Category */}
              <label className="block font-medium mb-1">Category</label>
              <input
                type="text"
                value={selectedBook.category}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, category: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              />

              {/* Price */}
              <label className="block font-medium mb-1">Price</label>
              <input
                type="number"
                min={0}
                step="1"
                value={selectedBook.price}
                onChange={(e) => {
                  const value = e.target.value;

                  // negative block
                  if (value === "") {
                    setSelectedBook({ ...selectedBook, price: "" });
                    return;
                  }

                  if (Number(value) < 0) return;

                  setSelectedBook({
                    ...selectedBook,
                    price: Number(value),
                  });
                }}
                onBlur={() => {
                  if (selectedBook.price === "") {
                    setSelectedBook({ ...selectedBook, price: 0 });
                  }
                }}
                className="w-full border p-2 mb-3 rounded"
              />

              {/* Status */}
              <label className="block font-medium mb-1">Status</label>
              <select
                value={selectedBook.status}
                onChange={(e) =>
                  setSelectedBook({ ...selectedBook, status: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
              >
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>

              {/* Description */}
              <label className="block font-medium mb-1">Description</label>
              <textarea
                value={selectedBook.description}
                onChange={(e) =>
                  setSelectedBook({
                    ...selectedBook,
                    description: e.target.value,
                  })
                }
                className="w-full border p-2 mb-4 rounded"
                rows="4"
              />

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
    </div>
  );
};

export default MyBooks;
