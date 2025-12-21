import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import Loading from "../Components/Loading";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "./../Hooks/useAuth";

const DetailsPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:3000/books_all/${id}`);
      return result.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading book details</p>;

  const onSubmit = async (data) => {
    const orderData = {
      bookId: book._id,
      bookName: book.name,
      bookImage: book.image,
      bookCategory: book.category,
      bookPrice: book.price,
      quantity: Number(data.quantity),
      seller: {
        name: book.seller?.name,
        email: book.seller?.email,
        image: book.seller?.image,
      },
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      status: "pending",
      paymentStatus: "unpaid",
      orderDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post("http://localhost:3000/orders", orderData);
      alert("Order placed successfully!");
      setOpen(false);
      reset();
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.log(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow">
        <div className="md:col-span-2">
          <button
            onClick={() => navigate("/all-books")}
            className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-semibold"
          >
            ← Back to All Books
          </button>
        </div>
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-1">{book.name}</h1>

          <p className="text-gray-600 mb-4">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="text-gray-700 text-lg mb-4">{book.description}</p>

          <p className="mb-2">
            <strong>Category: </strong>
            <span className="text-blue-600">{book.category}</span>
          </p>

          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ${book.price}
          </h2>

          <h3 className="font-bold mt-4 mb-2">Seller Information:</h3>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={book.seller?.image}
              referrerPolicy="no-referrer"
              alt={book.seller?.name}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-semibold">{book.seller?.name}</p>
              <p className="text-gray-500">{book.seller?.email}</p>
            </div>
          </div>

          {/* Order Button */}
          <button
            onClick={() => setOpen(true)}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-amber-200 bg-opacity-40 flex items-center justify-center z-50 overflow-auto py-10">
          <div className="bg-white w-96 p-6 rounded-xl shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-xl font-bold"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-semibold mb-1">Name*</label>
                <input
                  defaultValue={user?.displayName}
                  readOnly
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-1">Email*</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block font-semibold mb-1">Quantity*</label>
                <input
                  type="number"
                  defaultValue={1}
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Minimum quantity is 1" },
                    validate: (value) =>
                      value > 0 || "Quantity must be a positive number",
                  })}
                  className="input input-bordered w-full"
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value < 0) e.target.value = 0;
                  }}
                  onWheel={(e) => e.target.blur()}
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold mb-1">
                  Phone Number*
                </label>
                <input
                  type="text"
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Enter phone number"
                  className="input input-bordered w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block font-semibold mb-1">Address*</label>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  placeholder="Enter full address"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 mt-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
