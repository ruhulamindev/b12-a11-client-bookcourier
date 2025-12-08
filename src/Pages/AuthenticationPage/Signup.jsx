import React from "react";
import { Link } from "react-router";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 p-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Sign-up Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-2">
          Sign Up
        </button>
        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        {/* Google Login Button */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google logo"
            className="w-6 h-6"
          />
          <span className="font-medium">Continue with Google</span>
        </button>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <Link
            to="/signin"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
