import React from "react";
import useCoupons from "../Hooks/useCoupons";
import { FaTag } from "react-icons/fa";

const CouponShowcase = () => {
  const { coupons, isLoading } = useCoupons();

  console.log("Coupons:", coupons);

  if (isLoading) return <p className="text-center my-10">Loading Coupons...</p>;

  if (!coupons.length) return null;
  return (
    <section className="px-4 py-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Available Coupons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="border p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white"
          >
            <div className="flex items-center gap-3 mb-2">
              <FaTag className="text-primary text-xl" />
              <h3 className="text-lg font-semibold uppercase">{coupon.code}</h3>
            </div>
            <p className="text-gray-600 mb-2">{coupon.description}</p>
            <span className="inline-block bg-primary text-white px-3 py-1 rounded text-sm font-bold">
              {coupon.discount}% OFF
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponShowcase;
