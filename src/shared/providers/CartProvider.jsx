import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ProductsRepo from "../repositories/products";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const rawItems = localStorage.getItem("cart_items");
      return rawItems ? JSON.parse(rawItems) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage:", e);
      return [];
    }
  });

  const [hydratedCartItems, setHydratedCartItems] = useState([]);

  useEffect(() => {
    const hydrateCart = async () => {
      const detailedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await ProductsRepo.getProductById(item.id);
          return { ...product, quantity: item.quantity };
        })
      );
      setHydratedCartItems(detailedItems);
    };

    hydrateCart();
  }, [cartItems]);

  const updateItemQuantity = useCallback((id, quantity) => {
    if (!id) return;

    setCartItems((prev) => {
      const currentItems = [...prev];
      const item = currentItems.find((p) => p.id === id);

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          return currentItems.filter((p) => p.id !== id);
        }
      }
      return currentItems;
    });
  }, []);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product || !product.id) return;

    setCartItems((prev) => {
      const currentItems = [...prev];
      const item = currentItems.find((p) => p.id === product.id);

      if (item) {
        item.quantity = (item.quantity || 0) + quantity;
      } else {
        currentItems.push({ id: product.id, quantity });
      }

      return currentItems;
    });
  }, []);

  const removeItem = useCallback((productId) => {
    if (!productId) return;
    setCartItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error writing cart to localStorage:", e);
    }
  }, [cartItems]);

  const cartValue = {
    items: hydratedCartItems,
    totalPrice: hydratedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    addItem,
    removeItem,
    clearCart,
    updateItemQuantity,
  };

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
