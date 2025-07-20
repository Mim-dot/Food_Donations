import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxios from "../../Hook/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import loadingAnimation from '../../assets/loadingAnimation.json'
import Lottie from "lottie-react";
import Useable from "../../Useable";

const My_Reviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
 useEffect(() => {
    document.title = "My_Reviews";
  }, []);
  useEffect(() => {
    if (!user?.email) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(
          `/api/reviews?userEmail=${user.email}`
        );
        console.log("Fetched reviews:", response.data);
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews([]);
        }
      } catch {
        toast.error("Failed to load your reviews.");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, axiosSecure]);

  const handleDelete = async (reviewId) => {
  console.log("Delete requested for reviewId:", reviewId);
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const response = await axiosSecure.delete(`/api/reviews/${reviewId}`);
      console.log("Full response:", response);
      
      if (response.data?.deletedId) {
        setReviews(prev => prev.filter(r => r._id !== reviewId));
        toast.success("Review deleted successfully");
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.error || "Failed to delete review");
    }
  }
};
  if (loading)
    return (
     <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );

  if (!reviews.length)
    return (
      <div >
       <Useable/>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "0 16px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <AnimatePresence>
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
              cursor: "default",
              userSelect: "none",
            }}
          >
            <h3
              style={{
                marginBottom: 8,
                color: "#222",
                fontWeight: "700",
                fontSize: 22,
                textTransform: "capitalize",
              }}
            >
              {review.donationInfo?.donationTitle || "No title"}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#555",
                marginBottom: 6,
                fontWeight: "600",
              }}
            >
              <strong>Restaurant:</strong>{" "}
              {review.donationInfo?.restaurantName || "Unknown"}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#777",
                marginBottom: 16,
                fontStyle: "italic",
              }}
            >
              <strong>Reviewed on:</strong>{" "}
              {new Date(review.createdAt).toLocaleString()}
            </p>
            <p
              style={{
                fontSize: 16,
                color: "#333",
                marginBottom: 20,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
              }}
            >
              {review.description}
            </p>

            <motion.button
              type="button"
              onClick={() => handleDelete(review._id)}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 4px 10px rgba(231, 76, 60, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "600",
                letterSpacing: 0.5,
                userSelect: "none",
                boxShadow: "0 2px 8px rgba(231, 76, 60, 0.4)",
                transition: "background-color 0.3s ease",
              }}
            >
              Delete Review
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default My_Reviews;
