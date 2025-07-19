import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../Hook/useAxios";

const RequestDonation = ({
  show,
  onClose,
  donation,
  pickupTime,
  setPickupTime,
  user,
}) => {
  const axiosSecure = useAxios();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(""); // New location state

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      donationId: donation._id,
      donationTitle: donation.donationTitle,
      restaurantName: donation.restaurantName,
      foodType: donation.foodType,
      quantity: donation.quantity,
      charityEmail: user.email,
      charityName: user.displayName,
      pickupTime,
      description,
      location, // Include location
      status: "Pending",
    };

    try {
      const res = await axiosSecure.post("/donation-requests", requestData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted",
          text: `Pickup Time: ${pickupTime}`,
          confirmButtonColor: "#7B4F28",
        });
        onClose();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to submit request",
        text: err.message,
      });
    }
  };

  return (
    <div className="fixed inset-0   flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-bold text-[#7B4F28] mb-4">Request Donation</h3>
        <form onSubmit={handleSubmit}>
          <Input label="Donation Title" value={donation.donationTitle} readOnly />
          <Input label="Restaurant Name" value={donation.restaurantName} readOnly />
          <Input label="Charity Name" value={user?.displayName || "Unknown"} readOnly />
          <Input label="Charity Email" value={user?.email || "Unknown"} readOnly />

          <label className="block mb-1 font-semibold text-[#5C3B1D]">Pickup Time</label>
          <input
            type="time"
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full mb-4 p-2 border border-[#E0D6CC] rounded"
          />

          {/* New Location Input */}
          <Input
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your pickup location"
          />

          {/* Description Textarea */}
          <label className="block mb-1 font-semibold text-[#5C3B1D]">Request Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-6 p-2 border border-[#E0D6CC] rounded"
            placeholder="Explain why you need this donation..."
          ></textarea>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#7B4F28] rounded text-[#7B4F28] font-semibold hover:bg-[#F5EFE6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#7B4F28] text-white px-5 py-2 rounded font-semibold hover:bg-[#5c3b1d] transition"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input component
const Input = ({ label, value = "", readOnly = false, onChange, placeholder }) => (
  <>
    <label className="block mb-1 font-semibold text-[#5C3B1D]">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className="w-full mb-4 p-2 border border-[#E0D6CC] rounded"
    />
  </>
);

export default RequestDonation;
