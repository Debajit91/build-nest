import React from "react";
import { FaLock, FaBolt, FaWifi, FaBroom, FaParking, FaFireExtinguisher, FaCouch, FaShieldAlt } from "react-icons/fa";

const BuildingHighlights = () => {
  const highlights = [
    {
      icon: <FaLock className="text-3xl text-secondary" />,
      title: "24/7 Security",
      desc: "Our apartments are equipped with CCTV surveillance and trained guards ensuring safety around the clock.",
    },
    {
      icon: <FaBolt className="text-3xl text-secondary" />,
      title: "Power Backup",
      desc: "Reliable generator and backup systems to ensure uninterrupted electricity during power cuts.",
    },
    {
      icon: <FaWifi className="text-3xl text-secondary" />,
      title: "High-Speed Wi-Fi",
      desc: "Seamless internet connectivity throughout the building for all residents.",
    },
    {
      icon: <FaBroom className="text-3xl text-secondary" />,
      title: "Regular Cleaning",
      desc: "Dedicated housekeeping staff keeps shared spaces clean and hygienic every day.",
    },
    {
      icon: <FaParking className="text-3xl text-secondary" />,
      title: "Spacious Parking",
      desc: "Designated parking area for residents and visitors with easy access and security.",
    },
    {
      icon: <FaFireExtinguisher className="text-3xl text-secondary" />,
      title: "Fire Safety System",
      desc: "Fire alarms, extinguishers, and trained staff to handle emergencies efficiently.",
    },
    {
      icon: <FaCouch className="text-3xl text-secondary" />,
      title: "Common Lounge",
      desc: "Relax and socialize in our shared lounge designed for comfort and community.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-secondary" />,
      title: "Secure Access",
      desc: "Smart entry systems and restricted building access for residents only.",
    },
  ];

  return (
    <section className="w-full bg-base-100 py-12" id="building-highlights">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center text-secondary mb-10">
          Building Highlights
        </h2>
        <p className="text-center text-base-content/70 max-w-2xl mx-auto mb-12">
          BuildNest offers top-tier living standards with modern facilities and 24/7 support for our residents. 
          Explore some of the key highlights that make our apartments stand out.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-base-200 highlight1 rounded-2xl shadow-md p-6 text-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingHighlights;
