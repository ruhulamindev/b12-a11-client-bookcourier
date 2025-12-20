import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useAuth from "./../../../Hooks/useAuth";
import { useNavigate } from "react-router";

const AddBook = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  const addBookMutation = useMutation({
    mutationFn: async (bookData) => {
      const response = await axios.post(
        "https://b12-a11-client-bookcourier.vercel.app/books_all",
        bookData
      );
      return response.data;
    },

    onSuccess: () => {
      alert("Book added successfully!");
      reset();
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/dashboard/my-books");
    },

    onError: (error) => {
      console.log(
        "Error adding book to server:",
        error.response?.data || error.message
      );
      alert("Failed to add book!");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Image file select
      const profileImage = data.photo[0];
      // FormData for image
      const formData = new FormData();
      formData.append("image", profileImage);

      // Upload to ImageBB
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;
      const res = await axios.post(image_API_URL, formData);
      const imageUrl = res.data.data.url;

      const bookData = {
        name: data.name,
        author: data.author,
        status: data.status,
        price: Number(data.price),
        category: data.category,
        description: data.description,
        image: imageUrl,
        seller: {
          name: user?.displayName || "Unknown Seller",
          email: user?.email || "No Email",
          image: user?.photoURL || "",
        },
      };

      addBookMutation.mutate(bookData);
    } catch (error) {
      console.log("Error uploading image:", error);
      alert("Image upload failed!");
      setIsSubmitting(false);
    }
  };

  const isProcessing = isSubmitting || addBookMutation.isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-100 w-full max-w-2xl shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Book Name */}
          <div>
            <label className="font-medium">Book Name*</label>
            <input
              type="text"
              {...register("name", { required: "Book name is required" })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter book name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Book Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image*
            </label>
            <input
              type="file"
              {...register("photo", { required: "Book image is required" })}
              className="file-input w-full border bg-gray-100 border-gray-300 p-2 rounded-lg cursor-pointer"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="font-medium">Author*</label>
            <input
              type="text"
              {...register("author", { required: "Author name is required" })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">Status*</label>
            <select
              {...register("status", { required: true })}
              className="w-full p-2 border rounded-lg mt-1"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">Price ($)*</label>

            <input
              type="number"
              min={0}
              step="1"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
                validate: (value) => {
                  // leading zero block (except 0)
                  if (/^0\d+/.test(value.toString())) {
                    return "Invalid price format";
                  }
                  return true;
                },
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter price"
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category*</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Example: Novel, Science, Islamic, History..."
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description*</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Write a short description..."
              rows="3"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving Book...
              </span>
            ) : (
              "Add Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
