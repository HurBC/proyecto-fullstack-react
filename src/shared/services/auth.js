import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

const signup = (name, email, password) => {
  return axios.post(`${API_URL}/signup`, { name, email, password });
};

const signin = (email, password) => {
  return axios.post(`${API_URL}/signin`, { email, password });
};

const logout = () => {
  // Assuming the API has a logout endpoint
  // If not, this can be handled client-side by removing the token
  return axios.post(`${API_URL}/logout`);
};

export default {
  signup,
  signin,
  logout,
};
