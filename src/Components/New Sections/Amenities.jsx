import React from "react";
import {
  FaWifi,
  FaDumbbell,
  FaCar,
  FaDog,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Amenities = () => {
  const amenities = [
    { icon: <FaWifi />, label: "High-Speed Wi-Fi" },
    { icon: <FaDumbbell />, label: "Fitness Center" },
    { icon: <FaCar />, label: "Parking" },
    { icon: <FaDog />, label: "Pet-Friendly" },
    { icon: <FaShieldAlt />, label: "24/7 Security" },
    { icon: <FaLeaf />, label: "Green Spaces" },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // staggered delay
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.08,
      rotate: 2,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="py-16 my-10 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl font-bold text-center mb-6"
      >
        Amenities & Facilities
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {amenities.map((it, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            custom={i}
            whileHover="hover"
            className="stat bg-base-200 highlight rounded-box text-center py-6 shadow-md hover:shadow-lg cursor-pointer"
          >
            <motion.div
              className="text-2xl mx-auto mb-2 "
              animate={{ y: [0, -5, 0] }}
              whileHover={{
                scale: 1.08,
                rotate: -5,
                backgroundColor: "hsl(var(--b2))",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 2,
                ease: "easeInOut",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {it.icon}
            </motion.div>
            <div className="stat-title text-base text-black/50 font-medium">
              {it.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Amenities;
