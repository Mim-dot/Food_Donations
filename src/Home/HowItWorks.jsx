import React from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaClipboardList,
  FaTruck,
  FaChartLine,
} from "react-icons/fa";

const steps = [
  {
    title: "Find a Donation or Volunteer",
    description:
      "Browse available donations or volunteer opportunities on our platform.",
    icon: <FaSearch className="text-[#7B4F28] w-10 h-10" />,
  },
  {
    title: "Submit Request / Sign Up",
    description:
      "Quickly submit your donation request or volunteer application.",
    icon: <FaClipboardList className="text-[#7B4F28] w-10 h-10" />,
  },
  {
    title: "Pickup or Deliver Food",
    description:
      "Coordinate with charities or volunteers to safely deliver food.",
    icon: <FaTruck className="text-[#7B4F28] w-10 h-10" />,
  },
  {
    title: "Track Impact",
    description:
      "See the difference you made through completed donations and stories.",
    icon: <FaChartLine className="text-[#7B4F28] w-10 h-10" />,
  },
];

export const HowItWorks = () => {
  return (
    <section className="p-6 md:p-12 bg-[#F5EFE6]">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[#7B4F28] text-center mb-12"
      >
        How It Works
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-[#FFFFFF] border border-[#E0D6CC] rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:shadow-2xl cursor-pointer"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-[#D4A373] rounded-full text-white text-2xl">
              {index + 1}
            </div>
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-[#7B4F28] mb-2">
              {step.title}
            </h3>
            <p className="text-[#5C3B1D]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default HowItWorks;
