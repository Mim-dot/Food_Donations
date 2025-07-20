import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../LayOut/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import loadingAnimation from "../../assets/loadingAnimation.json";
import Lottie from "lottie-react";

const ProfileDes = () => {
  const { user: authUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiossecure = useAxiosSecure();
useEffect(() => {
    document.title = "Profile";
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser) {
        try {
          // Fetch additional user data from MongoDB
          const response = await axiossecure.get(`/api/users/${authUser.uid}`);
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to just auth data if MongoDB fetch fails
          setUserData({
            ...authUser,
            role: "user",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [authUser]);
  //console.log("User from AuthContext:", user);

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#5C3B1D]">Please log in to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={loadingAnimation} loop={true} className="w-48" />
      </div>
    );
  }

  // Merge auth user data with MongoDB data
  const user = {
    ...authUser,
    ...userData,
  };
 // console.log("User from AuthContext:", user);

  return (
    <div className="profile-container flex flex-col items-center gap-4 p-6 rounded-xl bg-[#FAEDCD] max-w-md mx-auto">
      <div className="profile-header flex flex-col items-center">
        <img
          className="w-24 h-24 rounded-full ring-4 ring-[#D4A373] hover:ring-[#b97b42] transition-all duration-300 mb-3"
          src={
            user.photoURL ||
            "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
          }
          alt={user.displayName || "User"}
        />
        <h2 className="text-xl font-extrabold text-[#7B4F28]">
          {user.displayName || "User"}
        </h2>
        <p className="text-sm text-[#5C3B1D] text-center break-words max-w-xs">
          {user.email}
        </p>
        <div className="role-badge mt-2 px-3 py-1 bg-[#D4A373] text-white text-xs font-semibold rounded-full capitalize">
          {user.role || ""}
        </div>
      </div>
    </div>
  );
};

export default ProfileDes;
