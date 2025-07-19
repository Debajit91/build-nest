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
import MakePayment from "../Pages/MakePayment";
import PaymentHistory from "../Pages/PaymentHistory";
import MemberRoute from "../Components/MemberRoute";
import MakeAnnouncement from "../Pages/MakeAnnouncement";



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
        path: "make-payment",
        // element: <MemberRoute><MakePayment/></MemberRoute>
        Component: MakePayment
      },
      {
        path: "payment-history",
        // element: <MemberRoute><PaymentHistory/></MemberRoute>
        Component: PaymentHistory
      },
      {
        path: "make-announcement",
        Component: MakeAnnouncement
      },
      {
        path: "manage-coupons",
        Component: ManageCoupons,
      },
    ],
  },
]);
