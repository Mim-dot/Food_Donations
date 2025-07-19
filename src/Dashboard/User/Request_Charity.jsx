import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../LayOut/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import useAxios from "../../Hook/useAxios";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Request_Charity = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fixedAmount = 25;
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [requestExists, setRequestExists] = useState(false);
  const [newRequestId, setNewRequestId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const axiosSecure = useAxios();
  const axiossecure = useAxiosSecure();

  // Check for existing request when component mounts
  useEffect(() => {
    const checkExistingRequest = async () => {
      try {
        const res = await axiossecure.get(`/charity/check?email=${user.email}`);
        setRequestExists(res.data.exists);
      } catch (error) {
        console.error("Error checking existing request:", error);
        Swal.fire(
          "Error",
          "Could not check for existing requests. Please try again.",
          "error"
        );
      }
    };

    if (user?.email) {
      checkExistingRequest();
    }
  }, [user?.email]);

  const handlePay = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!orgName || !mission) {
      setIsLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all required fields.",
      });
    }

    try {
      const result = await Swal.fire({
        title: "Confirm Submission",
        text: `Submit your charity role request? You'll need to pay $${fixedAmount} to complete the process.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, submit",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) {
        setIsLoading(false);
        return;
      }

      const payload = {
        email: user.email,
        userName: user.displayName || user.name || "Unknown",
        organizationName: orgName.trim(),
        missionStatement: mission.trim(),
        transactionId: "pending",
        status: "Pending",
        payment_status: "unpaid",
        submittedAt: new Date(),
      };

      const res = await axiossecure.post("/charity", payload);

      if (res.data.insertedId) {
        Swal.fire({
          title: "Submitted!",
          text: "Now proceed to payment to complete your request.",
          icon: "success",
        });
        setNewRequestId(res.data.insertedId);
        setRequestExists(true);
      } else {
        Swal.fire("Error", "Failed to submit request. Try again.", "error");
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Something went wrong. Please try again.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (requestExists && !newRequestId) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-yellow-100 text-center rounded-lg">
        <h2 className="text-xl font-bold text-red-600">Already Requested</h2>
        <p>Your charity role request is already pending or approved.</p>
        <button
          onClick={() => navigate("/dashboard/transactions")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          View My Requests
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Request Charity Role
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-semibold">Organization Name*</label>
          <input
            type="text"
            required
            placeholder="Your Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={requestExists}
          />
        </div>
        <div>
          <label className="block font-semibold">Mission Statement*</label>
          <textarea
            required
            placeholder="Describe your mission..."
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            disabled={requestExists}
          />
        </div>
        <div>
          <label className="block font-semibold">Payment Amount</label>
          <input
            type="text"
            value={`$${fixedAmount} (Fixed)`}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {!requestExists ? (
          <button
            type="submit"
            className={`w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        ) : null}

        {newRequestId && (
          <button
            type="button"
            onClick={() => handlePay(newRequestId)}
            className="w-full bg-blue-600 mt-4 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Pay Now ${fixedAmount}
          </button>
        )}
      </form>
    </div>
  );
};

export default Request_Charity;
