import React from "react";
import { motion } from "framer-motion";

// Sample steps data
const steps = [
  {
    title: "Find a Donation or Volunteer",
    description:
      "Browse available donations or volunteer opportunities on our platform.",
  },
  {
    title: "Submit Request / Sign Up",
    description:
      "Quickly submit your donation request or volunteer application.",
  },
  {
    title: "Pickup or Deliver Food",
    description:
      "Coordinate with charities or volunteers to safely deliver food.",
  },
  {
    title: "Track Impact",
    description:
      "See the difference you made through completed donations and stories.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="p-6 md:p-10 bg-[#F5EFE6]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[#7B4F28] text-center mb-8"
      >
        How It Works
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-[#FFFFFF] border border-[#E0D6CC] rounded-xl p-6 shadow-sm"
          >
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
