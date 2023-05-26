import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:9090/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // redirect the user to the login page
      console.log("executed");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
