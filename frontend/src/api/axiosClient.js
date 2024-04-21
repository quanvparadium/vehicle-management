import Cookies from "js-cookie";

import axios from "axios";
import { BACKEND_URL } from "../config";

const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        // Authorization: `Bearer ${Cookies.get("token")}`,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYwYWY5YzQzY2M3YTAwOWI3NmVlZDg1IiwidG9rZW5UeXBlIjowLCJpYXQiOjE3MTM3MTk0MzUsImV4cCI6MTcxMzgwNTgzNX0.2F9cY3z8BSQ8d4BYPGwAItwUy4cRUZFcjrWtchBtizs`,
    },
});

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data; //bỏ header, config
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
