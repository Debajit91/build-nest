import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router";
import { router } from './router/router.jsx';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

AOS.init({
  duration: 1000,
  once: true,
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
