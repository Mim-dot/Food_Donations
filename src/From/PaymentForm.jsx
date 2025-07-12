import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../LayOut/AuthContext";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "../Hook/useAxios";
import AxiosSecure from "../Hook/AxiosSecure";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxios();
  const axiossecure = AxiosSecure();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [charityRequest, setCharityRequest] = useState(null);
  const amount = 25;
  const amountInCents = amount * 100;

  // Fetch charity request data when component mounts
  useEffect(() => {
    const fetchCharityRequest = async () => {
      try {
        const res = await axiossecure.get(`/charity/${id}`);
        setCharityRequest(res.data);
      } catch (err) {
        console.error("Failed to fetch charity request:", err);
        Swal.fire(
          "Error",
          "Failed to load charity request details. Please try again.",
          "error"
        ).then(() => navigate("/dashboard"));
      }
    };

    if (id) {
      fetchCharityRequest();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !id) return;

    setIsLoading(true);
    setError("");

    try {
      // Step 1: Create payment intent
      const paymentIntentRes = await axiosSecure.post(
        "http://localhost:7000/create-payment-intent",
        { amountInCents, id }
      );
      const clientSecret = paymentIntentRes.data.clientSecret;

      // Step 2: Confirm payment
      const card = elements.getElement(CardElement);
      if (!card) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // Step 3: Update charity request with payment info
        await axiosSecure.put(`/charity/payment/${id}`, {
          transactionId,
        });

        // Step 4: Record payment in payments collection
        await axiosSecure.post("/payments", {
          parcelId: id,
          email: user.email,
          amount,
          paymentMethod: result.paymentIntent.payment_method_types[0],
          transactionId,
        });

        // Success message
        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          html: `
            <p>Organization: ${charityRequest?.organizationName || "N/A"}</p>
            <p>Amount: $${amount}</p>
            <p><strong>Transaction ID:</strong> <code>${transactionId}</code></p>
          `,
          confirmButtonText: "View Requests",
        });

        navigate("/dashboard/transactions");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to process payment");
      Swal.fire(
        "Payment Failed",
        err.message || "There was an error processing your payment",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!charityRequest) {
    return <div className="text-center py-8">Loading payment details...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <div className="mb-6">
        <p className="font-semibold">
          Organization: {charityRequest.organizationName}
        </p>
        <p className="font-semibold">
          Mission: {charityRequest.missionStatement}
        </p>
        <p className="font-semibold mt-4">Amount to pay: ${amount}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border rounded" />
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className={`btn btn-primary w-full ${isLoading ? "opacity-75" : ""}`}
        >
          {isLoading ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
