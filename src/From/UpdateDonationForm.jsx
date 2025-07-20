import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../Hook/useAxios";
import useAxiosSecure from "../Hook/useAxiosSecure";

const UpdateDonationForm = ({ donation, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: donation.donationTitle,
    foodType: donation.
foodType
,
    quantity: donation.quantity,
    description: donation.description,
    image: donation.image,
    pickupTime: donation.pickupTime,
    expiryDate: donation.expiryDate,
    restaurantName: donation.restaurantName,
    restaurantLocation: donation.location,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosSecure.put(
        `/donations/${donation._id}`,
        formData
      );
      onUpdate(response.data);
      Swal.fire({
        title: "Success!",
        text: "Donation updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error updating donation:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update donation",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-[70vh] md:h-[75vh] flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto pr-3 space-y-4 flex-1"
        id="donation-form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Donation Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            />
          </div>

          {/* Food Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Food Type
            </label>
            <select
              name="foodType"
              value={formData.foodType}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            >
              <option value="">Select food type</option>
              <option value="Perishable">Perishable</option>
              <option value="Non-perishable">Non-perishable</option>
              <option value="Prepared">Prepared</option>
              <option value="Dry goods">Dry goods</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
              min="1"
            />
          </div>

          {/* Pickup Time */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Pickup Time
            </label>
            <input
              type="datetime-local"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            />
          </div>

          {/* Restaurant Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <input
              type="text"
              name="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            />
          </div>

          {/* Restaurant Location */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Restaurant Location
            </label>
            <input
              type="text"
              name="restaurantLocation"
              value={formData.restaurantLocation}
              onChange={handleChange}
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-md p-2 border border-gray-300 focus:ring-[#7B4F28] focus:border-[#7B4F28]"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#7B4F28] file:text-white hover:file:bg-[#5C3B1D]"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-20 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Sticky Footer Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="donation-form"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-[#7B4F28] hover:bg-[#5C3B1D] rounded-md disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Donation"}
        </button>
      </div>
    </div>
  );
};

export default UpdateDonationForm;
