import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

  const updateItemQuantity = useCallback((code, quantity) => {
    if (!code) return;

    setCartItems((prev) => {
      const currentItems = [...prev];

      const item = currentItems.find((p) => p.code === code);

      if (item) {
        item.quantity = quantity;
      } else {
        currentItems.push({ ...product, quantity });
      }

      return currentItems;
    });
  }, []);

  const addItem = useCallback((product, quantity = 1) => {
    if (!product || !product.code) return;
    setCartItems((prev) => {
      const currentItems = [...prev];
      const item = currentItems.find((p) => p.code === product.code);
      if (item) {
        item.quantity = (item.quantity || 0) + quantity;
      } else {
        currentItems.push({ ...product, quantity });
      }
      return currentItems;
    });
  }, []);

  const removeItem = useCallback((productCode) => {
    if (!productCode) return;
    setCartItems((prev) => prev.filter((p) => p.code !== productCode));
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
    items: cartItems,
    totalPrice: cartItems.reduce(
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
