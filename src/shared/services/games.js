import api from "./api";

const getAllGames = () => {
  return api.get("/games");
};

const getGameById = (id) => {
  return api.get(`/games/${id}`);
};

export default {
  getAllGames,
  getGameById,
};
