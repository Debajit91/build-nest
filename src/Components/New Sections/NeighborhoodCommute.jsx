import React from "react";
import { Link } from "react-router";

const NeighborhoodCommute = () => {
  return (
    <section title="Neighborhood & Commute" className="py-16 my-10">
        <div className="text-primary">
            <h2 className="text-3xl font-bold text-center mb-6">Neighborhood & Commute</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <p className="mb-4">
            Steps from transit, parks, and essential shops. Check typical
            commute times and nearby points of interest.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>🚇 Metro Station — 6 min walk</li>
            <li>🛒 Grocery — 3 min walk</li>
            <li>🏫 School District — A‑rated</li>
          </ul>
          <div className="mt-4">
            <Link to="/about" className="btn btn-ghost">
              Explore neighborhood
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow">
          {/* Replace with Mapbox/Leaflet later */}
          <img
            src="https://images.unsplash.com/photo-1542317853-eb5ef7c54eef?auto=format&fit=crop&w=1200&q=80"
            alt="Neighborhood map"
            className="w-full h-80 object-cover"
            loading="lazy"
          />
        </div>
      </div>
        </div>
    </section>
  );
};

export default NeighborhoodCommute;
