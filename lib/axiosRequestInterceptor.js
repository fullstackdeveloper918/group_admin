import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
// import { useRouter } from "next/router"; // Import useRouter for redirection

// Axios instance with request interceptor
export const axiosInstance = axios.create({
  baseURL: "https://magshopify.goaideme.com", // Set the base endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("res",response)
    if (response?.status === 401 || response?.data.message === "Unauthorized") {
      Cookies.remove("token"); 
      redirect("/"); 
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.data.message === "Unauthorized") {
      Cookies.remove("token"); 
      redirect("/"); 
    }
    return Promise.reject(error);
  }
);
