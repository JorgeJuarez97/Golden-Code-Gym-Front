import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_DEPLOY}`,
});

export default clientAxios;

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};

export const configHeadersImg = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
};
