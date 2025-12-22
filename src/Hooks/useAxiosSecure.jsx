import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://b12-a11-server-bookcourier.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !user) return;

    // request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/signin");
        }
        return Promise.reject(error);
      }
    );

    // cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
