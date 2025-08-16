import React from "react";
import {
  FaWifi,
  FaDumbbell,
  FaCar,
  FaDog,
  FaShieldAlt,
  FaLeaf,
} from "react-icons/fa";

const Amenities = () => {
  return (
    <section className="py-16 my-10">
        <h2 className="text-3xl font-bold text-center mb-6">Amenities & Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: <FaWifi />, label: "High‑Speed Wi‑Fi" },
          { icon: <FaDumbbell />, label: "Fitness Center" },
          { icon: <FaCar />, label: "Parking" },
          { icon: <FaDog />, label: "Pet‑Friendly" },
          { icon: <FaShieldAlt />, label: "24/7 Security" },
          { icon: <FaLeaf />, label: "Green Spaces" },
        ].map((it, i) => (
          <div
            key={i}
            className="stat bg-base-200 highlight rounded-box text-center py-6"
          >
            <div className="text-2xl mx-auto mb-2">{it.icon}</div>
            <div className="stat-title text-base text-secondary">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
