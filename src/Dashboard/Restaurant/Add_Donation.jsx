import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../LayOut/AuthContext";
import Swal from "sweetalert2";
import uploadToImgBB from "../UploadToImgBB";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Add_Donation = () => {
  const { user } = useContext(AuthContext);
  const axiossecure = useAxiosSecure();

  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const image = data.image[0];
    if (!image) {
      return Swal.fire({
        icon: "warning",
        title: "No Image Selected!",
        text: "Please select an image to upload.",
      });
    }

    const imageUrl = await uploadToImgBB(image);
    if (!imageUrl) return;

    const donationData = {
      donationTitle: data.donationTitle,
      foodType: data.foodType,
      quantity: data.quantity,
      pickupWindow: data.pickupWindow,
      location: data.location,
      restaurantName: user.displayName || "Unknown",
      restaurantEmail: user.email || "Unknown",
      image: imageUrl,
    };

    try {
      await axiossecure.post("/api/donations", donationData);
      Swal.fire({
        icon: "success",
        title: "Donation Submitted!",
        text: "Your food donation has been successfully added.",
      });
      reset();
      setPreview(null);
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="navv max-w-2xl mx-auto my-12 px-6 py-8 bg-[#fffaf5]  rounded-3xl shadow-xl font-[Comfortaa]">
      <h2 className=" nav-bite text-3xl font-bold mb-8 text-center text-[#7B4F28] ">
        🍱 Add a Food Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  nav-bite ">
        {/* Text Fields */}
        {[
          { name: "donationTitle", placeholder: "Donation Title" },
          { name: "foodType", placeholder: "Food Type (e.g., Bakery, Rice)" },
          { name: "quantity", placeholder: "Quantity (e.g., 5kg or 10 meals)" },
          {
            name: "pickupWindow",
            placeholder: "Pickup Time Window (e.g., 2PM-5PM)",
          },
          { name: "location", placeholder: "Pickup Location" },
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            {...register(name)}
            placeholder={placeholder}
            className="  nav-bite navv nav-b w-full px-4 py-3 bg-white  border border-[#ccc]  rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4A373] text-black font-bold placeholder-gray-400 "
          />
        ))}

        {/* Image Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            className=" nav-bite nav cursor-pointer w-full file:px-4 file:py-2 file:rounded-lg file:border-none file:bg-[#D4A373] file:text-white hover:file:bg-[#bb8859] bg-white border border-[#ccc]  rounded-lg text-black font-bold"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className=" nav-bite mt-4 mx-auto w-40 h-40 object-cover rounded-xl border-4 border-[#D4A373]"
            />
          )}
        </div>

        {/* Restaurant Info (Read-only) */}
        <input
          value={user.displayName || "Anonymous"}
          readOnly
          className="nav  nav-bite w-full px-4 py-3 bg-[#f0f0f0] dark:bg-[#4a4541] border border-[#ccc] dark:border-[#555] rounded-lg text-black font-bold"
        />
        <input
          value={user.email || "No email"}
          readOnly
          className="w-full nav  nav-bite px-4 py-3 bg-[#f0f0f0] dark:bg-[#4a4541] border border-[#ccc]  rounded-lg text-black font-bold"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#7B4F28] text-white font-semibold text-lg hover:bg-[#a0693c] transition-all dark:bg-orange-500 dark:hover:bg-orange-400 cursor-pointer"
        >
          ➕ Submit Donation
        </button>
      </form>
    </div>
  );
};

export default Add_Donation;
