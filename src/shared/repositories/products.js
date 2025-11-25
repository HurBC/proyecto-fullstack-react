import gamesService from "../services/games";
import categoriesService from "../services/categories";

const getAllProducts = async () => {
  const response = await gamesService.getAllGames();
  return response.data;
};

const getProductById = async (id) => {
  const response = await gamesService.getGameById(id);
  return response.data;
};

const getFeaturedProducts = async () => {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.featured);
};

const getAllCategories = async () => {
  const response = await categoriesService.getAllCategories();
  return response.data;
};

const getProductsByCategory = async (categoryName) => {
  const allProducts = await getAllProducts();
  if (!categoryName) {
    return allProducts;
  }
  return allProducts.filter(
    (product) =>
      product.categories &&
      product.categories.some((cat) => cat.name === categoryName)
  );
};

const ProductsRepo = {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getAllCategories,
  getProductsByCategory,
};

export default ProductsRepo;
