import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { saveOrUpdateUser } from "../../Routes/Utilis";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("in the login",location)
  // console.log("location in social",location)

  // react fromstate and error handeling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser, googleSignin } = useAuth();

  // email and password signin
  const handleSignin = async (data) => {
    try {
      // console.log(data);
      const result = await signInUser(data.email, data.password);
      const user = result.user;

      console.log("Signed in user:", user);

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      });

      console.log("User last login updated in DB");

      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
      alert("এই email দিয়ে কোনো account পাওয়া যায়নি। আগে Signup করুন।");
    } else if (error.code === "auth/wrong-password") {
      alert("Password ভুল হয়েছে। আবার চেষ্টা করুন।");
    } else {
      alert("Login করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
    }
  };

  // google signin
  const handleGoogleSignin = async () => {
    try {
      const result = await googleSignin();
      const user = result.user;

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        provider: "google",
      });

      console.log("Google user saved to DB");
      navigate(location.state || "/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[70vh] mx-auto flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignin)}>
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

          {/* Sign-in Button */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium mt-2">
            Sign In
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
          Don't have an account?
          <Link
            state={location.state}
            to="/signup"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
