import React, { useState } from "react";
import useAuth from "../Hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = user?.photoURL;

      // new image update
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_image_host_key
          }`,
          formData
        );

        photoURL = res.data.data.url;
      }

      // firebase profile update
      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      alert("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 w-full max-w-sm">
        {/* PROFILE IMAGE */}
        <img
          src={user?.photoURL || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow object-cover"
        />

        {/* NAME */}
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.displayName || "User Name"}
        </h2>

        {/* EMAIL */}
        <p className="text-gray-500">{user?.email || "user@example.com"}</p>

        {/* profile update button */}
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg w-full"
        >
          Update Profile
        </button>
      </div>

      {/* update modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold text-center">Update Profile</h2>

            {/* NAME */}
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="font-medium">Profile Image</label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
