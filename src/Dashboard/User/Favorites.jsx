import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router"; 
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../LayOut/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";     
import "react-toastify/dist/ReactToastify.css";
import loadingAnimation from '../../assets/loadingAnimation.json'
import Lottie from "lottie-react";
import Useable from "../../Useable";

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
useEffect(() => {
    document.title = "Favorites";
  }, []);
  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const { data: favs } = await axiosSecure.get(
          `/favorites?userEmail=${encodeURIComponent(user.email)}`
        );

        const donations = await Promise.all(
          favs.map((fav) =>
            axiosSecure.get(`/donations/${fav.donationId}`).then((res) => res.data)
          )
        );

        const combined = favs.map((fav, idx) => ({
          ...fav,
          donation: donations[idx],
        }));

        setFavorites(combined);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, axiosSecure]);

  const handleRemove = async (favoriteId) => {
    // Use SweetAlert2 confirmation dialog instead of window.confirm
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this favorite?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      setRemovingId(favoriteId);
      try {
        await axiosSecure.delete(`/favorites/${favoriteId}`);
        setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
        toast.success("Removed from favorites");
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove favorite");
      } finally {
        setRemovingId(null);
      }
    }
  };

  if (loading)
    return 
(
  <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
)
  if (favorites.length === 0)
    return (
      <p className="text-center mt-10 text-gray-600">
       <Useable/>
      </p>
    );

  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {favorites.map((fav) => {
          const d = fav.donation || {};
          return (
            <div
              key={fav._id}
              className="bg-white rounded shadow p-4 flex flex-col"
            >
              <img
                src={d.image || "/default-donation.jpg"}
                alt={d.donationTitle || "Donation Image"}
                className="h-48 w-full object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4 text-[#7B4F28]">
                {d.donationTitle || "Untitled"}
              </h3>
              <p className="mt-1 text-gray-700">
                <strong>Restaurant:</strong> {d.restaurantName || "Unknown"}, {d.location || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {d.status || "Unknown"}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Quantity:</strong> {d.quantity || "Unknown"}
              </p>

              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/donations/${d._id}`}
                  className="px-4 py-2 bg-[#7B4F28] text-white rounded hover:bg-[#5c3b1d] text-center"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleRemove(fav._id)}
                  disabled={removingId === fav._id}
                  className="px-4 py-2 border border-red-500 text-red-600 rounded hover:bg-red-600 hover:text-white disabled:opacity-50"
                >
                  {removingId === fav._id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </>
  );
};

export default Favorites;
