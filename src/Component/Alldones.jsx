import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { AuthContext } from "../LayOut/AuthContext";
import Useable from "../Useable";
import loadingAnimation from "../assets/loadingAnimation.json";
import Lottie from "lottie-react";
const Alldones = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    document.title = "All Donation";
  }, []);
  useEffect(() => {
    if (!loading && user) {
      axiosSecure
        .get("/donations/verified")
        .then((res) => {
          setDonations(res.data);
          setLoadingDonations(false);
        })
        .catch((err) => {
          console.error("Error fetching donations:", err);
          setLoadingDonations(false);
        });
    }
  }, [axiosSecure, user, loading]);

  const filtered = donations.filter((d) =>
    d.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = filtered.sort((a, b) => {
    if (sortOption === "quantity") {
      return Number(b.quantity) - Number(a.quantity);
    } else if (sortOption === "pickupTime") {
      return (a.pickupTime || "").localeCompare(b.pickupTime || "");
    }
    return 0;
  });

  if (loading || loadingDonations) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );
  }

  if (donations.length === 0) {
    return <Useable />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20">
      <motion.h2
        className="text-4xl font-bold text-center mb-8 text-[#512B1B] tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🍱 Verified Food Donations
      </motion.h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by location..."
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/2 shadow focus:outline-none focus:ring-2 focus:ring-[#512B1B]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 p-2 rounded-md w-full md:w-1/3 shadow focus:outline-none focus:ring-2 focus:ring-[#512B1B]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="quantity">Quantity</option>
          <option value="pickupTime">Pickup Time</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorted.map((donation, index) => (
          <motion.div
            key={donation._id}
            className="bg-gradient-to-br from-[#FFF8F1] to-[#F1E5D6] border border-[#E7D4BD] rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-[#6B3E2E]">
                {donation.donationTitle}
              </h3>
              <p className="text-sm text-gray-700">
                🍽️ <strong>Restaurant:</strong> {donation.restaurantName} (
                {donation.location || "Unknown"})
              </p>
              <p className="text-sm text-gray-700">
                ❤️ <strong>Charity:</strong>{" "}
                {donation.organizationName || (
                  <span className="text-gray-400">Not assigned</span>
                )}
              </p>
              <p className="text-sm text-gray-700">
                ⏰ <strong>Pickup Time:</strong>{" "}
                {donation.pickupWindow || "N/A"}
              </p>
              <p className="text-sm text-gray-700">
                📦 <strong>Quantity:</strong> {donation.quantity}
              </p>

              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                  donation.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : donation.status === "Requested"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {donation.status}
              </span>

              <Link
                to={`/donations/${donation._id}`}
                className="block w-full text-center py-2 rounded-md bg-[#512B1B] text-white mt-3 hover:bg-[#6B3E2E] transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Alldones;
