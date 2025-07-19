import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../LayOut/AuthContext";
import loadingAnimation from '../../assets/loadingAnimation.json'
import Lottie from "lottie-react";
import Useable from "../../Useable";

const CharityRequests = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRequests = async () => {
      try {
        const response = await axiosSecure.get("/donation-requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch donation requests", error);
        toast.error(error.response?.data?.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user, axiosSecure]);

  const handleCancelRequest = async (requestId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/donation-requests/${requestId}`);
        toast.success("Request cancelled successfully");
        setRequests((prev) => prev.filter((r) => r._id !== requestId));
        Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
      } catch (error) {
        console.error("Failed to cancel request", error);
        toast.error(error.response?.data?.message || "Could not cancel request");
      }
    }
  };

  if (loading)
    return (
    <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );

  if (requests.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600 text-lg font-semibold">
       <Useable/>
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Use grid with 3 columns gap-8 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white/60 backdrop-blur-md border border-[#ECD9C6] rounded-3xl p-6 shadow-lg flex flex-col justify-between transition-transform hover:scale-[1.03] duration-300 ease-in-out"
          >
            <div className="flex flex-col space-y-1">
              <h3 className="text-3xl font-extrabold tracking-tight text-[#7B4F28]">
                {req.donationTitle}
              </h3>
              <p className="text-[#5C3B1D] text-sm md:text-base">
                🍽️ <span className="font-semibold">Restaurant:</span> {req.restaurantName}
              </p>
              <p className="text-[#5C3B1D] text-sm md:text-base">
                🥗 <span className="font-semibold">Food Type:</span> {req.foodType}
              </p>
              <p className="text-[#5C3B1D] text-sm md:text-base">
                📦 <span className="font-semibold">Quantity:</span> {req.quantity}
              </p>

              <p
                className={`inline-block px-4 py-2 mt-4 rounded-full text-sm font-semibold shadow-md ring-1 ring-inset ${
                  req.status === "Pending"
                    ? "bg-[#FFF5E5] text-[#D69E2E] ring-[#F6C177]"
                    : req.status === "Accepted"
                    ? "bg-[#E6FFFA] text-[#2C7A7B] ring-[#81E6D9]"
                    : "bg-[#FFF0F0] text-[#C53030] ring-[#FEB2B2]"
                }`}
              >
                Status: {req.status}
              </p>
            </div>

            {req.status === "Pending" && (
              <button
                onClick={() => handleCancelRequest(req._id)}
                className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-tr from-[#FF6B6B] to-[#FF8787] text-white font-bold shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharityRequests;
