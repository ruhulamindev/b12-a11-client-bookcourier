import React from "react";

const WhyChoose = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto p-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
        Why Choose BookCourier
      </h2>
      <p className="text-center mb-8 text-gray-700">
        Discover why buying books from BookCourier is the best choice for you.
      </p>

      {/* Collapse Items */}
      <div className="space-y-4">
        <div tabIndex={0} className="collapse collapse-plus bg-base-100 border border-base-300">
          <div className="collapse-title font-semibold text-lg">Fast Delivery</div>
          <div className="collapse-content text-sm">
            Get your books delivered to your doorstep quickly and reliably across Bangladesh.
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-plus bg-base-100 border border-base-300">
          <div className="collapse-title font-semibold text-lg">Affordable Prices</div>
          <div className="collapse-content text-sm">
            Enjoy high-quality books at prices that fit your budget. Save more with every purchase.
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-plus bg-base-100 border border-base-300">
          <div className="collapse-title font-semibold text-lg">Large Collection</div>
          <div className="collapse-content text-sm">
            Choose from thousands of books across genres, from fiction to academic resources.
          </div>
        </div>

        <div tabIndex={0} className="collapse collapse-plus bg-base-100 border border-base-300">
          <div className="collapse-title font-semibold text-lg">Easy Returns</div>
          <div className="collapse-content text-sm">
            Hassle-free return policy in case of damaged or incorrect books, making shopping worry-free.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
