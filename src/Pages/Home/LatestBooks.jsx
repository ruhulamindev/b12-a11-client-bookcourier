import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./../../Components/Loading";

const LatestBooks = () => {
  const {
    data: books = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const result = await axios("http://localhost:3000/books_all");
      return result.data;
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
      {books.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-8 p-2">
          {books.map((book) => (
            <div key={book._id} className="card bg-base-100 shadow-lg">

              <figure>
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-60 object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">
                    {book.name}
                    <div className="badge w-12 h-2 p-2 text-[10px] bg-red-500 border-none badge-secondary">
                      NEW
                    </div>
                  </h2>
                  <h2 className="text-xl font-bold">${book.price}</h2>
                </div>
                <div className="mb-2">
                  <span className="text-blue-500">{book.category}</span>
                </div>
                <p>{book.description}</p>

                <div className="card-actions justify-end mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1 badge badge-outline">
                    <Link to="/" className="font-bold">
                      Wishlist
                    </Link>
                    <GiSelfLove className="text-xl text-red-500" />
                  </div>
                  <div className="flex items-center gap-1 badge badge-outline">
                    <Link to={`/details/${book._id}`} className="font-bold">
                      Details
                    </Link>
                    <IoArrowRedoCircleSharp className="text-xl text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestBooks;
