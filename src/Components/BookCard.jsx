import React, { useEffect, useState } from "react";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    // fetch reviews count from server
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://b12-a11-server-bookcourier.vercel.app/reviews?bookId=${book._id}`
        );
        const data = await res.json();
        setReviewsCount(data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, [book._id]);

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/details/${book._id}`}>
        <figure>
          <img
            src={book.image}
            alt={book.name}
            className="w-full h-60 object-contain bg-gray-100"
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

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {reviewsCount} Reviews
            </span>
            <Link
              className="text-red-500 flex items-center gap-1"
              to={`/details/${book._id}`}
            >
              Details <IoArrowRedoCircleSharp />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
