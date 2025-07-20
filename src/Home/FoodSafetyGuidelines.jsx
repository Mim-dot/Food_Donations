import React from 'react';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const guidelines = [
  "Do not donate expired food.",
  "Keep hot food hot and cold food cold.",
  "Label containers with preparation date.",
  "Avoid food with broken packaging.",
  "Use clean containers for donations."
];

const FoodSafetyGuidelines = () => {
  return (
    <section className="py-12 bg-[#F5EFE6] dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold mb-8 text-center text-[#7B4F28] dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaInfoCircle className="inline mr-2 text-blue-600" /> Food Safety Guidelines
        </motion.h2>

        <div className="space-y-6">
          {guidelines.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white border border-[#E0D6CC] p-5 rounded-xl shadow-md"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <p className="text-[#5C3B1D] text-lg">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodSafetyGuidelines;
