import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const services = {
  getAll: function () {
    return axiosInstance.request({
      method: "GET",
      url: `/todo`,
    });
  },
  deleteById: function (id) {
    return axiosInstance.request({
      method: "DELETE",
      url: `/todo/${id}`,
    });
  },
  addNote: function (data) {
    return axiosInstance.request({
      method: "POST",
      url: `/todo`,
      data,
    });
  },
};
