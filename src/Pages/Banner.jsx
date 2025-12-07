import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto mt-4 p-2">
      <div className="lg:rounded-lg rounded-none overflow-hidden">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          interval={3000}
        >
          {/* Slide 1 */}
          <div className="relative">
            <img
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
              src="/book-1.avif"
              alt="Book 1"
            />
            <div className="absolute p-6 inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Discover Your Next Favorite Book
              </h2>
              <p className="text-sm md:text-lg max-w-md text-center mb-4">
                Thousands of books from different genres. Find what you love!
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/all-books"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-800 rounded text-sm md:text-base flex items-center gap-2"
                >
                  Explore Books
                  <FaSquareArrowUpRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
              src="/book-2.jpg"
              alt="Book 2"
            />
            <div className="absolute p-6 inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Fast & Reliable Delivery
              </h2>
              <p className="text-sm md:text-lg max-w-md text-center mb-4">
                Get your books delivered to your doorstep anywhere in
                Bangladesh.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/all-books"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-800 rounded text-sm md:text-base flex items-center gap-2"
                >
                  Explore Books
                  <FaSquareArrowUpRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
              src="/book-3.jpg"
              alt="Book 3"
            />
            <div className="absolute p-6 inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">
                Affordable Prices
              </h2>
              <p className="text-sm md:text-lg max-w-md text-center mb-4">
                High-quality books at low prices. Save more every time you buy!
              </p>
              <div className="flex items-center gap-2">
                <Link
                  to="/all-books"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-800 rounded text-sm md:text-base flex items-center gap-2"
                >
                  Explore Books
                  <FaSquareArrowUpRight className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
