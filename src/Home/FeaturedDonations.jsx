import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { motion } from "framer-motion";
import loadingAnimation from "../assets/loadingAnimation.json";
import Lottie from "lottie-react";
import Useable from "../Useable";

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: featuredDonations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/featured?limit=4");
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  if (isLoading) return;
  <div className="h-screen flex justify-center items-center">
    <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
  </div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  if (!featuredDonations.length)
    return (
      <div className="text-center py-10 text-gray-500">
        <Useable />
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto nav">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8 font-cursive">
        🌟 Featured Food Donations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredDonations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border nav border-pink-200 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <img
              src={donation.image || "/default-donation.png"}
              alt={donation.title}
              className="h-48 w-full object-cover rounded-t-2xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-donation.png";
              }}
            />
            <div className="p-4 space-y-2 ">
              <h3 className="text-lg font-semibold text-pink-700">
                {donation.donationTitle || "Untitled Donation"}
              </h3>
              <p className="nav-bite text-sm text-gray-600">
                🍽 Food Type:{" "}
                <span className="font-medium">
                  {donation.foodType || "N/A"}
                </span>
              </p>
              <p className="nav-bite text-sm text-gray-600">
                🏠 Restaurant:{" "}
                <span className="font-medium">
                  {donation.restaurantName || "N/A"}
                </span>
              </p>
              <p className="nav-bite text-sm text-gray-600">
                📍 Location:{" "}
                <span className="font-medium">
                  {donation.location || "N/A"}
                </span>
              </p>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                  donation.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : donation.status === "Picked Up"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {donation.status || "Unknown"}
              </span>

              <button
                onClick={() => navigate(`/donations/${donation._id}`)}
                className="mt-4 w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition-all"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
