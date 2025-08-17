import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import loadingAnimation from "../../assets/loadingAnimation.json";
import Lottie from "lottie-react";

const Transaction_History = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiossecure = useAxiosSecure();
  useEffect(() => {
    document.title = "Transaction_History";
  }, []);
  useEffect(() => {
    if (!user?.email) return;

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiossecure.get(
          `/transactions?email=${encodeURIComponent(user.email)}`
        );

        setTransactions(response.data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError(err.response?.data?.message || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 nav border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto">
          <p className="font-medium">Error loading transactions</p>
          <p className="mt-2 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className=" nav-bite text-2xl font-bold mb-6">Transaction History</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-8 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            No transactions found for your account.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full  bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Organization</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="hover:bg-gray-50  nav-bite transition-colors"
                >
                  <td className="py-3 px-4">
                    <code className="text-sm bg-gray-100 p-1 rounded break-all">
                      {tx.transactionId}
                    </code>
                  </td>
                  <td className="py-3 px-4">
                    {tx.charityRequest?.organizationName || "N/A"}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tx.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : tx.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transaction_History;
