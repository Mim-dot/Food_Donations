import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../LayOut/AuthContext";
import AddReview from "../../From/AddReview";
import useAxios from "../../Hook/useAxios";
import Useable from "../../Useable";

const ReceivedDonati = () => {
  const axiossecure = useAxiosSecure(); // For authenticated donation requests
  const axiosSecure = useAxios(); // For reviews
  const { user } = useContext(AuthContext);

  const [donations, setDonations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch picked up donations
  useEffect(() => {
    if (user?.email) {
      axiossecure(`/donation-requests/charity/${user.email}`)
        .then((res) => {
          const pickedUp = res.data.filter((d) => d.status === "Picked Up");
          setDonations(pickedUp);
        })
        .catch((err) => {
          console.error("Failed to fetch received donations", err);
        });
    }
  }, [user?.email, axiossecure]);

  // Fetch all reviews
  const fetchReviews = () => {
    axiosSecure
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to fetch reviews", err));
  };

  useEffect(() => {
    fetchReviews();
  }, [axiosSecure]);

  // After review added
  const handleReviewAdded = () => {
    setShowModal(false);
    fetchReviews();
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" },
  };

  return (
    <motion.div
      className="px-6 py-8 max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-extrabold text-[#7B4F28] mb-8 select-none"
        variants={cardVariants}
      >
        Received Donations
      </motion.h2>

      {donations.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Useable />
        </motion.p>
      ) : (
        <motion.div className="grid md:grid-cols-2 gap-8">
          {donations.map((donation) => (
            <motion.div
              key={donation._id}
              className="border nav  nav-bite border-[#E0D6CC] p-6 rounded-xl bg-white cursor-pointer select-none"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-xl nav-bite font-semibold text-[#5C3B1D] mb-3">
                {donation.donationTitle}
              </h3>
              <p>
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p>
                <strong>Food Type:</strong> {donation.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {donation.quantity}
              </p>
              <p>
                <strong>Pickup Time:</strong> {donation.pickupTime}
              </p>

              <button
                onClick={() => {
                  setSelectedDonation(donation);
                  setShowModal(true);
                }}
                className="mt-5 w-full bg-[#7B4F28] hover:bg-[#5C3B1D] text-white py-3 rounded-lg font-semibold transition"
              >
                Add Review
              </button>

              {/* Existing reviews for this donation */}
              <div className="mt-6">
                <h4 className="font-semibold text-sm mb-2">Reviews:</h4>
                {reviews
                  .filter((r) => String(r.donationId) === String(donation._id))
                  .map((r, idx) => (
                    <motion.div
                      key={idx}
                      className="text-sm border-l-4 border-[#7B4F28] pl-4 mb-3 bg-[#FFF9F3] p-3 rounded-md shadow-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p>
                        <strong>{r.reviewerName}</strong> ({r.rating}⭐)
                      </p>
                      <p>{r.description}</p>
                    </motion.div>
                  ))}
                {reviews.filter(
                  (r) => String(r.donationId) === String(donation._id)
                ).length === 0 && (
                  <p className="text-gray-400 italic nav-w">No reviews yet.</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* AddReview Modal */}
      <AnimatePresence>
        {showModal && selectedDonation && (
          <AddReview
            show={showModal}
            donationId={selectedDonation._id}
            user={user}
            onClose={() => setShowModal(false)}
            onReviewAdded={handleReviewAdded}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReceivedDonati;
