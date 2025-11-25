import api from "./api";

const signup = (name, email, password) => {
  return api.post("/auth/signup", { name, email, password });
};

const signin = (email, password) => {
  return api.post("/auth/signin", { email, password });
};

const logout = () => {
  // Assuming the API has a logout endpoint
  // If not, this can be handled client-side by removing the token
  return api.post("/auth/logout");
};

export default {
  signup,
  signin,
  logout,
};
