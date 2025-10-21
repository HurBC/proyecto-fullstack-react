import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import HomeModule from "../../modules/home/Home.module";
import LoginModule from "../../modules/login/Login.module";
import RegisterModule from "../../modules/login/Register.module";
import ProductsModule from "../../modules/products/Products.module";
import Cart from "../../modules/cart/Cart.module";
import ProductDetail from "../../modules/products/modules/ProductDetail.module";
import ProductCategoryModule from "../../modules/products/modules/ProductCategory.module";
import AboutUsModule from "../../modules/about_us/AboutUs.module";
import PaymentPageModule from "../../modules/payment/Payment.module";
import PaymentSuccessModule from "../../modules/payment/modules/PaymentSuccess";
import PaymentFailureModule from "../../modules/payment/modules/PaymentFailure";
import ContactModule from "../../modules/contact/Contact.module";

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
        path: "/register",
        element: <RegisterModule />,
      },
      {
        path: "/products",
        element: <ProductsModule />,
      },
      {
        path: "/products/:code",
        element: <ProductDetail />,
      },
      {
        path: "/products/categories/:category",
        element: <ProductCategoryModule />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about-us",
        element: <AboutUsModule />,
      },
      {
        path: "/payment",
        element: <PaymentPageModule />,
      },
      {
        path: "/payment/success",
        element: <PaymentSuccessModule />,
      },
      {
        path: "/payment/failure",
        element: <PaymentFailureModule />,
      },
      {
        path: "/contact",
        element: <ContactModule />,
      },
      {
        path: "*",
        element: (
          <h2
            style={{
              padding: "4rem",
              textAlign: "center",
              color: "var(--color-text-main)",
            }}
          >
            404 - Página No Encontrada
          </h2>
        ),
      },
    ],
  },
]);
