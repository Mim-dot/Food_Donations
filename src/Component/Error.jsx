import React, { useEffect } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";
import error from "../assets/error.json";
const Error = () => {
  useEffect(() => {
    document.title = "ERROR";
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-[#7B4F28] font-[Comfortaa] px-4">
      <div className="max-w-md w-full">
        <Lottie animationData={error} loop={true} />
        <h1 className="text-3xl font-bold text-center mt-6">
          Oops!! Page Not Found
        </h1>
        <p className="text-center mt-2 text-sm text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            to="/"
            className="bg-[#D4A373] hover:bg-[#c68a59] text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
