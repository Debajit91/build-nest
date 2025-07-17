import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Apartments = () => {
  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setPage(1);
    setHasSearched(true);
    refetch(); 
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["apartments", page, minRent, maxRent],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/apartments?page=${page}&limit=6&minRent=${minRent}&maxRent=${maxRent}`
      );
      return res.data;
    },
    enabled: !hasSearched,
    keepPreviousData: true, // smoother pagination
  });

  {
    isLoading && (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-blue-500"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Apartments
      </h2>

      {/* 🔍 Filter Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Min Rent"
          className="input input-bordered"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rent"
          className="input input-bordered"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 🏘️ Apartments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.apartments?.map((apt) => (
          <div key={apt._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={apt.image}
                alt="Apartment"
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">Apartment {apt.apartmentNo}</h3>
              <p>
                <strong>Block:</strong> {apt.block}
              </p>
              <p>
                <strong>Floor:</strong> {apt.floor}
              </p>
              <p>
                <strong>Rent:</strong> {apt.rent} BDT
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {apt.hasAgreement ? (
                  <span className="text-green-600 font-semibold">
                    Agreement Done
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Agreement Pending Yet
                  </span>
                )}
              </p>
              <div className="card-actions justify-end">
                <button
                  className={`btn btn-primary ${
                    apt.hasAgreement ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={apt.hasAgreement}
                >
                  {apt.hasAgreement ? "Agreement Done" : "Make Agreement"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔢 Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(data?.totalPages || 0).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p + 1)}
            className={`btn btn-sm ${
              page === p + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
