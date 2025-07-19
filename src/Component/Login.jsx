import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../LayOut/AuthContext";


const Login = () => {
  const [error, setError] = useState("");
  const [useremail, setUserEmail] = useState("");
  const { signIn, handleForgetPassword, handleGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = (e) => {

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then(() => {
          toast.success("Login successful!");
       toast.success("Login successful!");
        const redirectPath = location.state || "/";
        navigate(redirectPath);
        
      })
      .catch((error) => setError(error.code));
  };

  const handleForgotPasswordClick = () => {
    if (useremail) {
      handleForgetPassword(useremail)
        .then(() => toast.success("Password reset email sent!"))
        .catch((error) => setError("Error: " + error.message));
    }
  };

  return (
    <div className="login relative min-h-screen overflow-hidden bg-gradient-to-bl from-[#baebbe] to-white text-black ">
     
      <div className="absolute inset-0 z-0 bg-animated-grid">
        <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 opacity-20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-25%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 opacity-10 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute inset-0  backdrop-blur-sm"></div>
      </div>

    
      <div className="relative z-10 grid md:grid-cols-2 items-center min-h-screen px-8 py-12">
       
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.02 }}
          className="text-white text-center md:text-left"
        >
           <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="sm:my-6 text-4xl text-amber-600 font-bold mb-4"
          >
            Welcome to Lilo
          </motion.h1>
          <p className="login-p text-lg text-black max-w-sm mx-auto md:mx-0">
            Connect with freelancers. Get your tasks done quickly & easily. Log in to get started.
          </p>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 w-full max-w-md mx-auto backdrop-blur-md bg-[#0f0c29] rounded-xl p-8 text-white"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 mt-1 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="text-sm text-right">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="text-orange-300 cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
              {error && <p className="text-red-400 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md"
            >
              Login
            </button>

            <div className="flex items-center justify-center gap-2">
              <FcGoogle size={20} />
              <button
                type="button"
                onClick={handleGoogle}
                className=" cursor-pointer text-sm font-medium text-white"
              >
                Login with Google
              </button>
            </div>

            <p className="text-center text-sm mt-3 text-gray-300">
              New here?{" "}
              <Link to="/auth/register" className="text-orange-300 hover:underline">
                Register Now
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

     
    </div>
  );
};

export default Login;