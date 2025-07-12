import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../LayOut/AuthContext";
import UploadToImgBB from "../Dashboard/UploadToImgBB";
import axios from "axios";
import useAxios from "../Hook/useAxios";

const Register = () => {
  const { createUser, setUser, updateUser, handleGoogle } =
    useContext(AuthContext);
  const axiosSecure = useAxios();

  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);

    const uploaded = await UploadToImgBB(file);
    if (uploaded) {
      setPhotoURL(uploaded);
      toast.success("Photo uploaded!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must include uppercase, lowercase and 6+ characters.");
      return;
    }

    if (!photoURL) {
      toast.error("Please upload a profile photo.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL }).then(() => {
          setUser({ ...user, displayName: name, photoURL });

          // ✅ Add user to your database
          const newUser = {
            name,
            email,
            photoURL,
            role: "User", // fixed role
          };

          axiosSecure
            .post("/users", newUser)
            .then(() => {
              toast.success("Registered and added to database!");
              form.reset();
              navigate(from);
            })
            .catch((err) => {
              toast.error("Failed to save user in DB: " + err.message);
            });
        });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    handleGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => toast.error("Google login failed: " + error.message));
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
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="sm:my-6 text-center md:text-left text-black dark:text-white"
        >
          <h1 className="text-4xl font-bold mb-3">Join</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-sm mx-auto md:mx-0">
            Create your account to connect with the Knowledge Sharing Platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full mt-8 max-w-md mx-auto backdrop-blur-md bg-white/10 border border-white/30 rounded-xl p-8 text-black dark:text-white"
        >
          <form onSubmit={handleRegister} className="space-y-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-semibold text-center"
            >
              Register
            </motion.h2>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium">Name</label>
              <input name="name" type="text" className="input-style" required />
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                className="input-style"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                className="input-style"
                required
              />
            </motion.div>

            {/* Upload Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium">
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="input-style"
                required
              />
              {photoURL && (
                <img
                  src={photoURL}
                  alt="Preview"
                  className="w-20 h-20 mt-2 rounded-full border-2 border-orange-400"
                />
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Register
            </motion.button>

            {/* Google Button */}
            <motion.div
              className="flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={20} />
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="text-sm dark:text-white"
              >
                Register with Google
              </button>
            </motion.div>

            <motion.p
              className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-orange-400 hover:underline"
              >
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
