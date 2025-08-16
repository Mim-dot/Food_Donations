import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Mama’s Kitchen",
    type: "Restaurant",
    story:
      "We reduced food waste by over 40% since partnering with the platform. Every unsold meal now reaches someone in need.",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  },
  {
    id: 2,
    name: "Helping Hands",
    type: "Charity",
    story:
      "Thanks to local donations, we’ve been able to serve 3,000+ meals this year. The impact has been incredible.",
    image: "https://i.ibb.co/BHhqdhsb/help.jpg",
  },
  {
    id: 3,
    name: "Taste for Good",
    type: "Restaurant",
    story:
      "Joining this platform was one of the best decisions. Not only did we minimize waste, but we also gained community love.",
    image: "https://i.ibb.co/XZM45njs/Taste-for-Good.jpg", // kitchen teamwork
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const CommunityStories = () => {
  return (
    <section className="navv  py-16 bg-gradient-to-b from-[#FAF4EF] to-[#F5EFE6]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-[#7B4F28]"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌟 Community Stories
        </motion.h2>

        <div className=" grid md:grid-cols-3 gap-8">
          {stories.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-white nav rounded-2xl p-5 shadow-md border border-[#E8DDD2] hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={idx}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover rounded-xl mb-4"
              />
              <p className="text-[#5C3B1D] nav-bite mb-3 text-base italic flex items-start gap-2 leading-relaxed">
                <FaQuoteLeft className="text-[#B87740] mt-1 shrink-0" /> “
                {item.story}”
              </p>
              <p className="nav-bite text-[#7B4F28] font-semibold text-lg">
                {item.name}
              </p>
              <p className="nav-bite text-sm text-[#A46B3C]">{item.type}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStories;
