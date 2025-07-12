
import axios from 'axios';
import React from 'react';
const axiossecure = axios.create({
    baseURL :`http://localhost:7000`
})
const AxiosSecure = () => {
    return axiossecure
};

export default AxiosSecure;