import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://my-final-project-server.vercel.app`,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
