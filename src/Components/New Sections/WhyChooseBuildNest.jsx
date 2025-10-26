import React from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFileContract,
  FaCreditCard,
  FaBell,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaSearch size={30} />,
    title: "Easy Apartment Discovery",
    description: "Find apartments with detailed info and transparent pricing.",
  },
  {
    icon: <FaFileContract size={30} />,
    title: "Secure & Fast Agreements",
    description: "Sign rental agreements digitally with peace of mind.",
  },
  {
    icon: <FaCreditCard size={30} />,
    title: "Effortless Payments",
    description: "Pay your rent online safely with flexible options.",
  },
  {
    icon: <FaBell size={30} />,
    title: "Real-time Updates",
    description:
      "Get instant notifications about agreements, payments, and availability.",
  },
  {
    icon: <FaHeadset size={30} />,
    title: "Reliable Support",
    description: "Access help whenever you need it with our dedicated support.",
  },
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.6 },
  },
};

const WhyChooseBuildNest = () => {
  return (
    <section className="w-full bg-base-200 py-12 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose BuildNest?</h2>
        <p className="text-base-content/80 mb-12">
          Simplifying apartment rentals and management for tenants and landlords
          alike.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-primary p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className=" mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseBuildNest;
