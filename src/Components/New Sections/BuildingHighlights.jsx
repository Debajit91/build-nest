import React from "react";
import { FaBuilding, FaUserShield, FaTools } from "react-icons/fa";
import buildingImg from "../../assets/images/slide2.jpg";
const BuildingHighlights = () => {
  const highlights = [
    {
      icon: <FaUserShield className="text-3xl" />,
      title: "Safety & Supervision",
      desc: "With 24/7 CCTV surveillance and dedicated security personnel, we ensure every resident feels completely safe within BuildNest.",
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Smart Maintenance",
      desc: "From plumbing to electrical support, our maintenance team responds swiftly to every request, keeping your home worry-free.",
    },
    {
      icon: <FaBuilding className="text-3xl" />,
      title: "Modern Infrastructure",
      desc: "Our apartments feature premium interiors, high-speed elevators, and eco-friendly architecture designed for comfort and sustainability.",
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-10">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={buildingImg}
            alt="BuildNest Apartment Building"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold ">
            Why Our Building Stands Out
          </h2>
          <p className="text-base-content/70">
            BuildNest isn’t just a place to live — it’s a modern, secure, and
            community-driven environment built for convenience and peace of
            mind. Discover the unique features that make our building truly
            exceptional.
          </p>

          <div className="space-y-5">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-base-200 highlight1 p-4 rounded-xl hover:shadow-md transition"
              >
                <div>{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingHighlights;
