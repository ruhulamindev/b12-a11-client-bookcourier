import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("signup location", location);

  // react fromstate and error handeling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, googleSignin, updateUserProfile } = useAuth();

  // email and password signup
  const handleSingup = (data) => {
    console.log(data.photo[0]);

    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        // store the image and get the photo url
        const formData = new FormData();
        formData.append("image", profileImage);

        // send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("affer image upload", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user update profile done");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Google Signup
  const handleGoogleSignin = () => {
    googleSignin()
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-[70vh] mx-auto flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSubmit(handleSingup)}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Name*
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image*
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full border bg-gray-100 border-gray-300 p-2 rounded-lg cursor-pointer"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email*
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password*
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">
                password cannot exceed 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                password must contain at least 1 uppercase letter, 1 lowercase
                letter, and 1 number
              </p>
            )}
          </div>

          {/* Sign-up Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-2">
            Sign Up
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
        >
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
            state={location.state}
            to="/signin"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
