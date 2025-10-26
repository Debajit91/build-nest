import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Logo from "../../public/Logo.png";

const Loader = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-label="Loading"
      className="relative bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "linear-gradient(to right, rgb(121, 50, 5, 0.6), rgba(121, 50, 5, 0.8)), url('https://i.ibb.co.com/XkSB1Mf8/3.jpg')",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
        
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border-8 border-secondary/30"
        />

        
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full border-8 border-transparent"
          style={{
            borderTopColor: "var(--fallback-p, oklch(var(--p)))",
          }}
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.5, repeat: Infinity, ease: "linear" }
          }
        />

        {/* Logo  */}
        <div className="w-36 h-36 md:w-40 md:h-40 bg-base-100 rounded-full flex items-center justify-center shadow-xl ring-1 ring-base-300/60">
          <img src={Logo} alt="Logo" className="w-28 h-28 object-contain p-3" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
