import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../LayOut/AuthContext";
import RequestDonation from "../From/RequestDonation";
import AddReview from "../From/AddReview";
import useAxiosSecure from "../Hook/useAxiosSecure";
import loadingAnimation from '../assets/loadingAnimation.json'

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCheckRole from "../Hook/useCheckRole";
import Lottie from "lottie-react";

const DonatDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { role, loading: roleLoading } = useCheckRole();
  const [donation, setDonation] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Fetch donation data
  useEffect(() => {
    axiosSecure
      .get(`/donations/${id}`)
      .then((res) => setDonation(res.data))
      .catch((err) => console.error("Donation fetch failed", err));
  }, [id, axiosSecure]);

  // Fetch reviews
  useEffect(() => {
    axiosSecure
      .get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Review fetch failed", err));
  }, [id, axiosSecure]);

  // Save to favorites
  const handleSaveToFavorites = async () => {
    try {
      await axiosSecure.post("/favorites", {
        donationId: id,
        userEmail: user.email,
      });
      toast.success("Added to Favorites!");
    } catch (error) {
      toast.error("Already in favorites or error occurred.");
    }
  };

  if (!donation || roleLoading)
    return (
     <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-8 bg-[#F9F7F2] rounded-2xl shadow-xl mt-24 border border-[#EDE9E5]">
      <h1 className="text-4xl font-extrabold text-[#7B4F28] mb-6 tracking-wide drop-shadow-sm">
        {donation.donationTitle}
      </h1>
      <p className="text-[#5C3B1D] mb-3 text-lg leading-relaxed">
        <strong>Description:</strong> {donation.foodType} ,{donation.quantity}
      </p>
      <p className="text-[#5C3B1D] mb-3 text-lg">
        <strong>Restaurant:</strong> {donation.restaurantName},{" "}
        {donation.location}
      </p>
      <p className="text-[#5C3B1D] mb-3 text-lg">
        <strong>Pickup Time:</strong> {donation.pickupWindow}
      </p>
      <p className="inline-block bg-[#7B4F28] text-white px-4 py-1 rounded-full font-semibold mb-8 shadow-md">
        Status: {donation.status}
      </p>

      <div className="flex flex-wrap gap-5 mb-10">
        <button
          onClick={handleSaveToFavorites}
          className="bg-[#D4A373] hover:bg-[#b97b42] text-white px-6 py-3 rounded-lg font-semibold transition ease-in-out duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#b97b42]"
        >
          Save to Favorites
        </button>

        {/* Only for charity role */}
        {role === "charity" && (
          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-[#7B4F28] hover:bg-[#5c3b1d] text-white px-6 py-3 rounded-lg font-semibold transition ease-in-out duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5c3b1d]"
          >
            Request Donation
          </button>
        )}

        {donation.status === "Accepted" && role === "charity" && (
          <button
            onClick={async () => {
              await axiosSecure.patch(`/donations/confirm-pickup/${id}`);
              toast.success("Marked as Picked Up!");
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition ease-in-out duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            Confirm Pickup
          </button>
        )}
      </div>

      <section>
        <h2 className="text-3xl font-bold text-[#7B4F28] mb-6 tracking-wide drop-shadow-sm">
          Reviews
        </h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-xl shadow-md border border-[#E0D6CC] mb-5 hover:shadow-lg transition-shadow duration-300"
            >
              <p className="font-semibold text-[#7B4F28] text-lg">
                {review.reviewerName}
              </p>
              <p className="text-[#5C3B1D] mt-1 mb-2">{review.description}</p>
              <p className="text-yellow-500 text-lg select-none">
                {"⭐".repeat(review.rating)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-[#5C3B1D] italic text-lg">No reviews yet.</p>
        )}

        <button
          onClick={() => setShowReviewModal(true)}
          className="mt-6 bg-[#7B4F28] hover:bg-[#5c3b1d] text-white px-6 py-3 rounded-lg font-semibold transition ease-in-out duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5c3b1d]"
        >
          Add Review
        </button>
      </section>

      {/* Modals */}
      <RequestDonation
        show={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        donation={donation}
        pickupTime={pickupTime}
        setPickupTime={setPickupTime}
        user={user}
      />
      <AddReview
        show={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        donationId={id}
        user={user}
      />

      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default DonatDetails;
