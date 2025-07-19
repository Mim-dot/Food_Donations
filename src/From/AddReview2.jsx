import React, { useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";

const AddReview2 = ({ visible, onClose, donationId, user, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    review: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donationId || !user?.email) {
      alert("Missing donation or user information.");
      return;
    }

    setLoading(true);
    try {
      await axiosSecure.post("/reviews", {
        donationId,
        reviewerName: formData.name,
        description: formData.review,
        rating: Number(formData.rating),
        userEmail: user.email,
      });

      onReviewAdded && onReviewAdded();

      setFormData({ name: user?.displayName || "", review: "", rating: 5 });
      onClose();
    } catch (error) {
      alert("Failed to submit review");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-md shadow-lg max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#7B4F28]">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1" htmlFor="review">
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="rating">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              disabled={loading}
              className="w-full border rounded px-3 py-2"
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>
                  {"⭐".repeat(val)} ({val})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7B4F28] text-white py-2 rounded hover:bg-[#5C3B1D] transition"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview2;
