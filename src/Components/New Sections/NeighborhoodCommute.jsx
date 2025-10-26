import React from "react";
import { Link } from "react-router";

const NeighborhoodCommute = () => {
  const center = { lat: 22.3419, lng: 91.8361 };
  return (
    <section title="Neighborhood & Commute" className="py-16 my-10">
      <div className="text-primary">
        <h2 className="text-3xl font-bold text-center mb-10 ">
          Neighborhood & Commute
        </h2>
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
              <Link to="/about" className="btn btn-outline">
                Explore neighborhood
              </Link>
            </div>
          </div>
         <div>
           <div className="rounded-2xl overflow-hidden shadow">
            <iframe
              title="Neighborhood Map"
              src={`https://www.google.com/maps?q=${center.lat},${center.lng}&z=15&output=embed`}
              width="100%"
              height="320"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div>
            <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-3 w-full"
          >
            Get Directions
          </a>
          </div>
         </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodCommute;
