// src/components/FeaturedApartments.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "../../api/axiosInstance"; 
import { Link } from "react-router";

function pickTop4(raw = []) {
  const byDateDesc = (a, b) =>
    new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);

  // 1) Prefer items explicitly marked as featured/isFeatured (if your data has that)
  const feats = raw
    .filter((a) => a?.featured || a?.isFeatured)
    .sort(byDateDesc);
  if (feats.length >= 4) return feats.slice(0, 4);

  // 2) Otherwise, fill from the newest overall
  const rest = raw
    .filter((a) => !(a?.featured || a?.isFeatured))
    .sort(byDateDesc);

  return [...feats, ...rest].slice(0, 4);
}

export default function NewFeature() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featured-apartments"],
    queryFn: async () => {
      // Ask server for 3 newest (if supported). If not, we’ll slice on client.
      const res = await axiosInstance.get("/apartments", {
        params: { limit: 4, sort: "-createdAt" },
      });
      const raw = Array.isArray(res.data)
        ? res.data
        : res.data?.apartments ?? [];
      // If server returns more, pick 3 on client; if exactly 3, this is a no-op.
      return pickTop4(raw);
    },
  });

  if (isLoading) {
    return (
      <section className="w-full bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card bg-base-100 shadow animate-pulse">
              <div className="h-40 w-full bg-base-200" />
              <div className="card-body">
                <div className="h-5 w-2/3 bg-base-200 rounded" />
                <div className="h-4 w-1/2 bg-base-200 rounded mt-2" />
                <div className="h-10 w-full bg-base-200 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="w-full bg-base-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="alert alert-error">
            <span>Failed to load featured apartments. Please try again.</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-base-200 py-12 rounded-xl">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">New & Featured</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((a) => (
            <div key={a._id || a.id} className="card bg-base-100 shadow feature">
              <figure>
                <img
                  src={a.image || a.thumbnail || "https://placehold.co/600x400"}
                  alt={a.title || a.name || "Apartment"}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">
                  Apartment No:
                  {
                    a.apartmentNo
                  }
                </h3>
                <div className="card-actions justify-between items-center mt-2">
                  <span className="font-semibold">
                    {a.price
                      ? `BDT ${a.price}/mo`
                      : a.rent
                      ? `BDT ${a.rent}/Mo`
                      : "—"}
                  </span>
                  <Link to="/apartments" className="btn btn-primary btn-sm">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <Link to="/apartments" className="btn btn-primary">
            View all apartments
          </Link>
        </div>
      </div>
    </section>
  );
}
