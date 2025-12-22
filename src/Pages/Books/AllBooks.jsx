import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";
import BookCard from "../../Components/BookCard";

const AllBooks = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axios.get("https://b12-a11-server-bookcourier.vercel.app/books_all");
      return res.data.filter((book) => book.status === "published");
    },
  });

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books.filter((book) =>
      book.name.toLowerCase().includes(searchText.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      else return b.price - a.price;
    });

    return filtered;
  }, [books, searchText, sortOrder]);

  if (isLoading) return <Loading />;
  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div className="min-h-screen mt-12 max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
        All Books
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 px-2">
        <input
          type="text"
          placeholder="Search by book name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full sm:w-1/2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {books.length === 0 ? (
        <div className="flex justify-center mt-24">
          <div className="flex flex-col items-center text-center border border-dashed border-gray-300 rounded-2xl p-10 max-w-md bg-gray-50 shadow-sm">
            <span className="text-5xl mb-4">📚</span>

            <p className="text-2xl font-semibold text-gray-600">
              No books available
            </p>

            <p className="mt-3 text-gray-500 text-sm leading-relaxed">
              No seller has added any book yet.
              <br />
              Please check back later.
            </p>

            <div className="mt-6 w-full border-t border-gray-200"></div>

            <p className="mt-4 text-xs text-gray-400">
              This section will be updated automatically
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-8 p-2">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
