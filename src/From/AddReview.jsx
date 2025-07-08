import React from "react";

const AddReview = ({ show, onClose, reviewerName, setReviewerName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold text-[#7B4F28] mb-4">Add Review</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Review by: ${reviewerName}`);
            onClose();
          }}
        >
          <label className="block mb-1 font-semibold text-[#5C3B1D]">Reviewer Name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="w-full mb-4 p-2 border border-[#E0D6CC] rounded"
          />

          <label className="block mb-1 font-semibold text-[#5C3B1D]">Review Description</label>
          <textarea
            required
            placeholder="Write your review here..."
            className="w-full mb-4 p-2 border border-[#E0D6CC] rounded resize-none"
            rows={4}
          />

          <label className="block mb-1 font-semibold text-[#5C3B1D]">Rating</label>
          <select
            required
            className="w-full mb-6 p-2 border border-[#E0D6CC] rounded"
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {"⭐".repeat(star)}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#7B4F28] rounded text-[#7B4F28] font-semibold hover:bg-[#F5EFE6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#7B4F28] text-white px-5 py-2 rounded font-semibold hover:bg-[#5c3b1d] transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
