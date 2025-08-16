import React from "react";

const AboutBuilding = () => {
  return (
    <section className="my-10 py-16  text-gray-800">
      <div className="text-center">
        <h2
          className="text-3xl font-bold mb-6 text-primary"
          data-aos="fade-up"
        >
          About the Building
        </h2>
        <p
          className="text-lg md:text-xl leading-relaxed about mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Nestled in the heart of the city,{" "}
          <span className="font-semibold text-primary">BuildNest</span> is a
          modern residential complex that combines comfort, convenience, and
          community. Designed with elegance and engineered for smart living, it
          offers a lifestyle that balances technology with tranquility.
        </p>

        <blockquote
          className="border-l-4 border-primary pl-6 italic text-primary text-lg md:text-xl mb-8"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          “BuildNest is more than a building — it's a connected community built
          for the future.”
        </blockquote>

        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div data-aos="fade-right">
            <h3 className="text-2xl font-semibold mb-2 apart">Modern Architecture</h3>
            <p className="text-gray-600 leading-relaxed about">
              The building boasts contemporary design, energy-efficient
              materials, and smart apartment layouts tailored for urban
              families. Large windows, sleek facades, and secure entry points
              make it both stylish and safe.
            </p>
          </div>
          <div data-aos="fade-left">
            <h3 className="text-2xl font-semibold mb-2 apart">Smart Amenities</h3>
            <p className="text-gray-600 leading-relaxed about">
              Residents enjoy access to a smart parking system, digital notice
              board, automated payment portals, 24/7 security, and responsive
              maintenance — all integrated into the BuildNest platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
