import React from "react";

const DeliveryCoverage = () => {
  return (
    <div className="mt-12 max-w-7xl mx-auto p-2">
      {/* Section Heading */}
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">
        Delivery Coverage
      </h2>
      <p className="text-center mb-6 text-gray-700">
        We deliver books to the following cities in Bangladesh:
      </p>

      {/* Map Image */}
      <div className="flex justify-center mb-6">
        <img
          src="/maps.avif"
          alt="Delivery Map"
          className="w-full h-[300px] md:h-[500px] rounded-lg shadow-lg cover"
        />
      </div>

      {/* Cities List */}
      <div className="flex flex-wrap justify-center gap-4">
        <span className="badge badge-outline font-bold">Dhaka</span>
        <span className="badge badge-outline font-bold">Rangpur</span>
        <span className="badge badge-outline font-bold">Rajshahi</span>
        <span className="badge badge-outline font-bold">Mymensingh</span>
        <span className="badge badge-outline font-bold">Sylhet</span>
        <span className="badge badge-outline font-bold">Khulna</span>
        <span className="badge badge-outline font-bold">Barishal</span>
        <span className="badge badge-outline font-bold">Chittagong</span>
        <span className="badge badge-outline font-bold">Cox's Bazar</span>
      </div>
    </div>
  );
};

export default DeliveryCoverage;
