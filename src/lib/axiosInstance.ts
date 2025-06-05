// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "/api",
//   headers: {
//     "Content-Type": "application/json",
//     // Authorization: `Bearer ${token}` // Auth token लागल्यास
//   },
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // All requests will use `/api/...`
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Cookie-based auth (optional)
});

// ✅ Request interceptor (e.g., for auth tokens)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from cookie, zustand, etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (for global error handling/logging)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Log, redirect, show toast, etc.
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
