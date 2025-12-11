import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  return (
    <div className="card bg-base-100 shadow-lg">
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
            <Link to="/" className="font-bold flex items-center gap-1">
              Wishlist
              <GiSelfLove className="text-xl text-red-500" />
            </Link>
          </div>
          <div className="flex items-center gap-1 badge badge-outline">
            <Link
              to={`/details/${book._id}`}
              className="font-bold flex items-center gap-1"
            >
              Details
              <IoArrowRedoCircleSharp className="text-xl text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
