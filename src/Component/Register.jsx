import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../LayOut/AuthContext";

const Register = () => {
  const { createUser, setUser, updateUser, handleGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must have at least one uppercase, one lowercase letter, and be 6+ characters.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const newUser = { uid: user.uid, email: user.email };

        fetch("https://assi-10-psi.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });

        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
         
          navigate("/");
         toast.success("Registered successfully!");
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
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-30 rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className=" absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-white/70 dark:from-black/70 dark:to-black/70" />
      </div>

      {/* Main Form Section */}
      <div className=" relative z-10 grid md:grid-cols-2 items-center min-h-screen px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="sm:my-6 text-center md:text-left text-black dark:text-white"
        >
          <h1 className=" text-4xl font-bold mb-3">Join Lilo</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-sm mx-auto md:mx-0">
            Create your account to connect with Knowledge Sharing Platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full mt-8 max-w-md mx-auto backdrop-blur-md  bg-white/10 border border-white/30 rounded-xl p-8 text-black dark:text-white"
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

            {["name", "photo", "email", "password"].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              >
                <label className="block text-sm font-medium capitalize">{field === "photo" ? "Photo URL" : field}</label>
                <input
                  name={field}
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  className="input-style"
                  placeholder={field === "photo" ? "Photo URL" : field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                />
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
            >
              Register
            </motion.button>

            <motion.div
              className="flex text-black items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle size={20} />
              <button type="button" onClick={handleGoogleLogin} className="text-sm cursor-pointer dark:text-white">
                Register with Google
              </button>
            </motion.div>

            <motion.p
              className="motion-p text-center text-sm mt-3 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Already have an account?{" "}
              <Link to="/auth/login" className="text-orange-400 hover:underline">
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