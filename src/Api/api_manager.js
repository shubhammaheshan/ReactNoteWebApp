import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const services = {
  getAll: function (data) {
    return axiosInstance.request({
      method: "GET",
      url: data?.url,
    });
  },
  deleteById: function (data) {
    return axiosInstance.request({
      method: "DELETE",
      url: data?.url + data?.id,
    });
  },
  addNote: function (data) {
    return axiosInstance.request({
      method: "POST",
      url: data?.url,
      data: data?.note,
    });
  },
  updateNote: function (data) {
    return axiosInstance.request({
      method: "PUT",
      url: data?.url + data?.id,
      data: data?.note,
    });
  },
};
