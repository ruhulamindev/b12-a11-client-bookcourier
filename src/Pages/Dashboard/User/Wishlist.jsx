import React from "react";

const Wishlist = () => {
  // Static wishlist data (placeholder)
  const wishlist = [
    {
      id: 1,
      name: "JavaScript Basics",
      category: "Programming",
      price: "$25",
      image:
        "https://images.unsplash.com/photo-1581091215363-4b7c7cd0ef6e?auto=format&fit=crop&w=80&h=80",
    },
    {
      id: 2,
      name: "React for Beginners",
      category: "Web Development",
      price: "$30",
      image:
        "https://images.unsplash.com/photo-1581093588401-1e4b6e7f24ee?auto=format&fit=crop&w=80&h=80",
    },
    {
      id: 3,
      name: "CSS Mastery",
      category: "Design",
      price: "$20",
      image:
        "https://images.unsplash.com/photo-1590608897129-79a0d3e0ff86?auto=format&fit=crop&w=80&h=80",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">{item.price}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    View
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                    Remove
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

export default Wishlist;
