import { createBrowserRouter } from "react-router-dom";
import HomeModule from "../../modules/home/Home.module";
import LoginModule from "../../modules/login/Login.module";
import ProductsModule from "../../modules/products/Products.module";
import App from "../../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomeModule />,
      },
      {
        path: "/login",
        element: <LoginModule />,
      },
      {
        path: "/products",
        element: <ProductsModule />,
      },
      {
        path: "/about-us",
        element: <ProductsModule />,
      },
      {
        path: "/blogs",
        element: <ProductsModule />,
      },
      {
        path: "/contact",
        element: <ProductsModule />,
      },
      {
        path: "*",
        element: <h2>Not Found</h2>,
      },
    ],
  },
]);
