import React from 'react';
import { motion } from "framer-motion";
import Logo from "../../../public/Logo.png";
const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
                    <motion.div
                      className="text-3xl font-bold text-primary"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <img src={Logo} alt="Logo" className="w-28 h-28 object-contain p-3" />
                    </motion.div>
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
    );
};

export default LoadingScreen;