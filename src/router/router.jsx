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
import MemberRoute from "../Routes/MemberRoute";
import MakeAnnouncement from "../Pages/MakeAnnouncement";
import AgreementRequests from "../Pages/AgreementRequest";
import AdminRoute from "../Routes/AdminRoute";
import ManageMembers from "../Pages/ManageMembers";
import StripeWrapper from "../Pages/StripeWrapper";
import PaymentSuccess from "../Pages/PaymentSuccess";



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
        element: <MemberRoute><MakePayment/></MemberRoute>
      },
      {
        path: "checkout",
        element: <StripeWrapper/>
      },
      {
        path: "payment-success",
        element: <MemberRoute><PaymentSuccess/></MemberRoute>
      },
      {
        path: "payment-history",
        element: <MemberRoute><PaymentHistory/></MemberRoute>
      },
      {
        path: "make-announcement",
        element: <AdminRoute><MakeAnnouncement/></AdminRoute>
      },
      {
        path: "agreement-requests",
        element: <AdminRoute><AgreementRequests/></AdminRoute>
      },
      {
        path: "manage-members",
        element: <AdminRoute><ManageMembers/></AdminRoute>
      },
      {
        path: "manage-coupons",
        element: <AdminRoute><ManageCoupons/></AdminRoute>
      },
    ],
  },
]);
