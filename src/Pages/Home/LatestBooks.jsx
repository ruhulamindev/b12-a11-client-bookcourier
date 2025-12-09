import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { IoArrowRedoCircleSharp } from "react-icons/io5";
import { Link } from "react-router";

const LatestBooks = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <h1 className="text-center text-2xl font-bold text-gray-900 md:text-4xl">
        Latest Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 gap-8 p-2">
        <div className="card bg-base-100  shadow-lg">
          <figure>
            <img
              src="/books-1.jpg"
              alt="Shoes"
              className="w-full h-60 object-cover"
            />
          </figure>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="card-title">
                The Lost Kingdom
                <div className="badge w-12 h-2 p-2 text-[10px] bg-red-500 border-none badge-secondary">NEW</div>
              </h2>
              <h2 className="text-xl font-bold">$688</h2>
            </div>
            <p>
              An epic fantasy adventure that explores ancient secrets, forgotten
              legends, and a hero’s journey to restore peace.
            </p>
            <div className="card-actions justify-end flex items-center gap-3">
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/" className="font-bold">
                  Wishlist
                </Link>
                <GiSelfLove className="text-xl text-red-500" />
              </div>
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/details" className="font-bold">
                  Details
                </Link>
                <IoArrowRedoCircleSharp className="text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100  shadow-lg">
          <figure>
            <img
              src="/books-2.jpg"
              alt="Shoes"
              className="w-full h-60 object-cover"
            />
          </figure>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="card-title">
                Digital Minds
                <div className="badge w-12 h-2 p-2 text-[10px] bg-red-500 border-none badge-secondary">NEW</div>
              </h2>
              <h2 className="text-xl font-bold">$448</h2>
            </div>
            <p>
              A modern guide to artificial intelligence, covering the
              fundamentals of AI, machine learning, and future technologies.
            </p>
            <div className="card-actions justify-end flex items-center gap-3">
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/" className="font-bold">
                  Wishlist
                </Link>
                <GiSelfLove className="text-xl text-red-500" />
              </div>
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/details" className="font-bold">
                  Details
                </Link>
                <IoArrowRedoCircleSharp className="text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-base-100  shadow-lg">
          <figure>
            <img
              src="/books-3.jpg"
              alt="Shoes"
              className="w-full h-60 object-cover"
            />
          </figure>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="card-title">
                Secrets of Success
                <div className="badge w-12 h-2 p-2 text-[10px] bg-red-500 border-none badge-secondary">NEW</div>
              </h2>
              <h2 className="text-xl font-bold">$358</h2>
            </div>
            <p>
              A motivational book revealing proven strategies for personal
              growth, productivity, and achieving long-term success.
            </p>
            <div className="card-actions justify-end flex items-center gap-3">
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/" className="font-bold">
                  Wishlist
                </Link>
                <GiSelfLove className="text-xl text-red-500" />
              </div>
              <div className="flex items-center gap-1 badge badge-outline">
                <Link to="/details" className="font-bold">
                  Details
                </Link>
                <IoArrowRedoCircleSharp className="text-xl text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBooks;
