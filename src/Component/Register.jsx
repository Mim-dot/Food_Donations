import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../LayOut/AuthContext";
import UploadToImgBB from "../Dashboard/UploadToImgBB";

import useAxios from "../Hook/useAxios";
import useAxiosSecure from "../Hook/useAxiosSecure";

const Register = () => {
  const { createUser, setUser, updateUser, handleGoogle } =
    useContext(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploaded = await UploadToImgBB(file);
    if (uploaded) {
      setPhotoURL(uploaded);
      toast.success("Photo uploaded!");
    } else {
      toast.error("Photo upload failed!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!hasCapitalLetter) {
      toast.error("Password must include at least one capital letter");
      return;
    }

    if (!hasSpecialChar) {
      toast.error("Password must include at least one special character");
      return;
    }
    if (!photoURL) {
      toast.error("Please upload a profile photo");
      return;
    }

    try {
      // 1. Create user in Firebase
      const result = await createUser(email, password);
      const user = result.user;

      // 2. Update Firebase profile
      await updateUser({ displayName: name, photoURL });

      // 3. Save user to your database
      const newUser = {
        name,
        email,
        photoURL,
        uid: user.uid,
        role: "user",
        createdAt: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosSecure.post("/users", newUser);
      //console.log("User saved to DB:", saveResult.data);
      toast.success("Registration successful!");
      form.reset();
      navigate(from);
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.code);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered. Please login.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else {
        toast.error("Registration failed: " + error.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    handleGoogle()
      .then(async (result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          role: "user",
          createdAt: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // ✅ Try to save user only if they don’t already exist
        try {
          await axiosSecure.post("/users", newUser);
          console.log("✅ Google user saved to DB");
        } catch (error) {
          console.error("❌ Failed to save Google user:", error.message);
          // Optional: handle if user already exists
        }

        setUser(user);
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google login failed:", error);
        toast.error("Google login failed: " + error.message);
      });
  };

  return (
    <motion.div
      className="reg relative min-h-screen overflow-hidden bg-white dark:bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-30 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/70 dark:from-black/70 dark:to-black/70" />
      </div>

      {/* Main Section */}
      <div className="relative z-10 grid md:grid-cols-2 items-center min-h-screen px-8 py-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="sm:my-6 text-center md:text-left text-black dark:text-white"
        >
          <h1 className="text-4xl font-bold mb-3">Join ShareBite</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-sm mx-auto md:mx-0">
            Create your account to connect with the community and make a
            difference.
          </p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full mt-8 max-w-md mx-auto bg-[#F5EFE6] border border-[#E0D6CC] rounded-xl p-8 text-[#5C3B1D]"
        >
          <form onSubmit={handleRegister} className="space-y-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-semibold text-center text-[#7B4F28]"
            >
              Register
            </motion.h2>

            {error === "auth/email-already-in-use" && (
              <p className="text-sm text-red-600 text-center">
                Email already registered.{" "}
                <Link to="/auth/login" className="underline text-[#7B4F28]">
                  Login here
                </Link>
              </p>
            )}

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-[#7B4F28]">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="input-style border border-[#E0D6CC] text-[#5C3B1D] placeholder-[#a98b6a] focus:ring-2 focus:ring-[#7B4F28]"
                required
                onChange={() => setError("")}
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-[#7B4F28]">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="input-style border border-[#E0D6CC] text-[#5C3B1D] placeholder-[#a98b6a] focus:ring-2 focus:ring-[#7B4F28]"
                required
                onChange={() => setError("")}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-[#7B4F28]">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="input-style border border-[#E0D6CC] text-[#5C3B1D] placeholder-[#a98b6a] focus:ring-2 focus:ring-[#7B4F28]"
                required
                onChange={() => setError("")}
              />
            </motion.div>

            {/* Upload Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-[#7B4F28]">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="input-style border border-[#E0D6CC] text-[#5C3B1D]"
                required
              />
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Preview"
                  className="w-20 h-20 mt-2 rounded-full border-2 border-[#7B4F28]"
                />
              )}
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 cursor-pointer bg-[#7B4F28] hover:bg-[#5C3B1D] text-white font-semibold rounded-md transition"
            >
              Register
            </motion.button>

            {/* Google Auth */}
            <motion.div
              className="flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={20} />
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="text-sm text-[#7B4F28]"
              >
                Register with Google
              </button>
            </motion.div>

            {/* Already have an account */}
            <motion.p
              className="text-center text-sm mt-3 text-[#5C3B1D]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Already have an account?{" "}
              <Link to="/auth/login" className="text-[#7B4F28] hover:underline">
                Login
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
