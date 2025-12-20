import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./../../Components/Loading";
import BookCard from "../../Components/BookCard";

const LatestBooks = () => {
  const {
    data: books = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axios.get("https://b12-a11-server-bookcourier.vercel.app/books_all");
      return res.data.filter((book) => book.status === "published");
    },
  });

  // console.log(data)
  if (isPending) return <Loading />;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
        Latest Books
      </h1>
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
          {books
            .slice(-6)
            .reverse()
            .map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
        </div>
      )}
    </div>
  );
};

export default LatestBooks;
