import React, { useEffect, useState, useContext } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const StatisticsChart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/restaurant/statistics/${user.email}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch donation stats", err);
        });
    }
  }, [user?.email]);

  return (
    <div className="p-4 nav bg-white rounded-xl shadow-md">
      <h2 className="text-xl  nav-bite font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
        Donation Statistics by Food Type
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="foodType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalQuantity" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;
