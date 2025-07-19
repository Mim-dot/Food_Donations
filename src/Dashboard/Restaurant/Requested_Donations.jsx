// Requested_Donations.jsx
import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxios"; // your axios instance with auth etc.
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requested_Donations = () => {
  const axiosSecure = useAxios();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/api/donation-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch donation requests", err);
      toast.error("Failed to fetch donation requests");
    }
  };

  const handleAction = async (requestId, donationId, action) => {
    try {
      await axiosSecure.patch(`/api/donation-requests/${requestId}`, {
        action,
        donationId,
      });
      toast.success(`Request ${action.toLowerCase()} successfully`);
      fetchRequests(); // refresh after action
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
      toast.error(`Failed to ${action} request`);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 md:p-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
      >
        All Donation Requests
      </motion.h2>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white dark:bg-gray-900">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Donation Title
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Food Type
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Charity Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Description
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Pickup Time
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
              <th className="py-3 px-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {requests.map((req) => (
              <motion.tr
                key={req._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="py-3 px-4">{req.donationTitle}</td>
                <td className="py-3 px-4">{req.foodType}</td>
                <td className="py-3 px-4">{req.charityName}</td>
                <td className="py-3 px-4">{req.charityEmail}</td>
                <td className="py-3 px-4">{req.description}</td>
                <td className="py-3 px-4">{req.pickupTime}</td>
                <td className="py-3 px-4 font-semibold">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      req.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {req.status === "Pending" ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleAction(req._id, req.donationId, "Accepted")
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req._id, req.donationId, "Rejected")
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">No actions</span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requested_Donations;
