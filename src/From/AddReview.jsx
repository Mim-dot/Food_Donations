import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../Hook/useAxiosSecure";

const AddReview = ({ show, onClose, donationId, user, onReviewAdded }) => {
  const [reviewerName, setReviewerName] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donationId || !user?.email) {
      toast.error("Missing donation or user information.");
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.post("/reviews", {
        donationId,
        reviewerName,
        description: reviewDescription,
        rating: Number(rating),
        userEmail: user.email,
      });

      toast.success("Review added successfully!");
      onReviewAdded && onReviewAdded();

      setReviewerName("");
      setReviewDescription("");
      setRating("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold text-[#7B4F28] text-center mb-4">
          Add Your Review
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
            disabled={loading}
          />

          <textarea
            placeholder="Write your review"
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
            rows={4}
            disabled={loading}
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
            disabled={loading}
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {"⭐".repeat(r)} ({r})
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7B4F28] text-white rounded hover:bg-[#5C3B1D]"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
