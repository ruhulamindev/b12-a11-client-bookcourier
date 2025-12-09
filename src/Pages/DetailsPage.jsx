import React from "react";

const DetailsPage = () => {

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Book Details UI */}
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow">
        <img
          src="/books-1.jpg"
          alt="Book"
          className="w-full h-96 object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">The Lost Kingdom</h1>
          <p className="text-gray-700 text-lg mb-4">
            An epic fantasy adventure that explores ancient secrets, forgotten
            legends, and a hero’s journey to restore peace.
          </p>

          <h2 className="text-2xl font-bold text-red-600 mb-4">$688</h2>

          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
