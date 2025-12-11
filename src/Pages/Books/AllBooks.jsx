import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading";
import BookCard from "../../Components/BookCard";

const AllBooks = () => {
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const result = await axios("http://localhost:3000/books_all");
      return result.data;
    },
  });
  if (isLoading) return <Loading />;
  if (error) return <p>An error has occurred: {error.message}</p>;

  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
        All Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-8 p-2">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
