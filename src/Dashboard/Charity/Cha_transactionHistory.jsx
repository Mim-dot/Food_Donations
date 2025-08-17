import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Useable from "../../Useable";
const Cha_transactionHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axiosSecure.get(
          `/transactions?email=${encodeURIComponent(user.email)}`
        );
        setTransactions(res.data);
      } catch (error) {
        console.error("Failed to load charity transactions:", error);
      }
    };

    if (user?.email) {
      fetchTransactions();
    }
  }, [user, axiosSecure]);

  return (
    <div className="p-4">
      <h2 className=" nav-bite text-2xl font-semibold mb-4">
        Charity Role Transaction History
      </h2>
      {transactions.length === 0 ? (
        <Useable />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Amount Paid</th>
                <th className="py-2 px-4 border">Request Date</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td className="py-2 nav-bite px-4 border">
                    {tx.transactionId}
                  </td>
                  <td className="py-2 nav-bite px-4 border">${tx.amount}</td>
                  <td className="py-2 nav-bite px-4 border">
                    {tx?.charityRequest?.paid_at
                      ? new Date(tx.charityRequest.paid_at).toLocaleString()
                      : "N/A"}
                  </td>

                  <td className="py-2 nav-bite px-4 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        tx.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : tx.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
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

export default Cha_transactionHistory;
