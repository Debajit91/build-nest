import React from 'react';
import LocationMap from './LocationMap';

const Location = () => {
    return (
        <section className="bg-base-300 py-12 px-4 my-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Apartment Location</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Our apartment is located in the heart of Chittagong. You can reach us via public transport,
          Uber, or by driving directly to the location below.
        </p>
        <LocationMap />
      </div>
    </section>
    );
};

export default Location;