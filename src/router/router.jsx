import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home";
import Apartments from "../Components/Apartments";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageCoupons from "../Pages/ManageCoupons";

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
          Component: Apartments
        }
    ]
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children:[
      {
        path: 'manage-coupons',
        Component: ManageCoupons
      }
    ]
  }
]);