import React, { useEffect, useState } from "react";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Useable from "../../Useable";

const CharityRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const axiosSecure = useAxios();
  const axiossecure = useAxiosSecure();
  useEffect(() => {
    document.title = "Manage Request";
  }, []);
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axiossecure.get("/api/charity-requests");
      if (Array.isArray(res.data)) {
        setRequests(res.data);
      } else {
        setRequests([]);
      }
    } catch (err) {
      console.error("Failed to load requests", err);
      Swal.fire("Error", "Could not fetch charity requests", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the request permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/charity-requests/${id}`);
          setRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Request has been removed.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete request", "error");
        }
      }
    });
  };

  if (requests.length === 0) {
    return <Useable />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Charity Requests
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th style={thStyle}>Donation Title</th>
              <th style={thStyle}>Charity Name</th>
              <th style={thStyle}>Charity Email</th>
              <th style={thStyle}>Donation Title</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tdStyle}>{req.donationTitle || "N/A"}</td>
                <td style={tdStyle}>{req.charityName || "N/A"}</td>
                <td style={tdStyle}>{req.charityEmail || "N/A"}</td>
                <td style={tdStyle}>{req.donationTitle || "N/A"}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDelete(req._id)}
                    style={deleteBtnStyle}
                  >
                    Delete
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

const thStyle = {
  padding: "12px 15px",
  textAlign: "left",
  backgroundColor: "#444",
  color: "#fff",
};

const tdStyle = {
  padding: "12px 15px",
};

const deleteBtnStyle = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "4px",
  cursor: "pointer",
};

export default CharityRequestsTable;
