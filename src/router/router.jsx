import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageCoupons from "../Pages/ManageCoupons";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import Apartments from "../Pages/Apartments";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            path: '/',
            Component: Home
        },
        {
          path: 'apartments',
          Component:Apartments
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout/>
      </PrivateRoute>
    ),
    children:[
      {
        path: 'manage-coupons',
        Component: ManageCoupons
      }
    ]
  }
]);