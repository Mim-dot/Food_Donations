import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import loadingAnimation from "../../../src/assets/loadingAnimation.json";
import Useable from "../../Useable";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import UpdateDonationForm from "../../From/UpdateDonationForm";

const My_Donations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDonation, setEditDonation] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/all/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error("Failed to load donations", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/donations/${id}`)
          .then(() => {
            setDonations(donations.filter((d) => d._id !== id));
            Swal.fire("Deleted!", "Your donation has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete donation.", "error");
          });
      }
    });
  };

  const handleUpdate = (donation) => {
    setEditDonation(donation);
  };

  const handleModalClose = () => {
    setEditDonation(null);
  };

  const handleDonationUpdated = (updatedDonation) => {
    setDonations(
      donations.map((d) =>
        d._id === updatedDonation._id ? updatedDonation : d
      )
    );
    setEditDonation(null);
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#F5EFE6]">
        <Lottie animationData={loadingAnimation} loop={true} className="w-60" />
      </div>
    );
  }

  return (
    <section className="bg-[#F5EFE6] min-h-screen p-6">
      {donations.length === 0 ? (
        <Useable />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {donations.map((donation, index) => (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-[#E0D6CC] rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-[1.04] flex flex-col"
            >
              <img
                src={donation.image || "https://via.placeholder.com/150"}
                alt={donation.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-[#7B4F28] mb-1">
                  {donation.title}
                </h3>
                <p className="text-sm text-[#5C3B1D] mb-1">
                  <span className="font-semibold">Type:</span>{" "}
                  {donation.foodType}
                </p>
                <p className="text-sm text-[#5C3B1D] mb-1">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {donation.quantity}
                </p>
                <p className="text-sm text-[#5C3B1D] mb-1">
                  <span className="font-semibold">Restaurant:</span>{" "}
                  {donation.restaurantName}
                </p>
                <p
                  className={`text-sm mb-3 font-semibold ${
                    donation.status === "Verified"
                      ? "text-green-600"
                      : donation.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {donation.status}
                </p>
              </div>

              <div className="flex justify-between mt-auto">
                {donation.status !== "Rejected" && (
                  <button
                    onClick={() => handleUpdate(donation)}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Update
                  </button>
                )}
                <button
                  onClick={() => handleDelete(donation._id)}
                  className="bg-red-600 text-white px-4 py-2 text-sm rounded-xl hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Update Donation Modal */}
      {editDonation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#7B4F28] mb-4">
              Update Donation
            </h2>
            <UpdateDonationForm
              donation={editDonation}
              onClose={handleModalClose}
              onUpdate={handleDonationUpdated}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default My_Donations;
