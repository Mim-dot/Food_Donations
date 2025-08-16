import React from "react";
import { motion } from "framer-motion";

// Sample events data
const events = [
  {
    title: "Community Food Drive",
    date: "Aug 25, 2025",
    location: "Downtown Community Center",
    description: "Join us to collect and distribute meals to those in need.",
  },
  {
    title: "Volunteer Orientation",
    date: "Sep 5, 2025",
    location: "Local Charity Hub",
    description:
      "Learn how to get involved and make a difference in your community.",
  },
  {
    title: "Charity Awareness Campaign",
    date: "Sep 20, 2025",
    location: "City Park",
    description:
      "Participate in events to raise awareness about food waste reduction.",
  },
];

export const UpcomingEvents = () => {
  return (
    <section className="p-6 md:p-10 bg-[#FFFFFF]">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-[#7B4F28] text-center mb-8"
      >
        Upcoming Events / Campaigns
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-[#F5EFE6] border border-[#E0D6CC] rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-[#7B4F28] mb-2">
              {event.title}
            </h3>
            <p className="text-[#5C3B1D] mb-1">
              <span className="font-semibold">Date:</span> {event.date}
            </p>
            <p className="text-[#5C3B1D] mb-3">
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p className="text-[#5C3B1D]">{event.description}</p>
            <button className="mt-4 bg-[#7B4F28] text-white px-4 py-2 rounded hover:bg-[#5c3b1d] transition">
              Join Event
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
