import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { STORAGE } from "@/utils/storage";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.100:3000"
    : // ? "http://10.0.2.2:3000"
      "http://localhost:3000"; // iOS simulator

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await STORAGE.getData("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

// Generic API client function
export const apiClient = {
  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  },

  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.get(url, config);
    return response.data;
  },

  put: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  },

  patch: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.patch(
      url,
      data,
      config
    );
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
    return response.data;
  },
  upload: async <T>(
    url: string,
    formData: FormData,
    method: "post" | "patch" | "put" = "patch"
  ): Promise<T> => {
    const response: AxiosResponse<T> = await axiosInstance({
      method,
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
