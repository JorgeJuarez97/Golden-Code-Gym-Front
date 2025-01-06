import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_DEPLOY}`,
});

export default clientAxios;

clientAxios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${
      JSON.parse(sessionStorage.getItem("token")) || ""
    }`,
  },
};

export const configHeadersImg = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${
      JSON.parse(sessionStorage.getItem("token")) || ""
    }`,
  },
};
