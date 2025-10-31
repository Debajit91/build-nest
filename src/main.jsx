import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";

import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "leaflet/dist/leaflet.css";
import AuthProvider from "./Contexts/AuthContext/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import AuthLoader from "./Components/AuthLoader.jsx";
import Loader from "./Components/Loader.jsx";


const queryClient = new QueryClient();

AOS.init({
  duration: 1000,
  once: true,
});

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);


//Loader container
const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <RouterProvider router={router} />

            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

//Loader container


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthLoader>
          <AppWrapper/>
        </AuthLoader>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
