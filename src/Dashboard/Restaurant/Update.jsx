import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxios from "../../Hook/useAxios";

const Update = ({ donation, onClose, onUpdated }) => {
  const { user } = useContext(AuthContext);
const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    donationTitle: "",
    foodType: "",
    quantity: "",
    createdAt: "",
    restaurantName: "",
    restaurantEmail: "",
    location: "",
    image: "",
    status: "Pending",
  });

  useEffect(() => {
    if (donation && user) {
      setFormData({
        donationTitle: donation.donationTitle || "",
        foodType: donation.foodType || "",
        quantity: donation.quantity || "",
        createdAt: donation.createdAt || "",
        restaurantName: user.displayName || "",
        restaurantEmail: user.email || "",
        location: donation.location || "",
        image: donation.image || "",
        status: donation.status || "Pending",
      });
    }
  }, [donation, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/donations/${donation._id}`, formData);
      Swal.fire("✅ Updated!", "Donation updated successfully.", "success");
      onUpdated({ ...formData, _id: donation._id });
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to update donation.", "error");
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 9999
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#FFF8F0",
          padding: "2rem",
          color: "#5D4639",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "420px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <h2 style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#5D4636",
          fontSize: "1.4rem",
          fontWeight: "bold"
        }}>🍱 Edit Your Donation</h2>

        {[
          { label: "Donation Title", name: "donationTitle", type: "text" },
          { label: "Food Type", name: "foodType", type: "text" },
          { label: "Quantity", name: "quantity", type: "text" },
          { label: "Pickup Time Window", name: "createdAt", type: "text", placeholder: "e.g., 10am - 2pm" },
          { label: "Location", name: "location", type: "text" },
          { label: "Image URL", name: "image", type: "url", placeholder: "https://example.com/image.jpg" },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              placeholder={field.placeholder || ""}
              style={{
                width: "100%",
                padding: "0.6rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "white",
                fontSize: "0.95rem"
              }}
            />
          </div>
        ))}

        {/* Readonly Fields */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Restaurant Name</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            readOnly
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
            }}
          />
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600 }}>Restaurant Email</label>
          <input
            type="email"
            name="restaurantEmail"
            value={formData.restaurantEmail}
            readOnly
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f5f5f5",
              cursor: "not-allowed",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#ccc",
              color: "#333",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#D4A373",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Update Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
