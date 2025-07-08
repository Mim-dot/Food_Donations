import React, { useState } from "react";
import RequestDonation from "../From/RequestDonation";
import AddReview from "../From/Addreview";

const DonatDetails = () => {
  const donation = {
    title: "Fresh Bread Donation",
    description: "Freshly baked bread, 20 kg. Pickup from 9 AM to 12 PM.",
    restaurant: "Tasty Treats",
    location: "Dhaka",
    pickupWindow: "9:00 AM - 12:00 PM",
    status: "Available",
  };

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewerName, setReviewerName] = useState("");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#F5EFE6] rounded-xl shadow-lg mt-24">
      <h1 className="text-3xl font-extrabold text-[#7B4F28] mb-4">
        {donation.title}
      </h1>
      <p className="text-[#5C3B1D] mb-2">
        <strong>Description:</strong> {donation.description}
      </p>
      <p className="text-[#5C3B1D] mb-2">
        <strong>Restaurant:</strong> {donation.restaurant}, {donation.location}
      </p>
      <p className="text-[#5C3B1D] mb-4">
        <strong>Pickup Window:</strong> {donation.pickupWindow}
      </p>
      <p className="inline-block bg-[#7B4F28] text-white px-3 py-1 rounded-full font-semibold mb-6">
        Status: {donation.status}
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => alert("Saved to Favorites (mock)")}
          className="bg-[#D4A373] hover:bg-[#b97b42] text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Save to Favorites
        </button>

        <button
          onClick={() => setShowRequestModal(true)}
          className="bg-[#7B4F28] hover:bg-[#5c3b1d] text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Request Donation
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-[#7B4F28] mb-4">Reviews</h2>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-[#E0D6CC]">
            <p className="font-semibold text-[#7B4F28]">John Doe</p>
            <p className="text-[#5C3B1D]">Great donation! Timely pickup.</p>
            <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="bg-[#7B4F28] hover:bg-[#5c3b1d] text-white px-4 py-2 rounded-md font-semibold transition"
        >
          Add Review
        </button>
      </section>

      {/* ✅ Passing props to modal */}
      <RequestDonation
        show={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        donation={donation}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
      />
      <AddReview
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        reviewerName={reviewerName}
        setReviewerName={setReviewerName}
      />
    </div>
  );
};

export default DonatDetails;
