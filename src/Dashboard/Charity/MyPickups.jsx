import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingAnimation from "../../assets/loadingAnimation.json";
import Lottie from "lottie-react";
import Useable from "../../Useable";

const MyPickups = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchAcceptedPickups = async () => {
      try {
        const res = await axiosSecure.get("/donation-requests");
        const accepted = res.data.filter(
          (r) => r.charityEmail === user.email && r.status === "Accepted"
        );
        setPickups(accepted);
      } catch (error) {
        toast.error("Failed to fetch pickups");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedPickups();
  }, [user, axiosSecure]);

  const handleConfirmPickup = async (id) => {
    try {
      const res = await axiosSecure.patch(`/pickup/donation-requests/${id}`, {
        status: "Picked Up",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Pickup confirmed!");
        setPickups((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Could not confirm pickup");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );
  }

  if (pickups.length === 0) {
    return <Useable />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <ToastContainer position="top-center" />
      {pickups.map((pickup) => (
        <div
          key={pickup._id}
          className="bg-white/90 nav rounded-2xl border border-[#ECD9C6] shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center hover:scale-[1.01] transition-all duration-300"
        >
          <div>
            <h3 className="text-xl nav-bite font-bold text-[#7B4F28]">
              {pickup.donationTitle}
            </h3>
            <p className="text-sm nav-bite text-[#5C3B1D]">
              🏪 Restaurant: {pickup.restaurantName}
            </p>
            <p className="text-sm nav-bite text-[#5C3B1D]">
              📍 Location: {pickup.location || "N/A"}
            </p>
            <p className="text-sm nav-bite text-[#5C3B1D]">
              🥘 Food Type: {pickup.foodType}
            </p>
            <p className="text-sm nav-bite text-[#5C3B1D]">
              📦 Quantity: {pickup.quantity}
            </p>
            <p className="text-sm nav-bite text-[#5C3B1D]">
              🕓 Pickup Time: {pickup.pickupTime || "Not Provided"}
            </p>
            <p className="mt-2 inline-block bg-green-100 text-green-700 font-medium text-sm px-3 py-1 rounded-full">
              Status: Assigned
            </p>
          </div>

          <button
            onClick={() => handleConfirmPickup(pickup._id)}
            className="mt-4 md:mt-0 px-5 py-2 bg-gradient-to-tr from-green-600 to-green-400 text-white font-semibold rounded-xl shadow hover:scale-105 transition-all"
          >
            Confirm Pickup
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPickups;
