import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddBook = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
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
        ...data,
        image: imageUrl,
      };

      console.log("Book Added:", bookData);
    } catch (error) {
      console.log("Error adding book:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Book</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Book Name */}
          <div>
            <label className="font-medium">Book Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter book name"
            />
          </div>

          {/* Book Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full border bg-gray-100 border-gray-300 p-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Author */}
          <div>
            <label className="font-medium">Author</label>
            <input
              type="text"
              {...register("author", { required: true })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter author name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">Status</label>
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
            <label className="font-medium">Price ($)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter price"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">Category</label>
            <input
              type="text"
              {...register("category")}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Example: Novel, Science, Islamic, History..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Write a short description..."
              rows="3"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
