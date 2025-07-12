import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `http://localhost:7000`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;