import React, { useContext } from "react";
import { FaHeart, FaUtensils, FaUsers, FaLeaf, FaHandsHelping, FaRegSmileBeam } from "react-icons/fa";
import { IoFastFoodOutline, IoShirtOutline } from "react-icons/io5";
import { MdFreeBreakfast, MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import { AuthContext } from "../LayOut/AuthContext";

const StatCard = ({ icon, title, value, description, color }) => {
  const borderColorClass = {
    blue: "border-t-blue-500",
    green: "border-t-green-500",
    emerald: "border-t-emerald-500",
    purple: "border-t-purple-500",
  }[color] || "border-t-gray-500";

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      className={`bg-white p-5 rounded-xl shadow-md cursor-pointer transition-transform ${borderColorClass}`}
      style={{ userSelect: "none" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`text-${color}-500 text-3xl`}>{icon}</div>
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-4xl font-extrabold mb-1">{value}</p>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const ActionButton = ({ icon, text, bgColor }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 ${bgColor} text-white px-5 py-3 rounded-lg shadow-lg hover:opacity-90 transition`}
  >
    {icon}
    <span className="font-semibold">{text}</span>
  </motion.button>
);

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const displayUser = user ?? { name: "Alex" };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-r from-indigo-50 to-white p-8"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-2 select-none">
          Welcome Back, {displayUser.displayName}! <span className="animate-wave inline-block">👋</span>
        </h1>
        <p className="text-indigo-700 text-lg select-none">Here's how you're making a difference:</p>
      </motion.header>

      {/* Impact Dashboard */}
      <motion.section variants={itemVariants} className="mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-indigo-700 select-none">
          <FaHeart className="text-red-500" size={28} /> Your Community Impact
        </h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={<FaUtensils />} title="Meals Shared" value="1,247+" description="This week" color="blue" />
          <StatCard icon={<FaUsers />} title="People Fed" value="950+" description="Near your area" color="green" />
          <StatCard icon={<FaLeaf />} title="CO2 Reduced" value="12 kg" description="Your impact" color="emerald" />
          <StatCard icon={<FaHandsHelping />} title="Charities" value="3" description="Need your help" color="purple" />
        </motion.div>
      </motion.section>

      {/* Charity + Request Sections */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 max-w-6xl mx-auto">
        {/* Charity Support */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-indigo-400">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-800 select-none">❤️ Charities You Can Support</h2>
          <ul className="space-y-5">
            {[
              { name: "Hope For All", stat: "320 families helped" },
              { name: "Green Plate Initiative", stat: "5.8 tons food saved" },
              { name: "Quick Meals for Homeless", stat: "Volunteers needed" },
            ].map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer select-none"
              >
                <div>
                  <p className="font-semibold text-indigo-900">{item.name}</p>
                  <p className="text-indigo-700 text-sm">{item.stat}</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold hover:bg-indigo-700 transition">
                  Donate
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Request Help */}
        <div className="bg-indigo-50 p-8 rounded-2xl shadow-lg select-none">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-900">📝 Need Help? Request Support</h2>
          <div className="grid grid-cols-2 gap-6">
            <ActionButton icon={<IoFastFoodOutline size={24} />} text="Request Meals" bgColor="bg-red-600" />
            <ActionButton icon={<IoShirtOutline size={24} />} text="Clothing" bgColor="bg-blue-600" />
            <ActionButton icon={<MdFreeBreakfast size={24} />} text="Groceries" bgColor="bg-amber-500" />
            <ActionButton icon={<MdHome size={24} />} text="Shelter" bgColor="bg-purple-600" />
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section variants={itemVariants} className="mb-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-indigo-700 select-none">
          <FaRegSmileBeam className="text-yellow-400" size={26} /> Stories from the Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Your donations helped us build a new homeless shelter!",
              author: "Helpful Hands NGO",
            },
            {
              quote: "200+ warm meals served daily—thank you!",
              author: "Food for All Foundation",
            },
            {
              quote: "We rescued 1.2 tons of food from waste this month.",
              author: "Tasty Bites Restaurant",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.12)" }}
              className="bg-white p-6 rounded-xl border-l-4 border-indigo-300 cursor-pointer transition"
            >
              <p className="italic text-gray-700 mb-4 select-text">"{item.quote}"</p>
              <p className="font-semibold text-indigo-900 select-text">— {item.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        variants={itemVariants}
        className="text-center py-10 bg-indigo-100 rounded-3xl shadow-inner max-w-4xl mx-auto select-none"
      >
        <h2 className="text-3xl font-bold mb-5 text-indigo-900">Ready to Make a Bigger Impact?</h2>
        <p className="text-indigo-700 mb-8 text-lg">Join 5,000+ others helping their communities.</p>
        <div className="flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-700 text-white px-8 py-3 rounded-full font-extrabold shadow-lg hover:bg-indigo-800 transition"
          >
            Share Your Story
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-indigo-700 text-indigo-700 px-8 py-3 rounded-full font-extrabold hover:bg-indigo-700 hover:text-white transition"
          >
            Invite Friends
          </motion.button>
        </div>
      </motion.section>

      {/* Wave emoji animation style */}
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(15deg); }
            30% { transform: rotate(-10deg); }
            45% { transform: rotate(15deg); }
            60% { transform: rotate(-5deg); }
            75% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-wave {
            display: inline-block;
            animation: wave 2s infinite;
            transform-origin: 70% 70%;
          }
        `}
      </style>
    </motion.div>
  );
};

export default OverviewPage;
