import React, { useContext } from "react";
import { FaUtensils, FaUsers, FaLeaf, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../LayOut/AuthContext";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ==== Dummy Data for Charts ====
const donationTrends = [
  { month: "Jan", donations: 40 },
  { month: "Feb", donations: 65 },
  { month: "Mar", donations: 90 },
  { month: "Apr", donations: 70 },
  { month: "May", donations: 120 },
  { month: "Jun", donations: 150 },
];

const donationCategories = [
  { name: "Prepared", value: 400 },
  { name: "Produce", value: 300 },
  { name: "Cooked Meals", value: 200 },
  { name: "Snacks", value: 100 },
  { name: "Fast Food", value: 100 },
];

const monthlyImpact = [
  { month: "Jan", people: 120 },
  { month: "Feb", people: 200 },
  { month: "Mar", people: 250 },
  { month: "Apr", people: 180 },
  { month: "May", people: 320 },
  { month: "Jun", people: 400 },
];

const COLORS = [
  "#4F46E5",
  "#F97316",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
];

// ==== Stat Card Component ====
const StatCard = ({ icon, title, value, description, color }) => {
  const borderColorClass =
    {
      blue: "border-t-blue-500",
      green: "border-t-green-500",
      emerald: "border-t-emerald-500",
      purple: "border-t-purple-500",
    }[color] || "border-t-gray-500";

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
      className={`bg-white p-5 rounded-xl shadow-md cursor-pointer transition-transform border-t-4 ${borderColorClass}`}
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

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const displayUser = user ?? { displayName: "Alex" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-r from-indigo-50 to-white p-8"
    >
      {/* Header */}
      <header className="mb-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-2 select-none">
          Welcome Back, {displayUser.displayName}!{" "}
          <span className="animate-wave inline-block">👋</span>
        </h1>
        <p className="text-indigo-700 text-lg">Here’s your impact overview:</p>
      </header>

      {/* Stat Cards */}
      <section className="mb-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            icon={<FaUtensils />}
            title="Meals Shared"
            value="1,247+"
            description="This week"
            color="blue"
          />
          <StatCard
            icon={<FaUsers />}
            title="People Fed"
            value="950+"
            description="Near you"
            color="green"
          />
          <StatCard
            icon={<FaLeaf />}
            title="CO₂ Reduced"
            value="12kg"
            description="Environmental Impact"
            color="emerald"
          />
          <StatCard
            icon={<FaHandsHelping />}
            title="Charities"
            value="3"
            description="Supporting"
            color="purple"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Line Chart - Donation Trends */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 text-indigo-700">
            📈 Donation Trends
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={donationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Category Distribution */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-2 text-indigo-700">
            🥗 Donation Categories
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={donationCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {donationCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </section>
      {/* 
      Bar Chart - Monthly Impact
      <section className="max-w-6xl mx-auto mb-12">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 text-indigo-700">
            👥 Monthly People Impacted
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyImpact}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="people" fill="#10B981" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </section> */}
    </motion.div>
  );
};

export default OverviewPage;
