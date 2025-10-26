import React from "react";
import useCoupons from "../Hooks/useCoupons";
import { FaTag } from "react-icons/fa";
import { motion } from "framer-motion";

const CouponShowcase = () => {
  const { coupons, isLoading } = useCoupons();

  if (isLoading) return <p className="text-center my-10">Loading Coupons...</p>;

  if (!coupons.length) return null;
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Available Coupons
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.2,
              duration: 0.8,
              ease: "easeOut",
            },
          },
        }}
      >
        {coupons.map((coupon) => (
          <motion.div
            key={coupon._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="border p-5 rounded-lg shadow-md bg-white transition duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex items-center gap-3 mb-2"
            >
              <FaTag className="text-primary text-xl" />
              <h3 className="text-lg font-semibold uppercase">{coupon.code}</h3>
            </motion.div>
            <p className="text-gray-600 mb-2">{coupon.description}</p>
            <span className="inline-block bg-primary text-white px-3 py-1 rounded text-sm font-bold">
              {coupon.discount}% OFF
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CouponShowcase;
