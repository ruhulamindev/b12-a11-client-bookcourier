import React from "react";

const ManageBooks = () => {
  // Static books data (placeholder)
  const books = [
    {
      id: 1,
      name: "JavaScript Basics",
      category: "Programming",
      price: "$25",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1581091215363-4b7c7cd0ef6e?auto=format&fit=crop&w=80&h=80",
    },
    {
      id: 2,
      name: "React for Beginners",
      category: "Web Development",
      price: "$30",
      status: "Unpublished",
      image:
        "https://images.unsplash.com/photo-1581093588401-1e4b6e7f24ee?auto=format&fit=crop&w=80&h=80",
    },
    {
      id: 3,
      name: "CSS Mastery",
      category: "Design",
      price: "$20",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1590608897129-79a0d3e0ff86?auto=format&fit=crop&w=80&h=80",
    },
  ];

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
                <td className="py-3 px-4">{book.status}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                    Update
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

export default ManageBooks;
