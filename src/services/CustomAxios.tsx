import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "https://rickandmortyapi.com/api/",
});

CustomAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export { CustomAxios };