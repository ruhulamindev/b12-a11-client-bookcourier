import React from "react";
import useAuth from "../Hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 p-4">

      {/* PROFILE IMAGE */}
      <img
        src={user?.photoURL}
        alt="profile"
        className="w-32 h-32 rounded-full border shadow object-cover"
      />

      {/* NAME */}
      <h2 className="text-2xl font-bold">{user?.displayName}</h2>

      {/* EMAIL */}
      <p className="text-gray-600">{user?.email}</p>

      {/* UPDATE PROFILE BUTTON */}
      <button
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition"
      >
        Update Profile
      </button>

    </div>
  );
};

export default Profile;
