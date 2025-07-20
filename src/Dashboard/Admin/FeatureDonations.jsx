import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import loadingAnimation from "../../assets/loadingAnimation.json";
import Useable from "../../Useable";
import Lottie from "lottie-react";

const FeatureDonations = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    document.title = "Feature Donations";
  }, []);

  // Fetch all verified donations
  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified"); // Adjust this API if different
      return Array.isArray(res?.data) ? res.data : [];
    },
  });

  // Mutation to toggle feature status
  const featureMutation = useMutation({
    mutationFn: ({ donationId, isFeatured }) =>
      axiosSecure.patch(`/admin/donations/${donationId}/feature`, {
        isFeatured,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["verifiedDonations"]);
      Swal.fire("Success", "Donation feature status updated", "success");
    },
    onError: (error) => {
      console.error("Error updating feature status:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update feature status",
        "error"
      );
    },
  });

  const handleFeatureToggle = (donationId, isFeatured) => {
    const action = isFeatured ? "remove from Featured" : "add to Featured";

    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} this donation?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        featureMutation.mutate({ donationId, isFeatured: !isFeatured });
      }
    });
  };

  if (isLoading) return;
  <div className="h-screen flex justify-center items-center">
    <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
  </div>;

  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading donations: {error.message}
      </div>
    );

  if (!donations.length)
    return (
      <div className="text-center py-8">
        <Useable />
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Verified Donations</h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Donation Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feature
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={donation.image || "/default-donation.png"}
                    alt={donation.title}
                    className="h-12 w-12 rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-donation.png";
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {donation.donationTitle || "Untitled Donation"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.foodType || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {donation.restaurantName || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleFeatureToggle(donation._id, donation.isFeatured)
                    }
                    className={`p-2 rounded-md ${
                      donation.isFeatured
                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={donation.isFeatured ? "Unfeature" : "Feature"}
                  >
                    {donation.isFeatured ? <FaStar /> : <FaRegStar />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
