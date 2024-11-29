import { ComponentType, ReactNode } from "react";
import { MainLayout } from "@/layouts/mainLayout";
import { Home } from "@/pages/home";
import { ProductDetail } from "@/pages/detail";
import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import Checkout from "@/pages/checkout";
import VnPayReturn from "@/pages/vnpay-return";
import History from "@/pages/history";
import Products from "@/pages/products";
import ForgotPassword from "@/pages/forgot-password";
import OrderDetail from "@/pages/order-detail";

interface IRouteChildren {
  path: string;
  component: ComponentType | (() => JSX.Element | Response);
}

interface IRoute {
  layout: ComponentType<{ children: ReactNode }>;
  children: IRouteChildren[];
}

const publicRoutes: IRoute = {
  layout: MainLayout,
  children: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/product/:id",
      component: ProductDetail,
    },
    {
      path: "/account/login",
      component: Login,
    },
    {
      path: "/account/register",
      component: Register,
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/checkout",
      component: Checkout,
    },
    {
      path: "/vnpay-return",
      component: VnPayReturn,
    },
    {
      path: "/order/history",
      component: History,
    },
    {
      path: "/order/history/:id",
      component: OrderDetail,
    },
    {
      path: "/new-arrival",
      component: Products,
    },
  ],
};

export default publicRoutes;
