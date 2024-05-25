import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseURL = "http://localhost:8077";

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message,
    );
    return Promise.reject(error);
  },
);

export default axiosClient;

interface RequestConfig {
  url: string;
  body?: any;
  params?: any;
}

export const getRequest = async ({ url, params }: RequestConfig) => {
  try {
    const response = await axiosClient.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async ({ url, body }: RequestConfig) => {
  try {
    const response = await axiosClient.post(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async ({ url, body }: RequestConfig) => {
  try {
    const response = await axiosClient.put(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const patchRequest = async ({ url, body }: RequestConfig) => {
  try {
    const response = await axiosClient.patch(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async ({ url }: RequestConfig) => {
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
