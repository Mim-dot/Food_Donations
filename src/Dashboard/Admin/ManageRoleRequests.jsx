import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageRoleRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/api/charity-role-requests");
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

  // Update status handler
  const updateStatus = async (id, newStatus) => {
    try {
      // Optionally, call backend API to update status
      await axios.patch(`/api/charity-role-requests/${id}`, { status: newStatus });

      // Update UI
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status: newStatus } : req))
      );

      Swal.fire("Success", `Request ${newStatus.toLowerCase()} successfully.`, "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", `Failed to update status to ${newStatus}`, "error");
    }
  };

  if (loading) return <p>Loading requests...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Charity Role Requests</h2>
      <table className="min-w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">User Email</th>
            <th className="border px-4 py-2">Organization Name</th>
            <th className="border px-4 py-2">Mission Statement</th>
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4">
                No requests found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req._id} className="even:bg-gray-50">
                <td className="border px-4 py-2">{req.userName}</td>
                <td className="border px-4 py-2">{req.userEmail}</td>
                <td className="border px-4 py-2">{req.organizationName}</td>
                <td className="border px-4 py-2 max-w-xs truncate" title={req.mission}>
                  {req.mission}
                </td>
                <td className="border px-4 py-2">{req.transactionId}</td>
                <td className="border px-4 py-2 font-semibold">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      req.status === "Approved"
                        ? "bg-green-600"
                        : req.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    disabled={req.status === "Approved"}
                    onClick={() => updateStatus(req._id, "Approved")}
                    className={`px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50`}
                  >
                    Approve
                  </button>
                  <button
                    disabled={req.status === "Rejected"}
                    onClick={() => updateStatus(req._id, "Rejected")}
                    className={`px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50`}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRoleRequests;
