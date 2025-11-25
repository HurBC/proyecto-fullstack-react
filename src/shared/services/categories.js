import api from "./api";

const getAllCategories = () => {
  return api.get("/categories");
};

const getCategoryById = (id) => {
  return api.get(`/categories/${id}`);
};

export default {
  getAllCategories,
  getCategoryById,
};
