import React from "react";

const MyBooks = () => {
  // Static books data (placeholder)
  const books = [
    {
      id: 1,
      name: "JavaScript Basics",
      category: "Programming",
      price: "$25",
      status: "Published",
      image:
        "https://st.depositphotos.com/1643295/3583/i/450/depositphotos_35837089-stock-photo-photo-of-you.jpg",
    },
    {
      id: 2,
      name: "React for Beginners",
      category: "Web Development",
      price: "$30",
      status: "Unpublished",
      image:
        "https://st.depositphotos.com/1643295/3583/i/450/depositphotos_35837089-stock-photo-photo-of-you.jpg",
    },
    {
      id: 3,
      name: "CSS Mastery",
      category: "Design",
      price: "$20",
      status: "Published",
      image:
        "https://st.depositphotos.com/1643295/3583/i/450/depositphotos_35837089-stock-photo-photo-of-you.jpg",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Books</h1>

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
                key={book.id}
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
                      book.status === "Published"
                        ? "bg-green-500"
                        : "bg-[#ff006e]"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-500 text-white px-3 py-1 rounded">
                    Update
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

export default MyBooks;
