import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/games";

const getAllGames = () => {
  return axios.get(API_URL);
};

const getGameById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default {
  getAllGames,
  getGameById,
};
