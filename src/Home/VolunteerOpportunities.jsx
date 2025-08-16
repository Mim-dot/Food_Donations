import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock, FaUserPlus } from "react-icons/fa";

const fakeOpportunities = [
  {
    id: 1,
    role: "Food Pickup Assistant",
    location: "Gulshan, Dhaka",
    date: "2025-07-25",
    time: "10:00 AM - 12:00 PM",
  },
  {
    id: 2,
    role: "Awareness Campaign Volunteer",
    location: "Dhanmondi, Dhaka",
    date: "2025-07-28",
    time: "2:00 PM - 5:00 PM",
  },
  {
    id: 3,
    role: "Donation Packaging Helper",
    location: "Banani, Dhaka",
    date: "2025-07-22",
    time: "9:00 AM - 11:00 AM",
  },
  {
    id: 4,
    role: "Community Outreach Volunteer",
    location: "Mohakhali, Dhaka",
    date: "2025-07-27",
    time: "3:00 PM - 6:00 PM",
  },
];

const VolunteerOpportunities = () => {
  return (
    <section className="nav py-12 bg-[#F5EFE6] ">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold mb-10 text-center text-[#7B4F28] "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Volunteer Opportunities
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {fakeOpportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              className="p-6 rounded-2xl border border-[#E0D6CC] nav bg-white shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <h3 className="nav-bite text-2xl font-semibold text-[#7B4F28] mb-3">
                {opportunity.role}
              </h3>
              <p className="nav-bite flex items-center text-[#5C3B1D] mb-1">
                <FaMapMarkerAlt className="mr-2 text-green-500" />{" "}
                {opportunity.location}
              </p>
              <p className="nav-bite flex items-center text-[#5C3B1D] mb-1">
                <FaClock className="mr-2 text-blue-500" /> {opportunity.date} |{" "}
                {opportunity.time}
              </p>
              <button className="mt-4 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2">
                <FaUserPlus /> Sign Up
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerOpportunities;
