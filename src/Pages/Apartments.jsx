import React, { useState } from "react";
import useApartments from "../Hooks/useApartments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Apartments = () => {
  const [page, setPage] = useState(1);
  const limit = 6;
  const { apartments, loading } = useApartments();

  const fetchApartments = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await axios.get(
      `http://localhost:5000/apartments?page=${page}&limit=6`
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["apartments", page],
    queryFn: fetchApartments,
  });

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Apartments
      </h2>
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
                <strong>Rent:</strong> ${apt.rent} BDT
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
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(data?.totalPages).keys()].map((p) => (
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
