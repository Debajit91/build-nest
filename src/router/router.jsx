import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageCoupons from "../Pages/ManageCoupons";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Apartments from "../Pages/Apartments";
import MyProfile from "../Pages/MyProfile";
import Announcements from "../Pages/Announcements";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "apartments",
        Component: Apartments,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/my-profile" replace />,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "announcements",
        Component: Announcements,
      },
      {
        path: "manage-coupons",
        Component: ManageCoupons,
      },
    ],
  },
]);
