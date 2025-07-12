import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../LayOut/AuthContext";
import Update from "./Update";
import useAxios from "../../Hook/useAxios";
import AxiosSecure from "../../Hook/AxiosSecure";

const My_Donations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [editDonation, setEditDonation] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxios();
const axiossecure = AxiosSecure(); 

  useEffect(() => {
    if (!user?.email) return;

    axiossecure.get(`/resturant/donations?email=${encodeURIComponent(user.email)}`)

      .then((res) => setDonations(res.data))
      .catch(console.error);
  }, [user?.email]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
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
  };

  if (donations.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
        No donations added yet.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#5D4636",
          fontWeight: "700",
          marginBottom: "1.5rem",
        }}
      >
        📦 My Donations
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.5rem",
        }}
      >
        {donations.map((donation) => (
          <div
            key={donation._id}
            style={{
              backgroundColor: "#FFF8F0",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(212, 163, 115, 0.3)",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default",
            }}
          >
            <img
              src={donation.imageUrl}
              alt={donation.title}
              style={{
                width: "100%",
                height: 140,
                borderRadius: 8,
                objectFit: "cover",
                marginBottom: 12,
              }}
            />
            <h3
              style={{
                color: "#6B4F3A",
                fontWeight: "600",
                marginBottom: 6,
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              {donation.title}
            </h3>
            <p
              style={{
                margin: "4px 0",
                color: "#8B6E4A",
                fontWeight: "500",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>Food type:</strong> {donation.foodType}
            </p>
            <p
              style={{
                margin: "4px 0",
                color: "#8B6E4A",
                fontWeight: "500",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p
              style={{
                margin: "4px 0",
                color: "#8B6E4A",
                fontWeight: "500",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p
              style={{
                margin: "8px 0",
                fontWeight: "600",
                width: "100%",
                textAlign: "left",
              }}
            >
              <strong>Status: </strong>
              <span
                style={{
                  color:
                    donation.status === "Verified"
                      ? "#2E7D32"
                      : donation.status === "Rejected"
                      ? "#C62828"
                      : "#F9A825",
                  fontWeight: "700",
                }}
              >
                {donation.status}
              </span>
            </p>

            <div
              style={{
                marginTop: "auto",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              {donation.status !== "Rejected" && (
                <button
                  onClick={() => handleUpdate(donation)}
                  style={{
                    flex: 1,
                    backgroundColor: "#D4A373",
                    color: "#fff",
                    border: "none",
                    padding: "0.5rem 0",
                    borderRadius: 8,
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                style={{
                  flex: 1,
                  backgroundColor: "#E57373",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 0",
                  borderRadius: 8,
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editDonation && (
        <Update
          donation={editDonation}
          onClose={handleModalClose}
          onUpdated={handleDonationUpdated}
        />
      )}
    </div>
  );
};

export default My_Donations;
