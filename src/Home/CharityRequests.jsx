import React, { useEffect, useState, useContext } from "react";
import useAxios from "../Hook/useAxios";
import { AuthContext } from "../LayOut/AuthContext";

const CharityRequests = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    // console.log("useEffect running in CharityRequests");
    axiosSecure
      .get("/api/charity-requests/latest")
      .then((res) => setRequests(res.data.slice(0, 3)))
      .catch((err) => console.error("Error loading charity requests:", err));
  }, [axiosSecure]);

  return (
    <section className="py-12 px-4 nav bg-[#fff9f2]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#7B4F28]">
          🍀 Latest Charity Requests
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {requests.map((req, idx) => (
            <div
              key={idx}
              className="bg-[#F5EFE6] nav  border border-[#E0D6CC] rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <h3 className="nav-bite text-lg font-semibold text-[#7B4F28]">
                  {req.organizationName}
                </h3>
              </div>
              <p className="nav-bite text-sm text-[#5C3B1D] mb-3 line-clamp-3 italic">
                {req.missionStatement}
              </p>
              <div className="nav-bite text-xs text-[#5C3B1D] opacity-80">
                Submitted: {new Date(req.submittedAt).toLocaleDateString()}
              </div>
              <div className="nav-bite text-sm font-medium mt-3 text-[#7B4F28]">
                🍽️ Organization Name:{" "}
                <span className="font-bold"> {req.organizationName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharityRequests;
