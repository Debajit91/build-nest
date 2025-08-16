import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router";


const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-800 max-w-7xl mx-auto">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;
