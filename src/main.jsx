import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { router } from "./shared/routes/index.jsx";
import { CartProvider } from "./shared/providers/CartProvider.jsx";
import { AuthProvider } from "./shared/providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
