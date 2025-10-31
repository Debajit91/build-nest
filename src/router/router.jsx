import { createBrowserRouter, Navigate } from "react-router";
import React, { Suspense, lazy } from "react";
import PrivateRoute from "../Routes/PrivateRoute";
import MemberRoute from "../Routes/MemberRoute";
import AdminRoute from "../Routes/AdminRoute";

// Lazy load layouts and pages
const RootLayout = lazy(() => import("../Layouts/RootLayout"));
const AuthLayout = lazy(() => import("../Layouts/AuthLayout"));
const DashboardLayout = lazy(() => import("../Layouts/DashboardLayout"));
const Home = lazy(() => import("../Pages/Home"));
const Apartments = lazy(() => import("../Pages/Apartments"));
const About = lazy(() => import("../Pages/About"));
const Contact = lazy(() => import("../Pages/Contact"));
const Community = lazy(() => import("../Pages/Community"));
const Unauthorized = lazy(() => import("../Pages/Unauthorized"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));
const MyProfile = lazy(() => import("../Pages/MyProfile"));
const Overview = lazy(() => import("../Pages/Overview"));
const Announcements = lazy(() => import("../Pages/Announcements"));
const MakePayment = lazy(() => import("../Pages/MakePayment"));
const PaymentHistory = lazy(() => import("../Pages/PaymentHistory"));
const StripeWrapper = lazy(() => import("../Pages/StripeWrapper"));
const PaymentSuccess = lazy(() => import("../Pages/PaymentSuccess"));
const MakeAnnouncement = lazy(() => import("../Pages/MakeAnnouncement"));
const AgreementRequests = lazy(() => import("../Pages/AgreementRequest"));
const ManageMembers = lazy(() => import("../Pages/ManageMembers"));
const ManageCoupons = lazy(() => import("../Pages/ManageCoupons"));

// Wrap all routes with Suspense fallback
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "apartments", element: <Apartments /> },
      { path: "about", element: <About /> },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
      {
        path: "community",
        element: (
          <PrivateRoute>
            <Community />
          </PrivateRoute>
        ),
      },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <DashboardLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard/my-profile" replace /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "overview", element: <Overview /> },
      { path: "announcements", element: <Announcements /> },
      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      { path: "checkout", element: <StripeWrapper /> },
      {
        path: "payment-success",
        element: (
          <MemberRoute>
            <PaymentSuccess />
          </MemberRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupons />
          </AdminRoute>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
