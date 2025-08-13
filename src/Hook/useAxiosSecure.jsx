// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../LayOut/AuthContext";

// const useAxiosSecure = () => {
//   const { user } = useContext(AuthContext);
//   //console.log("user in useAxiosSecure:", user);

//   const axiosInstance = axios.create({
//     baseURL: "https://my-final-project-server.vercel.app",
//   });

//   axiosInstance.interceptors.request.use((config) => {
//     const token = user?.accessToken || localStorage.getItem("access-token");
//     if (token) {

//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

//   return axiosInstance;
// };

// export default useAxiosSecure;
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../LayOut/AuthContext";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "https://my-final-project-server.vercel.app",
  });

  axiosInstance.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      //console.log("Using token from context", user.accessToken);
    }
    return config;
  });

  return axiosInstance;
};

export default useAxiosSecure;
