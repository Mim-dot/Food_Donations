import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAxios from "../../Hook/useAxios";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import loadingAnimation from '../../assets/loadingAnimation.json'
import Lottie from "lottie-react";

const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const axiossecure = useAxiosSecure();
 useEffect(() => {
    document.title = "Manage Role Requests";
  }, []);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiossecure.get("/admin/charity-requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch requests", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const result = await axiosSecure.patch(`/admin/charity-requests/${id}`, {
        status: newStatus,
      });

      if (result.data.success) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );

        const action = newStatus.toLowerCase();
        let message = `Request ${action} successfully`;

        if (newStatus === "Approved") {
          const updatedRequest = requests.find((req) => req._id === id);
          if (updatedRequest) {
            message = `${updatedRequest.userEmail} is now a charity`;
          }
        }

        Swal.fire({
          title: "Success",
          text: message,
          icon: "success",
          timer: 2000,
        });
      }
    } catch (err) {
      console.error("Update error:", err);

      let errorMessage = "Failed to update request";
      if (err.response) {
        // Handle specific error cases
        if (err.response.status === 400) {
          errorMessage = err.response.data.message || "Invalid request";
        } else if (err.response.status === 403) {
          errorMessage = "Admin access required";
        } else if (err.response.status === 404) {
          errorMessage = err.response.data.message || "Request not found";
        } else {
          errorMessage = err.response.data.message || "Server error";
        }
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        timer: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  if (loading) return;
  <div className="h-screen flex justify-center items-center">
    <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
  </div>;
  return (
    <section>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
          Charity Role Requests
        </h2>

        <div className="w-full overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Organization
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Mission
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-sm text-gray-500"
                  >
                    No pending requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {req.userEmail}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {req.organizationName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                      {req.missionStatement}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {req.transactionId}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full 
                  ${
                    req.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : req.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      {req.status !== "Approved" && (
                        <button
                          onClick={() => updateStatus(req._id, "Approved")}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                      )}
                      {req.status !== "Rejected" && (
                        <button
                          onClick={() => updateStatus(req._id, "Rejected")}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageRoleRequests;
