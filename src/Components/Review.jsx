import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

const Review = ({ bookId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://b12-a11-server-bookcourier.vercel.app/reviews?bookId=${bookId}`
      );
      setReviews(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  // submit review
  const onSubmit = async (data) => {
    try {
      const token = await user.getIdToken();
      const reviewData = {
        bookId,
        reviewer: {
          name: user.displayName,
          email: user.email,
        },
        rating: Number(data.rating),
        comment: data.comment,
        createdAt: new Date(),
      };

      await axios.post("https://b12-a11-server-bookcourier.vercel.app/reviews", reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review submitted successfully!");
      reset();
      fetchReviews(); // update reviews
    } catch (err) {
      console.log(err);
      alert("Failed to submit review");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Review Form */}
      {user && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 p-4 bg-gray-100 rounded-lg"
        >
          <div className="mb-2">
            <label className="block font-semibold">Rating (1-5)</label>
            <input
              type="number"
              min={1}
              max={5}
              {...register("rating", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.rating && (
              <span className="text-red-500 text-sm">Rating is required</span>
            )}
          </div>

          <div className="mb-2">
            <label className="block font-semibold">Comment</label>
            <textarea
              {...register("comment", { required: true })}
              className="textarea textarea-bordered w-full"
              rows={3}
            ></textarea>
            {errors.comment && (
              <span className="text-red-500 text-sm">Comment is required</span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          reviews
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((rev) => (
              <div
                key={rev._id}
                className="mb-4 p-3 border rounded-lg bg-gray-50"
              >
                <p className="font-semibold">{rev.reviewer.name}</p>
                <p>Rating: {rev.rating} / 5</p>
                <p>{rev.comment}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Review;
