import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import axios from "axios";
import { motion } from "framer-motion";
import Useable from "../Useable";
import Lottie from "lottie-react";
import loadingAnimation from '../assets/loadingAnimation.json'
import AxiosSecure from "../Hook/AxiosSecure";
const Alldones = () => {
  const [donations, setDonations] = useState([]);
const [loading, setLoading] = useState(true);
 const axiossecure = AxiosSecure();
  useEffect(() => {
    axiossecure.get("/all/donations") 
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Failed to load donations", err))
      .finally(() => setLoading(false));
  }, []);
 if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5EFE6]">
        <Lottie animationData={loadingAnimation} loop={true} className="w-60" />
      </div>
    );
  }
  return (
    <section>
      {donations.length ===0 ?
      (<Useable/>) : (
 <div className="grid mt-15 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-[#F5EFE6] min-h-screen ">
      {donations.map((donation, index) => (
        <motion.div
          key={donation._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white h-[350px] border border-[#E0D6CC] rounded-xl p-4  w-full shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
        >
          <img
            src={donation.image || "https://via.placeholder.com/150"}
            alt={donation.title}
            className="w-full h-36 object-cover rounded-md mb-3"
          />

          <div className="flex-grow">
            <h3 className="text-lg font-bold text-[#7B4F28] mb-1 line-clamp-1">{donation.title}</h3>
            <p className="text-sm text-[#5C3B1D] mb-1">
              🍽️ <span className="font-semibold text-green-700">{donation.restaurantName}</span>, {donation.restaurantLocation}
            </p>
            <p className="text-sm text-[#5C3B1D] mb-1">🏥 Charity: {donation.charityName || "Not Assigned"}</p>
            <p className={`text-sm mb-1 font-semibold ${
              donation.status === "Available" ? "text-green-700" :
              donation.status === "Requested" ? "text-yellow-600" :
              "text-blue-700"
            }`}>
              📦 Status: {donation.status}
            </p>
            <p className="text-sm text-[#5C3B1D] mb-3">🔢 Quantity: {donation.quantity}</p>
          </div>

          <Link
            to="/donatdetails"
            className="mt-2 inline-block bg-[#7B4F28] text-white px-4 py-2 text-sm rounded-md hover:bg-[#5c3b1d] transition"
          >
            View Details
          </Link>
        </motion.div>
      ))}
    </div>
      )
      
    }
    </section>
  
  );
};

export default Alldones;
