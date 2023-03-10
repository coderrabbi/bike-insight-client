import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import DashboardLayout from "../components/Layout/DashboardLayout";
import PrivetRouter from "./PrivetRouter/PrivetRouter";
import Main from "../components/Layout/Main";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import Bikes from "../Pages/BIkes/Bikes";
import MyOrders from "../components/Dadhboard/MyOrders/MyOrders";
import Dashboard from "../components/Dadhboard/Dashboard";
import AllUsers from "../components/Dadhboard/AllUsers/Allusers";
import AddProducts from "../components/Dadhboard/AddProducts/AddProducts";
import AdminRoute from "./AdminRoute/AdminRoute";
import SellerRoute from "./AdminRoute/SellerRoute";
import MyProducts from "../components/Dadhboard/MyProducts/MyProducts";
import AllProducts from "../components/Dadhboard/AllProducts/AllProducts";
import Payment from "../components/Dadhboard/MyProducts/Payment/Payment";
import AdvertiseProduct from "../components/AdvertiseProduct/AdvertiseProduct";
import Profile from "../Pages/Profile/Profile";
import Blog from "../Pages/Blog/Blog";
import Success from "../components/Dadhboard/MyProducts/Payment/Success";
import AllBikes from "../Pages/AllBikes/AllBikes";
import Contact from "../components/Common/Contact/Contact";

export const routes = createBrowserRouter([
  { path: "*", element: <NotFound /> },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",

        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/blog", element: <Blog /> },
      { path: "/register", element: <Register /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/profile",
        loader: () => fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`),
        element: (
          <PrivetRouter>
            <Profile />
          </PrivetRouter>
        ),
      },
      {
        path: "/advertiseitems",
        loader: () =>
          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products`),
        element: <AdvertiseProduct />,
      },
      {
        path: "/products/:category",
        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/products/${params.category}`
          ),
        element: (
          <PrivetRouter>
            <Bikes />
          </PrivetRouter>
        ),
      },
      {
        path: "/allproducts",
        loader: () =>
          fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products`),
        element: (
          <PrivetRouter>
            <AllBikes />
          </PrivetRouter>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRouter>
        <DashboardLayout />
      </PrivetRouter>
    ),
    children: [
      { path: "/dashboard/myorders", element: <MyOrders /> },
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoute>
            <AddProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allproducts",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payments/:id",
        element: <Payment />,
        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_SERVER_BASE_URL}/bookings/${params.id}`
          ),
      },
      {
        path: "/dashboard/checkout-success",
        element: <Success />,
      },
    ],
  },
]);
