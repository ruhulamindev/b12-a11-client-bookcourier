import React from "react";
import useAuth from "../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        {/* PROFILE IMAGE */}
        <div className="relative">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow object-cover"
          />
        </div>

        {/* NAME */}
        <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || "User Name"}</h2>

        {/* EMAIL */}
        <p className="text-gray-500">{user?.email || "user@example.com"}</p>

        {/* PROFILE STATS (Optional) */}
        <div className="flex gap-6 mt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">12</span>
            <span className="text-gray-400 text-sm">Orders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">5</span>
            <span className="text-gray-400 text-sm">Wishlist</span>
          </div>
        </div>

        {/* UPDATE PROFILE BUTTON */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition shadow-md hover:shadow-lg mt-4 w-full">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
