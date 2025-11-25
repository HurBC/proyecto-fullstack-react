import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/categories";

const getAllCategories = () => {
  return axios.get(API_URL);
};

const getCategoryById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default {
  getAllCategories,
  getCategoryById,
};
