import axios from 'axios';
import React from 'react';
const axiossecure = axios.create({
    baseURL :`https://my-final-project-server.vercel.app`
})
const AxiosSecure = () => {
    return axiossecure
};

export default AxiosSecure;